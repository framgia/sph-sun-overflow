import "../styles/globals.css";
import type { AppProps } from "next/app";
import Sidebar from "../components/organisms/Sidebar";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Sidebar />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
