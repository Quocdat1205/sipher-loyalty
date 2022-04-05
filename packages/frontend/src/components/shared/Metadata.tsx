import Head from "next/head"

interface MetadataProps {
  title: string
  description: string
}

export function Metadata({ title, description }: MetadataProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta
        itemProp="image"
        content="https://sipherstorage.s3.ap-southeast-1.amazonaws.com/2020Apr5_atherlabs_webmeta.png"
      />
      <meta property="og:url" content="https://sipher.xyz" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content="https://sipherstorage.s3.ap-southeast-1.amazonaws.com/2020Apr5_atherlabs_webmeta.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://sipherstorage.s3.ap-southeast-1.amazonaws.com/2020Apr5_atherlabs_webmeta.png"
      />
    </Head>
  )
}
