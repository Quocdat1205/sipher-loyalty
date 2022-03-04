import AWS, { Credentials } from "aws-sdk"
import { Injectable } from "@nestjs/common"

type ElasticsearchConfiguration = {
  endpoint: string
  index: string
}

@Injectable()
export class SystemConfigProvider {
  public get isProduction() {
    return this.get("NODE_ENV", "development") === "production"
  }

  public get isTest() {
    return this.get("NODE_ENV", "development") === "test"
  }

  public get awsCredentials(): Promise<Credentials> {
    if (process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI) {
      const ecsCredentials = new AWS.ECSCredentials()
      return ecsCredentials.getPromise().then(() => ecsCredentials)
    }
    if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
      const envCredentials = new AWS.EnvironmentCredentials("AWS")
      return envCredentials.getPromise().then(() => envCredentials)
    }
    if (process.env.AWS_SDK_LOAD_CONFIG) {
      const localCredentials = new AWS.SharedIniFileCredentials()
      return localCredentials.getPromise().then(() => localCredentials)
    }
  }

  public get elasticsearch(): ElasticsearchConfiguration {
    const [endpoint, index] = [this.get(process.env.ELASTICSEARCH_ENDPOINT), this.get(process.env.ELASTICSEARCH_INDEX)]

    return { endpoint, index }
  }

  public get(key: string, defaultValue?: string) {
    return process.env[key] || defaultValue
  }
}

const systemConfig = new SystemConfigProvider()

export default systemConfig
