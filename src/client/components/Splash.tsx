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
                  cursor={"pointer"}
                  onClick={async () => {
                      await router.push("https://www.uniphye.com/")
                  }}/>
            <Text
                w={{base: "80", md: "100"}}
                fontSize={{base: "md", md: "lg"}}
                color={"white"}
                mt={4}
            >
                Find your calling at startups with state-of-the-art psychometrics and AI!
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
                This 3 minute teaser to the <u><a href={"https://www.uniphye.com/"}>Uniphye platform</a></u> helps you learn what kinds of startup roles
                would fit you.
            </Text>
        </Flex>
    );
}
