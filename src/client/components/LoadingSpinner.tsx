import {Text, HStack, Spinner, VStack} from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <VStack>
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
            >This may take up to 20 seconds.</Text>
        </VStack>
    );
}
