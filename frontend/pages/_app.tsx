import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/templates/layouts";
// Specific css files for pages (name.tsx => name.css)
import "@/styles/login.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
