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
    IconButton, Image,
    Input,
    Text
} from "@chakra-ui/react";
import React, {useState} from "react";
import {FiArrowLeft} from "react-icons/fi";
import {useRouter} from "next/router";

export default function FollowUpPage({surveyId}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const isEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    async function share(): Promise<void> {
        // hacky, take away /followup to get back to survey results
        const url = window.location.href.slice(0, -8);
        if (navigator.share) {
            await navigator.share({
                title: `Uniphye Survey Results`,
                text: 'Take a look at my Uniphye AI psychometric results!',
                url: url,
            }).catch(e => {
                console.error('error while sharing: ' + e);
            });
        } else {
            alert(`Try sharing on your mobile browser or copy and share the link ${url}`);
        }
    }

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
        const [emailTouched, setEmailTouched] = useState(false)
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
                    Uniphye connects you with your ideal team
                </Text>
                <FormControl isRequired={true} isInvalid={emailTouched && !isEmail.test(emailInput)}>
                    <FormLabel color={"white"}>Email</FormLabel>
                    <FormHelperText color={"white"}>
                        You are more than your resume. Sign up for the beta waitlist of our psychometric AI team
                        building platform.
                    </FormHelperText>
                    <Input
                        mt={4}
                        value={emailInput}
                        color="black"
                        colorScheme="white"
                        variant="solid"
                        type={"email"}
                        onChange={(e) => {
                            setEmailTouched(true);
                            setEmailInput(e.target.value)
                        }}
                        placeholder="e.g., jsmith42@gmail.com"
                    />
                    <FormErrorMessage>Must be valid email address.</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel color={"white"} mt={4}>Limited Offer</FormLabel>
                    <FormHelperText color={"white"}>
                        The Uniphye Team is offering a white glove service to match <b>500 new signups</b> with
                        a hand-curated list of Silicon Valley startups based on your psychometric results for $10.
                    </FormHelperText>
                    <FormHelperText color={"white"} mt={3}>
                        No payment required at this time.
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
                >Join the movement!
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
                Visit us at <b><u><a href="https://www.uniphye.com">uniphye.com</a></u></b>. We will
                reach out to you soon.
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
            <Text fontSize={"sm"}
                  color={"white"}
                  mt={"12"}
            >
                There are currently thousands of users on the beta waitlist. <b>Share</b> your survey results to get
                priority access.
            </Text>
            <Button
                aria-label={"share-button"}
                colorScheme={"orange"}
                color={"white"}
                size={"md"}
                mt={4}
                variant={"solid"}
                onClick={async () => {
                    await share();
                }}
            >
                Share
            </Button>
            <Image mt={4} w={120} src={"/social-logos.png"}
                   onClick={async () => {
                       await share();
                   }}/>
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
            minW={"100vw"}
            minH={"100vh"}
            p={12}
            bgGradient={"linear(to-b, purple.600, purple.300)"}
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