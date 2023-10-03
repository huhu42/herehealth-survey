import {Flex, FormControl, FormLabel, Input, Select, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {NextButton} from "~/client/components/NextButton";
import {Tenure} from "~/server/service/types";

type NameFormProps = {
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setTenure: (tenure: Tenure) => void;
    onNavigation: () => void;
};

export default function PersonalInfoForm({
                                             setFirstName,
                                             setLastName,
                                             setTenure,
                                             onNavigation,
                                         }: NameFormProps) {
    function toTenure(value: string): Tenure | null {
        switch (value) {
            case "0": {
                return Tenure.NEW_GRAD;
            }
            case "1": {
                return Tenure.MID_CAREER;
            }
            case "": {
                return null;
            }
            default: {
                throw new Error(`unrecognized value ${value}`);
            }
        }
    }

    const [firstNameInput, setFirstNameInput] = useState("");
    const [lastNameInput, setLastNameInput] = useState("");
    const [tenureInput, setTenureInput] = useState<Tenure | null>(null);
    return (
        <Flex
            flexDirection={"column"}
            w={{base: 250, md: 400}}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Text
                fontSize={"2xl"}
                fontWeight={"bold"}
                my="4"
                alignSelf={"start"}
                color={"white"}
            >
                About you.
            </Text>
            <FormControl isRequired={true}>
                <FormLabel color={"white"}>First Name</FormLabel>
                <Input
                    my={2}
                    value={firstNameInput}
                    color="black"
                    colorScheme="white"
                    variant="solid"
                    onChange={(e) => setFirstNameInput(e.target.value)}
                    placeholder="e.g., John"
                />
            </FormControl>
            <FormControl isRequired={true}>
                <FormLabel color={"white"}>Last Name</FormLabel>
                <Input
                    my={2}
                    value={lastNameInput}
                    color="black"
                    colorScheme="white"
                    variant="solid"
                    onChange={(e) => setLastNameInput(e.target.value)}
                    placeholder="e.g., Smith"
                />
            </FormControl>
            <FormControl isRequired={true}>
                <FormLabel color={"white"}>Experience</FormLabel>
                <Select
                    my={3}
                    color="black"
                    colorScheme="white"
                    variant="solid"
                    onChange={(e) => setTenureInput(toTenure(e.target.value))}
                    placeholder="What best describes you?"
                >
                    <option value={Tenure.NEW_GRAD.toString()}>A new graduate looking to start my career</option>
                    <option value={Tenure.MID_CAREER.toString()}>An experienced employee looking for a change</option>
                </Select>
            </FormControl>
            <NextButton
                aria-label={"forward-arrow-button"}
                isDisabled={firstNameInput === "" || lastNameInput === "" || tenureInput === null}
                onClick={() => {
                    setFirstName(firstNameInput);
                    setLastName(lastNameInput);
                    setTenure(tenureInput!)
                    onNavigation();
                }}
            />
        </Flex>
    );
}
