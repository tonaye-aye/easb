import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>

          <meta name="twitter:url" content="https://ericandre.app" />
          <meta name="twitter:title" content="The Eric Andre Show Soundboard" />
          <meta
            name="twitter:description"
            content="The crazy and wild sounds of Eric Andre featuring Hannibal Burres"
          />
          <meta name="twitter:creator" content="@im_tones" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="The Eric Andre Show Soundboard" />
          <meta
            property="og:description"
            content="The crazy and wild sounds of Eric Andre featuring Hannibal Burres"
          />
          <meta property="og:site_name" content="Eric Andre" />
          <meta property="og:url" content="https://ericandre.app" />
          <meta
            property="og:image"
            content="https://ericandre.app/icons/icon-192x192.png"
          />
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
