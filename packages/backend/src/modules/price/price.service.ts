import CoinGecko from "coingecko-api";
import * as CoinMarketCap from "coinmarketcap-api";
import { format } from "date-fns";
import { Injectable } from "@nestjs/common";
import constant from "@setting/constant";

@Injectable()
export class PriceService {
  private coingeckoClient = new CoinGecko();

  private apiKey = constant.API_KEY_CMC;

  private id_sipher = constant.ID_SIPHER;

  private currentPrice = {
    timestamp: 0,
    data: {
      ethereum: {
        usd: 4731.7,
      },
      sipher: {
        usd: 0.6,
      },
    },
    changingPriceSipher: 0.0,
    changingPriceMatic: 0.0,
    changingPriceEthereum: 0.0,
  };

  private async getCryptoPrice() {
    if (this.currentPrice.timestamp + 5000 < new Date().getTime()) {
      const dataPrice = await this.coingeckoClient.simple.price({
        ids: ["ethereum", "sipher", "matic-network"],
        vs_currencies: ["usd"],
      });
      this.currentPrice.data = dataPrice.data;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.currentPrice.timestamp = new Date().getTime();

      const dataHistorySipher = await this.coingeckoClient.coins.fetchHistory(
        "sipher",
        {
          date: format(yesterday, "dd-MM-yyyy"),
        }
      );
      this.currentPrice.changingPriceSipher =
        dataPrice.data.sipher.usd /
          dataHistorySipher.data.market_data.current_price.usd -
        1;

      const dataHistoryEthereum = await this.coingeckoClient.coins.fetchHistory(
        "ethereum",
        {
          date: format(yesterday, "dd-MM-yyyy"),
        }
      );
      this.currentPrice.changingPriceEthereum =
        dataPrice.data.ethereum.usd /
          dataHistoryEthereum.data.market_data.current_price.usd -
        1;

      const dataHistoryMatic = await this.coingeckoClient.coins.fetchHistory(
        "matic-network",
        {
          date: format(yesterday, "dd-MM-yyyy"),
        }
      );
      console.log(dataHistoryMatic);

      this.currentPrice.changingPriceMatic =
        dataPrice.data["matic-network"].usd /
          dataHistoryMatic.data.market_data.current_price.usd -
        1;
    }

    return this.currentPrice;
  }

  private async getSipherPrice() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.data.sipher.usd;
  }

  private async getEtherPrice() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.data.ethereum.usd;
  }

  private async getPriceChange() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.changingPriceSipher;
  }

  async getPrice() {
    const priceChange = await this.getPriceChange();
    const sipherPrice = await this.getSipherPrice();
    const etherPrice = await this.getEtherPrice();
    return { sipherPrice, etherPrice, priceChange };
  }
}
