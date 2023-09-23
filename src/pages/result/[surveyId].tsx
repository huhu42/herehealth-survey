import {Box, Center, Flex, Image, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from "react";
import {api} from "~/utils/api";
import {QueryError} from "~/client/QueryError";
import {isLoaded} from "~/client/utils";
import {Id} from "~/server/service/types";

export default function ResultPage() {
    type FollowUpSectionProps = {
        surveyId: Id
    }

    function FollowUpSection({surveyId}: FollowUpSectionProps) {
        const didFollowUp = api.survey.didFollowUp.useQuery(surveyId);
        QueryError.check({
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

    const router = useRouter();
    const surveyId: Id = router.query.surveyId as Id;

    const response = api.survey.response.useQuery(surveyId);
    QueryError.check({
        result: response,
        fieldName: "response",
        params: {surveyId}
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
                <FollowUpSection surveyId={surveyId}/>
            </Flex>}
        </Center>
    );
}