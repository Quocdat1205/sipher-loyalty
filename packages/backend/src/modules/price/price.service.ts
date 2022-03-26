import CoinGecko from "coingecko-api";
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
    ethereum: {
      usd: 3100.0,
      eth: 1,
      change: 0.0,
    },
    sipher: {
      usd: 0.6,
      eth: 0.000001,
      change: 0.0,
    },
    matic: {
      usd: 0.6,
      eth: 0.000001,
      change: 0.0,
    },
  };

  private async getCryptoPrice() {
    if (this.currentPrice.timestamp + 5000 < new Date().getTime()) {
      const dataPrice = await this.coingeckoClient.simple.price({
        ids: ["ethereum", "sipher", "matic-network"],
        vs_currencies: ["usd"],
      });
      this.currentPrice.ethereum.usd = dataPrice.data.ethereum.usd;
      this.currentPrice.sipher.usd = dataPrice.data.sipher.usd;
      this.currentPrice.matic.usd = dataPrice.data["matic-network"].usd;

      this.currentPrice.sipher.eth =
        dataPrice.data.sipher.usd / dataPrice.data.ethereum.usd;
      this.currentPrice.matic.eth =
        dataPrice.data["matic-network"].usd / dataPrice.data.ethereum.usd;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.currentPrice.timestamp = new Date().getTime();

      const dataHistorySipher = await this.coingeckoClient.coins.fetchHistory(
        "sipher",
        {
          date: format(yesterday, "dd-MM-yyyy"),
        }
      );
      this.currentPrice.sipher.change =
        dataPrice.data.sipher.usd /
          dataHistorySipher.data.market_data.current_price.usd -
        1;

      const dataHistoryEthereum = await this.coingeckoClient.coins.fetchHistory(
        "ethereum",
        {
          date: format(yesterday, "dd-MM-yyyy"),
        }
      );
      this.currentPrice.ethereum.change =
        dataPrice.data.ethereum.usd /
          dataHistoryEthereum.data.market_data.current_price.usd -
        1;

      const dataHistoryMatic = await this.coingeckoClient.coins.fetchHistory(
        "matic-network",
        {
          date: format(yesterday, "dd-MM-yyyy"),
        }
      );

      this.currentPrice.matic.change =
        dataPrice.data["matic-network"].usd /
          dataHistoryMatic.data.market_data.current_price.usd -
        1;
    }

    return this.currentPrice;
  }

  private async getSipherPrice() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.sipher;
  }

  private async getEtherPrice() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.ethereum;
  }

  private async getMaticPrice() {
    const cryptoPrice = await this.getCryptoPrice();
    return cryptoPrice.matic;
  }

  async getPrice() {
    const maticPrice = await this.getMaticPrice();
    const sipherPrice = await this.getSipherPrice();
    const ethereumPrice = await this.getEtherPrice();
    return { sipherPrice, ethereumPrice, maticPrice };
  }
}
