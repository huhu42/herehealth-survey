import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Id} from "~/server/service/types";
import {api} from "~/utils/api";
import {QueryError} from "~/client/QueryError";
import {isLoaded} from "~/client/utils";
import {Box, Button, Center, Checkbox, Flex, FormControl, FormLabel, Input, Text} from "@chakra-ui/react";
import React, {useState} from "react";

export default function FollowUpPage({surveyId}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    type FollowUpFormProps = {
        surveyId: Id
    }

    function FollowUpForm({surveyId}: FollowUpFormProps) {
        const [emailInput, setEmailInput] = useState("");
        const [requestMatchesInput, setRequestMatchesInput] = useState(false);
        return (
            <Flex
                flexDirection={"column"}
                w={{sm: 250, md: 400}}
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
                    Sign Up
                </Text>
                <FormControl isRequired={true}>
                    <FormLabel color={"white"}>Email</FormLabel>
                    <Input
                        my={2}
                        value={emailInput}
                        color="black"
                        colorScheme="white"
                        variant="solid"
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="e.g., jsmith42@gmail.com"
                    />
                </FormControl>
                <FormControl>
                    <Checkbox my={4} size='lg'
                              colorScheme='white'
                              onChange={(c) => setRequestMatchesInput(c.target.checked)}>
                        <Text color={"white"} fontWeight={"semibold"} fontSize={"sm"}>
                            Match me with roles
                        </Text>
                    </Checkbox>
                </FormControl>
                <Button
                    aria-label={"submit-button"}
                    mt={8}
                    isDisabled={emailInput === ""}
                    onClick={() => {
                        // TODO
                    }}
                />
            </Flex>)
    }

    function FollowUpAcknowledgementMessage() {
        // TODO
        return <Box></Box>;
    }

    const didFollowUp = api.survey.didFollowUp.useQuery(surveyId, {refetchOnWindowFocus: false});
    // there is an edge-case where this returns null on first query ¯\_(ツ)_/¯
    QueryError.checkNullable({
        result: didFollowUp,
        fieldName: "didFollowUp",
        params: {
            surveyId
        }
    });

    return (<Center
            w={"100vw"}
            h={"100vh"}
            bgGradient={"linear(to-b, purple.900, purple.600)"}
        >
            {isLoaded(didFollowUp)
                && (didFollowUp.data! ?
                    <FollowUpAcknowledgementMessage/> :
                    <FollowUpForm surveyId={surveyId}/>)
            }
        </Center>
    );
}

export const getServerSideProps = (async (ctx) => {
    const {surveyId} = ctx.query;
    if (typeof surveyId !== "string") {
        throw new Error("expected surveyId of type string but was " + surveyId);
    }
    return {
        props: {
            surveyId,
        },
    };
}) satisfies GetServerSideProps<{
    surveyId: Id
}>