import CoinGecko from "coingecko-api";
import { format } from "date-fns";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PriceService {
  private coingeckoClient = new CoinGecko();

  private currentPrice = {
    timestamp: 0,
    data: {
      ethereum: {
        usd: 4731.7,
      },
      sipher: {
        usd: 0.6,
      },
      changingPrice: 0.0,
    },
  };

  private async getCryptoPrice() {
    if (this.currentPrice.timestamp + 5000 < new Date().getTime()) {
      const dataPrice = await this.coingeckoClient.simple.price({
        ids: ["ethereum", "sipher"],
        vs_currencies: ["usd"],
      });

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const dataHistory = await this.coingeckoClient.coins.fetchHistory(
        "sipher",
        {
          date: format(yesterday, "dd-MM-yyyy"),
        }
      );
      this.currentPrice = {
        data: dataPrice.data,
        timestamp: new Date().getTime(),
      };
      this.currentPrice.data.changingPrice =
        dataPrice.data.sipher.usd /
          dataHistory.data.market_data.current_price.usd -
        1;
    }

    return this.currentPrice;
  }

  async getSipherPrice() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.data.sipher.usd;
  }

  async getEtherPrice() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.data.ethereum.usd;
  }

  async getPriceChange() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.data.changingPrice;
  }
}
