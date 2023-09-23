import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Text
} from "@chakra-ui/react";
import React, {useState} from "react";
import {NextButton} from "~/client/components/NextButton";

type NameFormProps = {
    setFirstName: (firstName: string) => void
    setLastName: (lastName: string) => void
    onNavigation: () => void
}

export default function NameForm({setFirstName, setLastName, onNavigation}: NameFormProps) {
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
            <FormControl isRequired={true}>
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
            <FormControl isRequired={true}>
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
            <NextButton
                aria-label={"back-arrow-button"}
                isDisabled={
                    firstNameInput === "" || lastNameInput === ""
                }
                onClick={() => {
                    setFirstName(firstNameInput);
                    setLastName(lastNameInput);
                    onNavigation();
                }}/>
        </Flex>
    );
}