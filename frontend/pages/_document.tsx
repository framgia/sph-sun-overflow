import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/images/sun_logo.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
