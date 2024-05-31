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
                fontSize={"lg"}
                color={"gray.200"}
                maxW={400}
                mt={8}
            >Unlocking your potential, one morning at a time 🚀 Cleo is your personalized AI health coach. Let's create your optimal morning routine today!</Text>
            <Text
                fontSize={"sm"}
                color={"gray.200"}
                mt={8}
            >Processing... may take up to 20 seconds.</Text>
        </Flex>
    );
}
