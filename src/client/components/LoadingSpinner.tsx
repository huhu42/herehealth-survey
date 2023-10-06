import {Text, Spinner,  Flex} from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
            <Spinner
                thickness="4px"
                speed="1s"
                emptyColor="gray.200"
                color="purple.500"
                mt={20}
                size="xl"
            />
            <Text
                fontSize={"sm"}
                fontWeight={"semibold"}
                color={"gray.200"}
                mt={8}
            >Processing! This may take up to 20 seconds.</Text>
            <Text
                fontSize={"sm"}
                color={"gray.200"}
                maxW={400}
                mt={8}
            >Unlocking your potential, one match at a time 🚀 Uniphye uses AI to align mission-driven talent with
                groundbreaking startups. Let's build the future, together.</Text>
        </Flex>
    );
}
