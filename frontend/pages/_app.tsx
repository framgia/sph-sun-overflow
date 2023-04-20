import Layout from '@/components/templates/layouts'
import client from '@/plugins/apollo-client'
import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
// Specific css files for pages (name.tsx => name.css)
import RouteWrapper from '@/components/templates/RouteWrapper'
import '@/styles/RichTextEditor.css'
import '@/styles/login.css'
import '@/styles/profile.css'
import '@/styles/question.css'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
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
