import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Head>
        <title>Herehealth Survey</title>
        <meta name="description" content="Find your optimal personalized morning routine." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
