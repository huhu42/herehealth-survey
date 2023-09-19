import {type AppType} from "next/app";

import {api} from "~/utils/api";

import {ChakraProvider} from "@chakra-ui/react";
import Head from "next/head";

const MyApp: AppType = ({Component, pageProps}) => {
    return <ChakraProvider>
        <Head>
            <title>Uniphye Survey</title>
            <meta name="description" content="Find your calling."/>
            <link rel="icon" href="/favicon.ico"/>
            <link
                rel="apple-touch-icon"
                href="/apple-icon?<generated>"
                type="image/<generated>"
                sizes="<generated>"
            />
        </Head>
        <Component {...pageProps} />
    </ChakraProvider>;
};

export default api.withTRPC(MyApp);
