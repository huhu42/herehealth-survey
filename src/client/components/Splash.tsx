import {Button, Flex, Text} from "@chakra-ui/react";
import Logo from "~/client/components/Logo";
import React from "react";
import {useRouter} from "next/router";

type SplashProps = {
    onNavigation: () => void;
};

export default function Splash({onNavigation}: SplashProps) {
    const router = useRouter();
    return (
        <Flex direction={"column"} alignItems={"center"} textAlign="center">
            <Logo w={{base: "60", md: "80"}}
                  onClick={async () => {
                      await router.push("https://www.uniphye.com/")
                  }}/>
            <Text
                w={{base: "80", md: "100"}}
                fontSize={{base: "md", md: "lg"}}
                color={"white"}
                mt={4}
            >
                Find your calling with state-of-the-art psychometrics and AI.
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
        </Flex>
    );
}
