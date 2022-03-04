import { awsGetCredentials, createAWSConnection } from "@acuris/aws-es-connection"
import { Global, Module } from "@nestjs/common"
import { ElasticsearchModule } from "@nestjs/elasticsearch"
import constant from "@setting/constant"

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async () => {
        const awsCredentials = await awsGetCredentials()

        const connectionOptions = createAWSConnection(awsCredentials)
        return {
          ...connectionOptions,
          node: constant.ELASTICSEARCH_ENDPOINT,
        }
      },
    }),
  ],
  providers: [],
  exports: [ElasticsearchModule],
})
export class SearchModule {}
