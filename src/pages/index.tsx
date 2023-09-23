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
                        question={"What is your favorite number?"}
                        items={dragAndDropItems}
                        setItemsOrder={(i) => setDragAndDropItems(i)}
                        onNavigation={() => setStep(Step.QUESTION_TWO)}
                    />
                );
            }
            case Step.QUESTION_TWO: {
                return (
                    <SliderQuestion
                        question={"How much do you prefer right over left?"}
                        setValue={setSliderOneValue}
                        onNavigation={() => setStep(Step.QUESTION_THREE)}
                    />
                );
            }
            case Step.QUESTION_THREE: {
                return (
                    <SliderQuestion
                        question={"How much do you like the color purple?"}
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
                     sliderTwoValue: number): Request {
        return {
            firstName: firstName,
            lastName: lastName,
            survey: {
                0: rank(dragAndDropItems),
                1: sliderOneValue,
                2: sliderTwoValue,
            }
        };
    }

    const router = useRouter();
    const processRequest = api.survey.request.useMutation({
        onSuccess: async (id) => {
            await router.push(`/result/${id}`);
        },
        onError: (e) => {
            throw new Error(
                `failed to process request with exception ${e.message}`,
            );
        }
    });
    const [step, setStep] = useState(Step.SPLASH);

    // survey inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dragAndDropItems, setDragAndDropItems] = useState<Array<DragAndDropItem>>([
        {key: 0, description: "one"},
        {key: 1, description: "two"},
        {key: 2, description: "three"},
        {key: 3, description: "four"},
        {key: 4, description: "five"},
        {key: 5, description: "six"},
    ]);
    const [sliderOneValue, setSliderOneValue] = useState(50);
    // sliderTwoValue is just passed directly to form submission

    return (
        <Center
            w={"100vw"}
            h={"100vh"}
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
                                             finalValue)
                                     });
                                 }}
                />
            </Flex>
        </Center>
    );
}
