import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/components/templates/layouts';
import { ApolloProvider } from "@apollo/client";
import client from '@/plugins/apollo-client';
// Specific css files for pages (name.tsx => name.css)
import "@/styles/login.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}
