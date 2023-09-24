import {Box, Center, Flex, HStack, IconButton, Image, Text} from "@chakra-ui/react";
import React from "react";
import {api} from "~/utils/api";
import {QueryError} from "~/client/QueryError";
import {isLoaded} from "~/client/utils";
import {Id} from "~/server/service/types";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {FiRepeat, FiShare} from "react-icons/fi";
import {useRouter} from "next/router";

export default function ResultPage({surveyId}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    type FollowUpSectionProps = {
        surveyId: Id
    }

    function FollowUpSection({surveyId}: FollowUpSectionProps) {
        const didFollowUp = api.survey.didFollowUp.useQuery(surveyId, {refetchOnWindowFocus: false});
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
        // TODO
        return <Box></Box>;
    }

    function FollowUpAcknowledgementMessage() {
        // TODO
        return <Box></Box>;
    }

    const router = useRouter();
    const response = api.survey.response.useQuery(surveyId,
        // the response is static after generation
        {refetchOnWindowFocus: false}
    );
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
                <Image w={{base: 150, md: 200}} src={"../wizard.jpg"} borderRadius={"10"}/>
                <HStack spacing={0}>
                    <Text fontWeight={"extrabold"}
                          mt={6}
                          fontSize={{base: "xl", md: "2xl"}}
                          color={"pink.300"}>
                        {`${response.data!.firstName} ${response.data!.lastName}`}
                    </Text>
                    <Text fontWeight={"semibold"}
                          mt={6}
                          fontSize={{base: "xl", md: "2xl"}}
                          color={"white"}>
                        {"'s Dream Role"}
                    </Text>
                </HStack>
                <Text w={{base: 200, md: 400}}
                      fontWeight={"normal"}
                      fontSize={{base: "md", md: "xl"}}
                      mt={4}
                      color={"white"}>
                    {response.data!.result.description}
                </Text>
                <Flex w={200} direction={"row"} justifyContent={"space-around"}>
                    <IconButton
                        icon={<FiShare/>}
                        aria-label={"share-button"}
                        bg="white"
                        size={"lg"}
                        mt={8}
                        variant={"solid"}
                        onClick={() => {
                        }}
                    />
                    <IconButton
                        icon={<FiRepeat/>}
                        aria-label={"redo-button"}
                        size={"lg"}
                        bg="white"
                        mt={8}
                        variant={"solid"}
                        onClick={async () => {
                            await router.push("/");
                        }}
                    />
                </Flex>
                <FollowUpSection surveyId={surveyId}/>
            </Flex>}
        </Center>
    );
}

// https://stackoverflow.com/questions/57486380/why-would-a-query-param-be-undefined-in-nextjs
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