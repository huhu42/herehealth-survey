import React, {useState} from "react";
import {Center, Flex} from "@chakra-ui/react";
import NameForm from "~/client/components/NameForm";
import DragAndDropQuestion, {DragAndDropItem} from "~/client/components/DragAndDropQuestion";
import SliderQuestion from "~/client/components/SliderQuestion";
import Splash from "~/client/components/Splash";
import {Request} from "~/server/service/types";

export default function Survey() {
    enum Step {
        SPLASH,
        NAME_FORM,
        QUESTION_ONE,
        QUESTION_TWO,
        QUESTION_THREE
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
                        setValue={setSliderTwoValue}
                        // we always pass this value on final question
                        onNavigation={(val?: number) => onSubmit(val!)}
                        finalQuestion={true}
                    />
                );
            }
            default: {
                throw new Error("component not found for step " + step);
            }
        }
    }

    function toWeightedValues(items: Array<DragAndDropItem>): Record<string, number> {
        const result: Record<string, number> = {};
        for (const item of items) {
            const value = items.length;
            result[item.key] = value;
        }
        return result;
    }

    function toRequest(firstName: string,
                       lastName: string,
                       dragAndDropItems: Array<DragAndDropItem>,
                       sliderOneValue: number,
                       sliderTwoValue: number): Request {
        const dragAndDropValues = toWeightedValues(dragAndDropItems);
        return {
            firstName: firstName,
            lastName: lastName,
            survey: {
                // hacky coercion here...
                a: dragAndDropValues["a"]!,
                b: dragAndDropValues["b"]!,
                c: dragAndDropValues["c"]!,
                d: dragAndDropValues["d"]!,
                e: dragAndDropValues["e"]!,
                f: dragAndDropValues["f"]!,
                g: sliderOneValue,
                h: sliderTwoValue,
            }
        };
    }

    const [step, setStep] = useState(Step.SPLASH);

    // survey inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dragAndDropItems, setDragAndDropItems] = useState([
        {key: "a", description: "one"},
        {key: "b", description: "two"},
        {key: "c", description: "three"},
        {key: "d", description: "four"},
        {key: "e", description: "five"},
        {key: "f", description: "six"},
    ]);
    const [sliderOneValue, setSliderOneValue] = useState(50);
    const [sliderTwoValue, setSliderTwoValue] = useState(50);

    return (
        <Center
            w={"100vw"}
            h={"100vh"}
            bgGradient={"linear(to-b, purple.900, purple.600)"}
        >
            <Flex direction={"column"} alignItems={"center"}>
                <ComponentByStep step={step}
                                 setStep={setStep}
                                 onSubmit={(finalValue: number) => alert(
                                     JSON.stringify(toRequest(firstName,
                                         lastName,
                                         dragAndDropItems,
                                         sliderOneValue,
                                         finalValue)))
                                 }/>
            </Flex>
        </Center>
    );
}
