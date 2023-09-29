import React, {useState} from "react";
import {Center, Flex} from "@chakra-ui/react";
import NameForm from "~/client/components/NameForm";
import DragAndDropQuestion, {DragAndDropItem} from "~/client/components/DragAndDropQuestion";
import SliderQuestion from "~/client/components/SliderQuestion";
import Splash from "~/client/components/Splash";
import {Rank, Request} from "~/server/service/types";
import {api} from "~/utils/api";
import {useRouter} from "next/router";
import LoadingSpinner from "~/client/components/LoadingSpinner";

export default function Survey() {
    enum Step {
        SPLASH,
        NAME_FORM,
        QUESTION_ONE,
        QUESTION_TWO,
        QUESTION_THREE,
        QUESTION_FOUR,
        QUESTION_FIVE,
        QUESTION_SIX,
        LOADING
    }

    type ComponentByStepProp = {
        step: Step;
        setStep: (step: Step) => void;
        onSubmit: (finalValue: number) => void;
    };

    function ComponentByStep({step, setStep, onSubmit}: ComponentByStepProp) {
        switch (step) {
            case Step.SPLASH: {
                return <Splash onNavigation={() => setStep(Step.NAME_FORM)}/>;
            }
            case Step.NAME_FORM: {
                return (
                    <NameForm
                        setFirstName={(v: string) => setFirstName(v)}
                        setLastName={(v: string) => setLastName(v)}
                        onNavigation={() => setStep(Step.QUESTION_ONE)}
                    />
                );
            }
            case Step.QUESTION_ONE: {
                return (
                    <DragAndDropQuestion
                        title={"Work Energizers"}
                        question={"Please drag to rank what kind of work energizes you from top (relatively more energizing) to bottom (relatively least energizing)"}
                        items={dragAndDropItems}
                        setItemsOrder={(i) => setDragAndDropItems(i)}
                        onNavigation={() => setStep(Step.QUESTION_TWO)}
                    />
                );
            }
            case Step.QUESTION_TWO: {
                return (
                    <SliderQuestion
                        title={"Attentiveness"}
                        leftDescription={"I act spontaneously following my instincts"}
                        rightDescription={"I pay careful attention to detail"}
                        setValue={setSliderOneValue}
                        onNavigation={() => setStep(Step.QUESTION_THREE)}
                    />
                );
            }
            case Step.QUESTION_THREE: {
                return (
                    <SliderQuestion
                        title={"Receptiveness"}
                        leftDescription={"I like to stick with things I know"}
                        rightDescription={"I like to try new or unconventional activities"}
                        setValue={setSliderTwoValue}
                        onNavigation={() => setStep(Step.QUESTION_FOUR)}
                    />
                );
            }
            case Step.QUESTION_FOUR: {
                return (
                    <SliderQuestion
                        title={"Extraversion"}
                        leftDescription={"I gain energy from ideas and internal thoughts"}
                        rightDescription={"I gain energy from activities and people"}
                        setValue={setSliderThreeValue}
                        onNavigation={() => setStep(Step.QUESTION_FIVE)}
                    />
                );
            }
            case Step.QUESTION_FIVE: {
                return (
                    <SliderQuestion
                        title={"Turbulence"}
                        leftDescription={"My mood remains consistent despite unexpected turns of events"}
                        rightDescription={"My moods and feelings fluctuate quickly with events of the day"}
                        setValue={setSliderFourValue}
                        onNavigation={() => setStep(Step.QUESTION_SIX)}
                    />
                );
            }
            case Step.QUESTION_SIX: {
                return (
                    <SliderQuestion
                        title={"Agreeableness"}
                        leftDescription={"I prefer to stand by my own perspectives if I think I'm right"}
                        rightDescription={"I normally prioritize the feelings of others when making decisions"}
                        // there is an unideal bifurcation of the code off this
                        finalQuestion={true}
                        setValue={() => {
                            throw new Error("this should never be called")
                        }}
                        // we always pass this value on final question
                        onNavigation={(val?: number) => onSubmit(val!)}
                    />
                );
            }
            case Step.LOADING: {
                return (
                    <LoadingSpinner/>
                );
            }
            default: {
                throw new Error("component not found for step " + step);
            }
        }
    }

    function rank(items: Array<DragAndDropItem>): Rank {
        return items.map(i => i.key);
    }

    function request(firstName: string,
                     lastName: string,
                     dragAndDropItems: Array<DragAndDropItem>,
                     sliderOneValue: number,
                     sliderTwoValue: number,
                     sliderThreeValue: number,
                     sliderFourValue: number,
                     sliderFiveValue: number): Request {
        return {
            firstName: firstName,
            lastName: lastName,
            survey: {
                0: rank(dragAndDropItems),
                1: sliderOneValue,
                2: sliderTwoValue,
                3: sliderThreeValue,
                4: sliderFourValue,
                5: sliderFiveValue,
            }
        };
    }

    const router = useRouter();
    const processRequest = api.survey.request.useMutation({
        onSuccess: async (id) => {
            await router.push(`/result/${id}`);
        },
        onError: (e) => {
            console.error(`failed to process request with exception ${e.message}`);
            // retry
            setStep(Step.QUESTION_SIX);
            alert("Failed to generate survey result. Please try again.");
        }
    });
    const [step, setStep] = useState(Step.SPLASH);

    // survey inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dragAndDropItems, setDragAndDropItems] = useState<Array<DragAndDropItem>>([
        {key: 0, description: "Assessing ideas and situations"},
        {key: 1, description: "Supporting those in need with an idea or project"},
        {key: 2, description: "Challenging norms and pondering possibilities for potential and opportunity"},
        {key: 3, description: "Encouraging and inspiring others to take action"},
        {key: 4, description: "Novelizing new ideas and solutions in response to problems"},
        {key: 5, description: "Delivering projects and pushing tasks to completion"},
    ]);
    const [sliderOneValue, setSliderOneValue] = useState(50);
    const [sliderTwoValue, setSliderTwoValue] = useState(50);
    const [sliderThreeValue, setSliderThreeValue] = useState(50);
    const [sliderFourValue, setSliderFourValue] = useState(50);
    // sliderFiveValue is just passed directly to form submission

    return (
        <Center
            minW={"100vw"}
            minH={"100vh"}
            p={4}
            bgGradient={"linear(to-b, purple.900, purple.600)"}
        >
            <Flex direction={"column"} alignItems={"center"}>
                <ComponentByStep step={step}
                                 setStep={setStep}
                                 onSubmit={async (finalValue: number) => {
                                     setStep(Step.LOADING)
                                     processRequest.mutate({
                                         ...request(firstName,
                                             lastName,
                                             dragAndDropItems,
                                             sliderOneValue,
                                             sliderTwoValue,
                                             sliderThreeValue,
                                             sliderFourValue,
                                             finalValue)
                                     });
                                 }}
                />
            </Flex>
        </Center>
    );
}
