import React from "react";
import {Center, Heading, Text, VStack} from "@chakra-ui/react";
import Logo from "~/client/components/Logo";

export default function Survey() {
    return (
        <Center w={"100vw"} h={"100vh"} bgGradient={'linear(to-b, purple.900, purple.600)'}>
            <VStack>
                <Logo w={"80"}/>
                <Text fontSize={"lg"} color={"white"} mt={4}>
                    Find your calling using state-of-the-art psychometric test and AI.
                </Text>
            </VStack>
        </Center>
    );
}
