import { Head, Html, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
    return (
        <Html lang="en">
            <Head>
                <title>Sun Overflow</title>
                <link rel="icon" href="/images/sun_logo.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
