import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/templates/layouts'
import { ApolloProvider } from '@apollo/client'
import client from '@/plugins/apollo-client'
// Specific css files for pages (name.tsx => name.css)
import '@/styles/login.css'
import '@/styles/RichTextEditor.css'
import RouteWrapper from '@/components/templates/RouteWrapper'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <RouteWrapper>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RouteWrapper>
        </ApolloProvider>
    )
}
