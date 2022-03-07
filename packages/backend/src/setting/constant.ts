import * as dotenv from "dotenv"
// import AWS, { Credentials } from 'aws-sdk';
dotenv.config()
const constant: { [key: string]: any } = {}

define("MODE", process.env.MODE)
define("SECRET_KEY", process.env.SECRET_KEY || "")
define("NODE_ENV", process.env.NODE_ENV)
define("JWT_EXPIRATION_TIME", process.env.JWT_EXPIRATION_TIME)
define("SESSION_PORT", process.env.SESSION_PORT)
define("SESSION_HOST", process.env.SESSION_HOST)
define("SC_INFURA", process.env.SC_INFURA)
define("SC_NFT_INU", process.env.SC_NFT_INU)
define("SC_NFT_NEKO", process.env.SC_NFT_NEKO)
define("USERNAME", process.env.USERNAME)
define("PASSWORD", process.env.PASSWORD)
define("TK_WEB", process.env.TK_WEB)
define("PW_WEB", process.env.PW_WEB)
define("AWS_ACCESS_KEY_ID", process.env.AWS_ACCESS_KEY_ID)
define("AWS_SECRET_ACCESS_KEY", process.env.AWS_SECRET_ACCESS_KEY)
define("AWS_REGION", process.env.AWS_REGION)
define("AWS_NAME_BUCKET", process.env.AWS_NAME_BUCKET)
define("AWS_UPLOAD_FILE_URL_LINK", process.env.AWS_UPLOAD_FILE_URL_LINK)
define("ELASTICSEARCH_ENDPOINT", process.env.ELASTICSEARCH_ENDPOINT)
define("ELASTICSEARCH_INDEX", process.env.ELASTICSEARCH_INDEX)

define("AWS_REGION_S3", process.env.AWS_REGION_S3)
define("AWS_ACCESS_KEY_ID_S3", process.env.AWS_ACCESS_KEY_ID_S3)

define("PRIVATE_KEY", process.env.PRIVATE_KEY)
define("CHAIN_ID", parseInt(process.env.CHAIN_ID, 10))

function define(key: string, value: any) {
  Object.defineProperty(constant, key, {
    value,
    enumerable: true,
  })
}

export default constant
