import Head from "next/head";

type type_heading = {
  title: string;
  description?: string;
};

function IndexPage({ title, description }: type_heading) {
  return (
    <Head>
      <title>{title || "Loylaty Sipher"}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta charSet="utf-8" />
      <meta itemProp="description" content={description || "loyalty sipher"} />
      <link rel="icon" href="/images/general/main_icon.ico" />
    </Head>
  );
}

export { IndexPage };
