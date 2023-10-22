import React, {useState} from "react";
import {Center, Flex} from "@chakra-ui/react";
import PersonalInfoForm from "~/client/components/PersonalInfoForm";
import DragAndDropQuestion, {DragAndDropItem} from "~/client/components/DragAndDropQuestion";
import SliderQuestion from "~/client/components/SliderQuestion";
import Splash from "~/client/components/Splash";
import {Rank, Request, Tenure} from "~/server/service/types";
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
                    <PersonalInfoForm
                        initialFirstName={firstName}
                        setFirstName={(v: string) => setFirstName(v)}
                        initialLastName={lastName}
                        setLastName={(v: string) => setLastName(v)}
                        initialTenure={tenure}
                        setTenure={(v: Tenure) => setTenure(v)}
                        onNext={() => setStep(Step.QUESTION_ONE)}
                    />
                );
            }
            case Step.QUESTION_ONE: {
                return (
                    <DragAndDropQuestion
                        title={"Work Energizers"}
                        question={"What workplace activities energize you most? Drag to rank energizers from most energizing (top) to least energizing (bottom)."}
                        prompt={"I am energized and motivated by..."}
                        progressLabel={"1/6"}
                        items={dragAndDropItems}
                        setItemsOrder={(i) => setDragAndDropItems(i)}
                        onNext={() => setStep(Step.QUESTION_TWO)}
                        onBack={() => setStep(Step.NAME_FORM)}
                    />
                );
            }
            case Step.QUESTION_TWO: {
                return (
                    <SliderQuestion
                        title={"Attentiveness"}
                        leftDescription={"I act spontaneously following my instincts"}
                        rightDescription={"I pay careful attention to detail"}
                        progressLabel={"2/6"}
                        initialValue={sliderOneValue}
                        setValue={setSliderOneValue}
                        onNext={() => setStep(Step.QUESTION_THREE)}
                        onBack={() => setStep(Step.QUESTION_ONE)}
                    />
                );
            }
            case Step.QUESTION_THREE: {
                return (
                    <SliderQuestion
                        title={"Receptiveness"}
                        leftDescription={"I like to stick with things I know"}
                        rightDescription={"I like to try new or unconventional activities"}
                        progressLabel={"3/6"}
                        initialValue={sliderTwoValue}
                        setValue={setSliderTwoValue}
                        onNext={() => setStep(Step.QUESTION_FOUR)}
                        onBack={() => setStep(Step.QUESTION_TWO)}
                    />
                );
            }
            case Step.QUESTION_FOUR: {
                return (
                    <SliderQuestion
                        title={"Extraversion"}
                        leftDescription={"I gain energy from ideas and internal thoughts"}
                        rightDescription={"I gain energy from activities and people"}
                        progressLabel={"4/6"}
                        initialValue={sliderThreeValue}
                        setValue={setSliderThreeValue}
                        onNext={() => setStep(Step.QUESTION_FIVE)}
                        onBack={() => setStep(Step.QUESTION_THREE)}
                    />
                );
            }
            case Step.QUESTION_FIVE: {
                return (
                    <SliderQuestion
                        title={"Turbulence"}
                        leftDescription={"My mood remains consistent despite unexpected turns of events"}
                        rightDescription={"My moods and feelings fluctuate quickly with events of the day"}
                        progressLabel={"5/6"}
                        initialValue={sliderFourValue}
                        setValue={setSliderFourValue}
                        onNext={() => setStep(Step.QUESTION_SIX)}
                        onBack={() => setStep(Step.QUESTION_FOUR)}
                    />
                );
            }
            case Step.QUESTION_SIX: {
                return (
                    <SliderQuestion
                        title={"Agreeableness"}
                        leftDescription={"I prefer to stand by my own perspectives if I think I'm right"}
                        rightDescription={"I normally prioritize the feelings of others when making decisions"}
                        progressLabel={"6/6"}
                        // there is an unideal bifurcation of the code off this
                        finalQuestion={true}
                        initialValue={sliderFiveValue}
                        setValue={setSliderFiveValue}
                        // we always pass this value on final question
                        onNext={(val?: number) => onSubmit(val!)}
                        onBack={() => setStep(Step.QUESTION_FIVE)}
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
            tenure: tenure!,
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
            alert("Sorry :( There was a timeout in generating survey result. This can often be due to network issues. Please wait and try again.");
        }
    });
    const [step, setStep] = useState(Step.SPLASH);

    // survey inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [tenure, setTenure] = useState<Tenure | null>(null);
    const [dragAndDropItems, setDragAndDropItems] = useState<Array<DragAndDropItem>>([
        {key: 0, description: "<b>Assessing</b> pros, cons, and viability of ideas and situations"},
        {key: 1, description: "<b>Helping</b> others in need with ideas or projects"},
        {key: 2, description: "<b>Challenging</b> the status quo and pondering possibilities for potential and opportunity"},
        {key: 3, description: "<b>Encouraging</b> and inspiring others to come together and take action"},
        {key: 4, description: "<b>Creating</b> new ideas, inventions, and solutions in response to problems"},
        {key: 5, description: "<b>Completing</b> tasks and delivering projects to check them off as done"},
    ]);
    const [sliderOneValue, setSliderOneValue] = useState(50);
    const [sliderTwoValue, setSliderTwoValue] = useState(50);
    const [sliderThreeValue, setSliderThreeValue] = useState(50);
    const [sliderFourValue, setSliderFourValue] = useState(50);
    const [sliderFiveValue, setSliderFiveValue] = useState(50);

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
