import {Button, Flex, Text} from "@chakra-ui/react";
import Logo from "~/client/components/Logo";
import React from "react";

type SplashProps = {
    onNavigation: () => void;
};

export default function Splash({onNavigation}: SplashProps) {
    return (
        <Flex direction={"column"} alignItems={"center"} textAlign="center">
            <a href={"https://www.uniphye.com/"} target="_blank">
                <Logo w={{base: "60", md: "80"}}/>
            </a>
            <Text
                w={{base: "80", md: "100"}}
                fontSize={{base: "md", md: "lg"}}
                color={"white"}
                mt={4}
            >
                Find the best guided morning routine to live your best life!
            </Text>
            <Button
                aria-label={"start-button"}
                bg="white"
                mt={8}
                variant={"solid"}
                onClick={() => {
                    onNavigation();
                }}
            >
                Let's go!
            </Button>
            <Text
                w={{base: "80", md: "100"}}
                fontSize={{base: "xs", md: "sm"}}
                fontStyle={"italic"}
                color={"white"}
                mt={8}
            >
                This 3 minute teaser to the <u><a href={"https://www.cleo.com/"} target="_blank">Cleo platform</a></u> helps
                you discover the best morning routines for your goals.
            </Text>
        </Flex>
    );
}
