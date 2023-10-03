import {Text, Spinner,  Flex} from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
            <Spinner
                thickness="4px"
                speed="1s"
                emptyColor="gray.200"
                color="purple.500"
                mt={8}
                size="xl"
            />
            <Text
                fontSize={"sm"}
                color={"gray.200"}
                mt={8}
            >Processing! This may take up to 20 seconds.</Text>
        </Flex>
    );
}
