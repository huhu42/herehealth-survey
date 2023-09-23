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
    firstName: string
    onFirstNameChange: (firstName: string) => void
    lastName: string
    onLastNameChange: (lastName: string) => void
    onNavigation: () => void
}

export default function NameForm({
                                     firstName,
                                     onFirstNameChange,
                                     lastName,
                                     onLastNameChange,
                                     onNavigation
                                 }: NameFormProps) {
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
            <FormControl isInvalid={firstName === ""}>
                <FormLabel color={"white"}>First Name</FormLabel>
                <Input
                    my={2}
                    value={firstName}
                    color="white"
                    colorScheme="white"
                    variant="outline"
                    onChange={(e) => onFirstNameChange(e.target.value)}
                    placeholder="e.g., John"
                />
            </FormControl>
            <FormControl isInvalid={lastName === ""}>
                <FormLabel color={"white"}>Last Name</FormLabel>
                <Input
                    my={2}
                    value={lastName}
                    color="white"
                    colorScheme="white"
                    variant="outline"
                    onChange={(e) => onLastNameChange(e.target.value)}
                    placeholder="e.g., Smith"
                />
            </FormControl>
            <NextButton onClick={onNavigation}/>
        </Flex>
    );
}