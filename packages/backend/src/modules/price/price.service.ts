import CoinGecko from "coingecko-api";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PriceService {
  private coingeckoClient = new CoinGecko();

  private currentPrice = {
    timestamp: 0,
    ethereum: {
      usd: 3100.0,
      eth: 1,
      change: 0.0,
      marketcap: 0.0,
      marketcapChange: 0.0,
      circulatingSupply: 0.0,
      maxSupply: 0.0,
      totalSupply: 0.0,
      fullyDilutedValuation: 0.0,
    },
    sipher: {
      usd: 0.6,
      eth: 0.000001,
      change: 0.0,
      marketcap: 0.0,
      marketcapChange: 0.0,
      circulatingSupply: 0.0,
      maxSupply: 0.0,
      totalSupply: 0.0,
      fullyDilutedValuation: 0.0,
    },
    matic: {
      usd: 0.6,
      eth: 0.000001,
      change: 0.0,
      marketcap: 0.0,
      marketcapChange: 0.0,
      circulatingSupply: 0.0,
      maxSupply: 0.0,
      totalSupply: 0.0,
      fullyDilutedValuation: 0.0,
    },
  };

  private async getCryptoPrice() {
    if (this.currentPrice.timestamp + 5000 < new Date().getTime()) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.currentPrice.timestamp = new Date().getTime();

      const dataCoinSipher = await this.coingeckoClient.coins.fetch("sipher", {
        community_data: false,
        developer_data: false,
        localization: false,
        sparkline: false,
        tickers: false,
      });
      this.currentPrice.sipher.usd =
        dataCoinSipher.data.market_data.current_price.usd;
      this.currentPrice.sipher.eth =
        dataCoinSipher.data.market_data.current_price.eth;
      this.currentPrice.sipher.marketcap =
        dataCoinSipher.data.market_data.market_cap.usd;
      this.currentPrice.sipher.change = (
        dataCoinSipher.data.market_data as any
      ).price_change_percentage_24h_in_currency.usd;
      this.currentPrice.sipher.marketcapChange = (
        dataCoinSipher.data.market_data as any
      ).market_cap_change_percentage_24h_in_currency.usd;
      this.currentPrice.sipher.fullyDilutedValuation =
        dataCoinSipher.data.market_data.fully_diluted_valuation.usd;
      this.currentPrice.sipher.circulatingSupply =
        dataCoinSipher.data.market_data.circulating_supply;
      this.currentPrice.sipher.totalSupply =
        dataCoinSipher.data.market_data.total_supply;
      this.currentPrice.sipher.maxSupply =
        dataCoinSipher.data.market_data.max_supply;

      const dataCoinEthereum = await this.coingeckoClient.coins.fetch(
        "ethereum",
        {
          community_data: false,
          developer_data: false,
          localization: false,
          sparkline: false,
          tickers: false,
        }
      );
      this.currentPrice.ethereum.usd =
        dataCoinEthereum.data.market_data.current_price.usd;
      this.currentPrice.ethereum.eth =
        dataCoinEthereum.data.market_data.current_price.eth;
      this.currentPrice.ethereum.marketcap =
        dataCoinEthereum.data.market_data.market_cap.usd;
      this.currentPrice.ethereum.change = (
        dataCoinEthereum.data.market_data as any
      ).price_change_percentage_24h_in_currency.usd;
      this.currentPrice.ethereum.marketcapChange = (
        dataCoinEthereum.data.market_data as any
      ).market_cap_change_percentage_24h_in_currency.usd;
      this.currentPrice.ethereum.fullyDilutedValuation =
        dataCoinEthereum.data.market_data.fully_diluted_valuation.usd;
      this.currentPrice.ethereum.circulatingSupply =
        dataCoinEthereum.data.market_data.circulating_supply;
      this.currentPrice.ethereum.totalSupply =
        dataCoinEthereum.data.market_data.total_supply;
      this.currentPrice.ethereum.maxSupply =
        dataCoinEthereum.data.market_data.max_supply;

      const dataCoinMatic = await this.coingeckoClient.coins.fetch(
        "matic-network",
        {
          community_data: false,
          developer_data: false,
          localization: false,
          sparkline: false,
          tickers: false,
        }
      );

      this.currentPrice.matic.usd =
        dataCoinMatic.data.market_data.current_price.usd;
      this.currentPrice.matic.eth =
        dataCoinMatic.data.market_data.current_price.eth;
      this.currentPrice.matic.marketcap =
        dataCoinMatic.data.market_data.market_cap.usd;
      this.currentPrice.matic.change = (
        dataCoinMatic.data.market_data as any
      ).price_change_percentage_24h_in_currency.usd;

      this.currentPrice.matic.marketcapChange = (
        dataCoinMatic.data.market_data as any
      ).market_cap_change_percentage_24h_in_currency.usd;
      this.currentPrice.matic.fullyDilutedValuation =
        dataCoinMatic.data.market_data.fully_diluted_valuation.usd;
      this.currentPrice.matic.circulatingSupply =
        dataCoinMatic.data.market_data.circulating_supply;
      this.currentPrice.matic.totalSupply =
        dataCoinMatic.data.market_data.total_supply;
      this.currentPrice.matic.maxSupply =
        dataCoinMatic.data.market_data.max_supply;
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
