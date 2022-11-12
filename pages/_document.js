import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo.png"></link>
          <meta name="theme-color" content="#000000" />
          <meta name="application-name" content="Notes" />
          <meta name="description" content="Notes is a simple note taking App. Notes save on cloud securely and are accessible anywhere." />
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Notes" />
          <meta name="description" content="Notes is a simple note taking App. Notes save on cloud securely and are accessible anywhere." />
          <meta name="format-detection" content="7500310305" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#ffffff" />
          <link rel="shortcut icon" href="/logo.png" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://notes-domain.vercel.app" />
          <meta name="twitter:title" content="Notes" />
          <meta name="twitter:description" content="Notes is a simple note taking App. Notes save on cloud securely and are accessible anywhere." />
          <meta name="twitter:image" content="https://notes-domain.vercel.app/icons/android-chrome-192x192.png" />
          <meta name="twitter:creator" content="@jayant_rohila" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Notes" />
          <meta property="og:description" content="Notes is a simple note taking App. Notes save on cloud securely and are accessible anywhere." />
          <meta property="og:site_name" content="Notes" />
          <meta property="og:url" content="https://notes-domain.vercel.app" />
          <meta property="og:image" content="https://notes-domain.vercel.app/logo.png" />
          <link rel="apple-touch-startup-image" href="/logo.png" sizes="640x1136" />
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
