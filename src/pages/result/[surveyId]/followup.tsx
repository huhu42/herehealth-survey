import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {Id} from "~/server/service/types";
import {api} from "~/utils/api";
import {QueryError} from "~/client/QueryError";
import {isLoaded} from "~/client/utils";
import {
    Button,
    Center,
    Checkbox,
    Flex,
    FormControl, FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    Text
} from "@chakra-ui/react";
import React, {useState} from "react";
import {FiArrowLeft} from "react-icons/fi";
import {useRouter} from "next/router";

export default function FollowUpPage({surveyId}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    type FollowUpFormProps = {
        surveyId: Id
    }

    function FollowUpForm({surveyId}: FollowUpFormProps) {
        const context = api.useContext();
        const followUp = api.survey.followUp.useMutation({
            onSuccess: async () => {
                await context.survey.didFollowUp.invalidate(surveyId);
            }
        });
        const [emailInput, setEmailInput] = useState("");
        const [requestMatchesInput, setRequestMatchesInput] = useState(false);
        return (
            <Flex
                flexDirection={"column"}
                w={{base: 300, md: 400}}
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
                    Uniphye connects you with your ideal team.
                </Text>
                <FormControl isRequired={true}>
                    <FormLabel color={"white"}>Email</FormLabel>
                    <FormHelperText color={"white"}>
                        Sign up for the beta waitlist of our psychometric AI team building platform
                    </FormHelperText>
                    <Input
                        my={4}
                        value={emailInput}
                        color="black"
                        colorScheme="white"
                        variant="solid"
                        type={"email"}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="e.g., jsmith42@gmail.com"
                    />
                    <FormErrorMessage>Must be valid email address.</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel color={"white"} mt={4}>Limited Offer</FormLabel>
                    <FormHelperText color={"white"}>For the first <b>100 people</b>, the Uniphye team is providing a
                        service to match you with Silicon Valley start-ups and give you <b>1</b> warm introduction for <b>$195</b>
                    </FormHelperText>
                    <Checkbox my={4} size='lg'
                              colorScheme='white'
                              checked={requestMatchesInput}
                              onChange={(c) => setRequestMatchesInput(c.target.checked)}>
                        <Text color={"white"} fontWeight={"semibold"} fontSize={"sm"}>
                            Yes, I am interested
                        </Text>
                    </Checkbox>
                </FormControl>
                <Button
                    aria-label={"submit-button"}
                    mt={4}
                    isDisabled={emailInput === ""}
                    onClick={() => {
                        followUp.mutate({
                            id: surveyId,
                            email: emailInput,
                            requestMatches: requestMatchesInput
                        })
                    }}
                >Submit
                </Button>
            </Flex>)
    }

    function FollowUpAcknowledgementMessage() {
        const router = useRouter();
        return <Flex direction={"column"} w={400} textAlign={"center"} alignItems={"center"}>
            <Text fontSize={"xl"}
                  fontWeight={"semibold"}
                  color={"white"}
            >
                Thank-you for your interest in Uniphye!
            </Text>
            <Text fontSize={"md"}
                  color={"white"}
                  mt={"4"}
            >
                We will reach out to you soon.
            </Text>
            <IconButton
                icon={<FiArrowLeft/>}
                aria-label={"back-arrow-button"}
                bg="white"
                mt={8}
                variant={"solid"}
                onClick={async () => {
                    await router.push(`/result/${surveyId}`);
                }}
            />
        </Flex>;
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
            p={8}
            bgGradient={"linear(to-b, pink.700, pink.400)"}
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