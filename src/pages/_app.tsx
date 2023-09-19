import {type AppType} from "next/app";

import {api} from "~/utils/api";

import "~/styles/globals.css";
import {ChakraProvider} from "@chakra-ui/react";

const MyApp: AppType = ({Component, pageProps}) => {
    return <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>;
};

export default api.withTRPC(MyApp);
