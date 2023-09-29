import {Button, Center, Flex, HStack, IconButton, Image, Text} from "@chakra-ui/react";
import React from "react";
import {api} from "~/utils/api";
import {QueryError} from "~/client/QueryError";
import {isLoaded} from "~/client/utils";
import {Id} from "~/server/service/types";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {FiRepeat, FiShare} from "react-icons/fi";
import {useRouter} from "next/router";
import Logo from "~/client/components/Logo";

export default function ResultPage({surveyId}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    async function share(firstName: string, lastName: string): Promise<void> {
        if (navigator.share) {
            await navigator.share({
                title: `${firstName} ${lastName}'s Dream Role`,
                text: 'Take a look at my Uniphye AI psychometric results!',
                url: window.location.href,
            }).catch(e => {
                console.error('error while sharing: ' + e);
            });
        } else {
            alert('Share not supported on this browser. Please copy and share the URL directly to share!');
        }
    }

    function NextActionButtons() {
        return <Flex w={{base: 240, md: 300}} direction={"column"} alignItems={"center"}>
            <Flex w={200} direction={"row"} justifyContent={"space-around"}>
                <IconButton
                    icon={<FiShare/>}
                    aria-label={"share-button"}
                    bg="white"
                    size={"lg"}
                    mt={8}
                    variant={"solid"}
                    onClick={async () => {
                        await share(response.data!.firstName, response.data!.lastName);
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
            <Text mt={{base: 6, md: 8}} color={"white"} fontSize={"sm"}>
                Don't stop here. Let Uniphye help you <b>actually </b>
                find your dream job.
            </Text>
            <Button mt={4}
                    colorScheme={"orange"}
                    color={"white"}
                    variant={"solid"}
                    size={"sm"}
                    onClick={async () => {
                        await router.push(`${router.asPath}/followup`)
                    }}>
                Yes, I'm interested</Button>
        </Flex>
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
            minW={"100vw"}
            minH={"100vh"}
            p={12}
            bgGradient={"linear(to-b, purple.600, purple.300)"}
        >
            {isLoaded(response) && <Flex direction={"column"} alignItems={"center"} textAlign={"center"}>
                <Image w={{base: 150, md: 200}} src={"../wizard.jpg"} borderRadius={"10"}/>
                <HStack spacing={0}>
                    <Text fontWeight={"extrabold"}
                          mt={6}
                          fontSize={{base: "xl", md: "2xl"}}
                          color={"purple.900"}>
                        {`${response.data!.firstName} ${response.data!.lastName}`}
                    </Text>
                    <Text fontWeight={"semibold"}
                          mt={6}
                          fontSize={{base: "xl", md: "2xl"}}
                          color={"white"}>
                        {"'s Dream Role"}
                    </Text>
                </HStack>
                <Text w={{base: 240, md: 600}}
                      fontWeight={"normal"}
                      fontSize={{base: "sm", md: "lg"}}
                      mt={4}
                      color={"white"}>
                    {response.data!.result.description}
                </Text>
                <NextActionButtons/>
                <Logo w={20} mt={8} onClick={async () => {
                    await router.push("https://www.uniphye.com/")
                }}/>
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