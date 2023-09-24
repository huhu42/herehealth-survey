import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Id} from "~/server/service/types";
import {api} from "~/utils/api";
import {QueryError} from "~/client/QueryError";
import {isLoaded} from "~/client/utils";
import {Box, Center} from "@chakra-ui/react";
import React from "react";

export default function FollowUpPage({surveyId}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    type FollowUpFormProps = {
        surveyId: Id
    }

    function FollowUpForm({surveyId}: FollowUpFormProps) {
        // TODO
        return <Box></Box>;
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

    return (isLoaded(didFollowUp) &&
        <Center
            w={"100vw"}
            h={"100vh"}
            bgGradient={"linear(to-b, purple.900, purple.600)"}
        >
            {
                didFollowUp.data! ?
                    <FollowUpForm surveyId={surveyId}/> :
                    <FollowUpAcknowledgementMessage/>
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