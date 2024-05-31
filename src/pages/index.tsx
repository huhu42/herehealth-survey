import React, {useState} from "react";
import {Center, Flex} from "@chakra-ui/react";
import PersonalInfoForm from "~/client/components/PersonalInfoForm";
import DragAndDropQuestion, {DragAndDropItem} from "~/client/components/DragAndDropQuestion";
import SliderQuestion from "~/client/components/SliderQuestion";
import Splash from "~/client/components/Splash";
import {Rank, Request} from "~/server/service/types";
//import {Rank, Request, Tenure} from "~/server/service/types";
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
                        //initialTenure={tenure}
                        //setTenure={(v: Tenure) => setTenure(v)}
                        onNext={() => setStep(Step.QUESTION_ONE)}
                    />
                );
            }
            case Step.QUESTION_ONE: {
                return (
                    <DragAndDropQuestion
                        title={"Goals"}
                        question={"What are your top goals? Drag to rank from most important (top) to least important(bottom)."}
                        prompt={"I would like to..."}
                        progressLabel={"1/2"}
                        items={dragAndDropItems}
                        setItemsOrder={(i) => setDragAndDropItems(i)}
                        onNext={() => setStep(Step.QUESTION_SIX)}
                        //onNext={(val?: number) => onSubmit(val!)}
                        onBack={() => setStep(Step.NAME_FORM)}
                    />
                );
            }
            // case Step.QUESTION_TWO: {
            //     return (
            //         <SliderQuestion
            //             title={"Attentiveness"}
            //             leftDescription={"I act spontaneously following my instincts"}
            //             rightDescription={"I pay careful attention to detail"}
            //             progressLabel={"2/6"}
            //             initialValue={sliderOneValue}
            //             setValue={setSliderOneValue}
            //             onNext={() => setStep(Step.QUESTION_THREE)}
            //             onBack={() => setStep(Step.QUESTION_ONE)}
            //         />
            //     );
            // }
            // case Step.QUESTION_THREE: {
            //     return (
            //         <SliderQuestion
            //             title={"Receptiveness"}
            //             leftDescription={"I like to stick with things I know"}
            //             rightDescription={"I like to try new or unconventional activities"}
            //             progressLabel={"3/6"}
            //             initialValue={sliderTwoValue}
            //             setValue={setSliderTwoValue}
            //             onNext={() => setStep(Step.QUESTION_FOUR)}
            //             onBack={() => setStep(Step.QUESTION_TWO)}
            //         />
            //     );
            // }
            // case Step.QUESTION_FOUR: {
            //     return (
            //         <SliderQuestion
            //             title={"Extraversion"}
            //             leftDescription={"I gain energy from ideas and internal thoughts"}
            //             rightDescription={"I gain energy from activities and people"}
            //             progressLabel={"4/6"}
            //             initialValue={sliderThreeValue}
            //             setValue={setSliderThreeValue}
            //             onNext={() => setStep(Step.QUESTION_FIVE)}
            //             onBack={() => setStep(Step.QUESTION_THREE)}
            //         />
            //     );
            // }
            // case Step.QUESTION_FIVE: {
            //     return (
            //         <SliderQuestion
            //             title={"Turbulence"}
            //             leftDescription={"My mood remains consistent despite unexpected turns of events"}
            //             rightDescription={"My moods and feelings fluctuate quickly with events of the day"}
            //             progressLabel={"5/6"}
            //             initialValue={sliderFourValue}
            //             setValue={setSliderFourValue}
            //             onNext={() => setStep(Step.QUESTION_SIX)}
            //             onBack={() => setStep(Step.QUESTION_FOUR)}
            //         />
            //     );
            // }
            case Step.QUESTION_SIX: {
                return (
                    <SliderQuestion
                        title={"Routine Length"}
                        leftDescription={"I prefer morning routines that are short and concise - 3-5 minutes"}
                        rightDescription={"I prefer extensive morning routines that take ~30 minutes"}
                        progressLabel={"2/2"}
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
                     //sliderOneValue: number,
                     //sliderTwoValue: number,
                     //sliderThreeValue: number,
                     //sliderFourValue: number,
                     sliderFiveValue: number
                     ): Request {
        return {
            firstName: firstName,
            lastName: lastName,
            //tenure: 0, //tenure!,
            survey: {
                0: rank(dragAndDropItems),
                //1: 0, //sliderOneValue,
                //2: 0, //sliderTwoValue,
                //3: 0, //sliderThreeValue,
                //4: 0, //sliderFourValue,
                //5: sliderFiveValue,
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
    //const [tenure, setTenure] = useState<Tenure | null>(null);
    const [dragAndDropItems, setDragAndDropItems] = useState<Array<DragAndDropItem>>([
        {key: 0, description: "<b>Mental Health</b> my focus and mental sharpness"},
        {key: 1, description: "<b>Physical Health</b> gain more muscles an "},
        {key: 2, description: "<b>Energy</b> "},
        {key: 3, description: "<b>Sleep</b> "},
        {key: 4, description: "<b>Diet</b> "},
        {key: 5, description: "<b>Lose Weight and Diet</b>"},
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
                                             //sliderOneValue,
                                             //sliderTwoValue,
                                             //sliderThreeValue,
                                             //sliderFourValue,
                                             finalValue
                                            )
                                     });
                                 }}
                />
            </Flex>
        </Center>
    );
}
