import { ColorModeScript } from "@chakra-ui/react"
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import config from "../config"

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return {...initialProps}
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <link rel="icon" href="/icons/favicon.ico" />

          <meta property="og:site_name" content={config.projectName} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content={`@${config.twitter}`} />
          <meta name="twitter:creator" content={`@${config.twitter}`} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
