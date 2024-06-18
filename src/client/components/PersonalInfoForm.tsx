import {Flex, FormControl, FormLabel, Input, Select, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import {NextButton} from "~/client/components/NextButton";
//import {Tenure} from "~/server/service/types";

type NameFormProps = {
    initialFirstName: string;
    setFirstName: (firstName: string) => void;
    initialLastName: string;
    setLastName: (lastName: string) => void;
    //initialTenure: Tenure | null;
    //setTenure: (tenure: Tenure) => void;
    onNext: () => void;
};

export default function PersonalInfoForm({
                                             initialFirstName,
                                             setFirstName,
                                             initialLastName,
                                             setLastName,
                                             //setTenure,
                                             //initialTenure,
                                             onNext,
                                         }: NameFormProps) 
                                         {
    // function toTenure(value: string): Tenure | null {
    //     switch (value) {
    //         case "0": {
    //             return Tenure.NEW_GRAD;
    //         }
    //         case "1": {
    //             return Tenure.MID_CAREER;
    //         }
    //         case "": {
    //             return null;
    //         }
    //         default: {
    //             throw new Error(`unrecognized value ${value}`);
    //         }
    //    }
    // }
    // function toValue(tenure: Tenure | null) {
    //     switch (tenure) {
    //         case Tenure.NEW_GRAD: {
    //             return "0";
    //         }
    //         case Tenure.MID_CAREER: {
    //             return "1";
    //         }
    //         case null: {
    //             return "";
    //         }
    //         default: {
    //             throw new Error(`unrecognized value ${tenure}`);
    //         }
    //     }
    // }

    const [firstNameInput, setFirstNameInput] = useState(initialFirstName);
    const [lastNameInput, setLastNameInput] = useState(initialLastName);
    //const [tenureInput, setTenureInput] = useState<Tenure | null>(initialTenure);
    const FORM_WIDTH = {base: 250, md: 400}
    return (
        <Flex
            flexDirection={"column"}
            w={FORM_WIDTH}
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
                    mt={2}
                    mb={4}
                    value={firstNameInput}
                    color="black"
                    colorScheme="white"
                    variant="solid"
                    onChange={(e) => setFirstNameInput(e.target.value)}
                    placeholder="FirstName"
                />
            </FormControl>
            <FormControl isRequired={true}>
                <FormLabel color={"white"}>Last Name</FormLabel>
                <Input
                    mt={2}
                    mb={4}
                    value={lastNameInput}
                    color="black"
                    colorScheme="white"
                    variant="solid"
                    onChange={(e) => setLastNameInput(e.target.value)}
                    placeholder="LastName"
                />
            </FormControl>
            {/* <FormControl isRequired={true}>
                <FormLabel color={"white"}>Experience</FormLabel>
                <Select
                    mt={3}
                    mb={4}
                    color="black"
                    colorScheme="white"
                    variant="solid"
                    value={toValue(tenureInput)}
                    onChange={(e) => setTenureInput(toTenure(e.target.value))}
                    placeholder="What best describes you?"
                >
                    <option value={Tenure.NEW_GRAD}>New graduate</option>
                    <option value={Tenure.MID_CAREER}>Experienced employee</option>
                </Select>
            </FormControl> */}
            <NextButton
                aria-label={"forward-arrow-button"}
                isDisabled={firstNameInput === "" || lastNameInput === "" } //tenureInput === null}
                onClick={() => {
                    setFirstName(firstNameInput);
                    setLastName(lastNameInput);
                    //setTenure(tenureInput!)
                    onNext();
                }}
            />
        </Flex>
    );
}
