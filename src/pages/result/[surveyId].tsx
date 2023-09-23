import {Center, Flex, Image, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React from "react";
import {api} from "~/utils/api";
import {QueryError} from "~/client/QueryError";
import {isLoaded} from "~/client/utils";

export default function ResultPage() {
    const router = useRouter();
    const surveyId: string = router.query.surveyId as string;

    const response = api.survey.response.useQuery(surveyId);
    QueryError.check({result: response, fieldName: "response"});

    return (
        <Center
            w={"100vw"}
            h={"100vh"}
            bgGradient={"linear(to-b, purple.600, purple.400)"}
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
            </Flex>}
        </Center>
    );
}