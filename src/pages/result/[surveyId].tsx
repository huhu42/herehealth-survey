import {Box, Center, Flex, Image, Text} from "@chakra-ui/react";
import React from "react";
import {api} from "~/utils/api";
import {QueryError} from "~/client/QueryError";
import {isLoaded} from "~/client/utils";
import {Id} from "~/server/service/types";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

export default function ResultPage({surveyId}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    type FollowUpSectionProps = {
        surveyId: Id
    }

    function FollowUpSection({surveyId}: FollowUpSectionProps) {
        const didFollowUp = api.survey.didFollowUp.useQuery(surveyId);
        // there is an edge-case where this returns null on
        // first query ¯\_(ツ)_/¯
        QueryError.checkNullable({
            result: didFollowUp,
            fieldName: "didFollowUp",
            params: {
                surveyId
            }
        });
        return isLoaded(didFollowUp)
            && (didFollowUp.data! ?
                <FollowUpForm surveyId={surveyId}/> :
                <FollowUpAcknowledgementMessage/>);
    }

    type FollowUpFormProps = {
        surveyId: Id
    }

    function FollowUpForm({surveyId}: FollowUpFormProps) {
        return <Box></Box>;
    }

    function FollowUpAcknowledgementMessage() {
        return <Box></Box>;
    }

    const response = api.survey.response.useQuery(surveyId);
    QueryError.check({
        result: response,
        fieldName: "response",
        params: {surveyId: surveyId}
    });

    return (
        <Center
            w={"100vw"}
            h={"100vh"}
            bgGradient={"linear(to-b, purple.900, purple.600)"}
        >
            {isLoaded(response) && <Flex direction={"column"} alignItems={"center"} textAlign={"center"}>
                <Image w={{base: 150, md: 200}} src={"../placeholder.jpg"} borderRadius={"10"}/>
                <Text fontWeight={"semibold"}
                      mt={6}
                      fontSize={{base: "xl", md: "2xl"}}
                      color={"white"}>
                    {`${response.data!.firstName + " " + response.data!.lastName}'s ideal role`}
                </Text>
                <Text w={{base: 200, md: 400}}
                      fontWeight={"normal"}
                      fontSize={{base: "md", md: "xl"}}
                      mt={4}
                      color={"white"}>
                    {response.data!.result.description}
                </Text>
                <FollowUpSection surveyId={response.data!.id}/>
            </Flex>}
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