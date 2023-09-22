import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text
} from "@chakra-ui/react";
import React, {useState} from "react";

export default function NameForm() {
    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");

    return (
        <Flex
            flexDirection={"column"}
            w={{sm: 250, md: 400}}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Text fontSize={"2xl"} fontWeight={"bold"} my="4" alignSelf={"start"} color={"white"}>
                About you.
            </Text>
            <FormControl isInvalid={firstNameInput === ""}>
                <FormLabel color={"white"}>First Name</FormLabel>
                <Input
                    my={2}
                    value={firstNameInput}
                    color="white"
                    colorScheme="white"
                    variant="outline"
                    onChange={(e) => setFirstNameInput(e.target.value)}
                    placeholder="e.g., John"
                />
            </FormControl>
            <FormControl isInvalid={lastNameInput === ""}>
                <FormLabel color={"white"}>Last Name</FormLabel>
                <Input
                    my={2}
                    value={lastNameInput}
                    color="white"
                    colorScheme="white"
                    variant="outline"
                    onChange={(e) => setLastNameInput(e.target.value)}
                    placeholder="e.g., Smith"
                />
            </FormControl>
        </Flex>
    );
}