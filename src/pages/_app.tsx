import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Head>
        <title>Uniphye Survey</title>
        <meta name="description" content="Uniphye finds your calling." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
