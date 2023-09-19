import React from "react";
import {Center, Flex, Spacer, Text} from "@chakra-ui/react";
import Logo from "~/client/components/Logo";
import DragAndDropQuestion from "~/client/components/DragAndDropQuestion";

export default function Survey() {
    function Splash() {
        return <Flex direction={"column"} alignItems={"center"} textAlign="center">
            <Logo w={{base: "60", md: "80"}}/>
            <Text w={{base: "80", md: "100"}} fontSize={{base: "md", md: "lg"}} color={"white"} mt={4}>
                Find your calling with state-of-the-art psychometrics and AI.
            </Text>
        </Flex>
    }

    return (
        <Center w={"100vw"} h={"100vh"} bgGradient={'linear(to-b, purple.900, purple.600)'}>
            <Splash/>
        </Center>
    );
}
