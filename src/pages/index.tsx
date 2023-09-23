import React, {useState} from "react";
import {Button, Center, Flex, IconButton, Text} from "@chakra-ui/react";
import NameForm from "~/client/components/NameForm";
import DragAndDropQuestion from "~/client/components/DragAndDropQuestion";
import SliderQuestion from "~/client/components/SliderQuestion";
import {FiArrowRight} from "react-icons/fi";
import Splash from "~/client/components/Splash";

export default function Survey() {
    enum Step {
        SPLASH,
        NAME_FORM,
        QUESTION_ONE,
        QUESTION_TWO,
        QUESTION_THREE,
        // unused
        END_SENTINEL,
    }

    type ComponentByStepProp = {
        step: Step;
    }

    function ComponentByStep({step}: ComponentByStepProp) {
        switch (step) {
            case Step.SPLASH: {
                return <Splash/>
            }
            case Step.NAME_FORM: {
                return <NameForm firstName={firstName}
                                 onFirstNameChange={(v) => setFirstName(v)}
                                 lastName={lastName}
                                 onLastNameChange={(v) => setLastName(v)}/>
            }
            case Step.QUESTION_ONE: {
                return <DragAndDropQuestion question={"What is your favorite number?"}
                                            items={dragAndDropItems}
                                            onItemsReorder={(i) => setDragAndDropItems(i)}/>;
            }
            case Step.QUESTION_TWO: {
                return <SliderQuestion question={"How much do you prefer right over left?"}
                                       value={sliderOneValue}
                                       onValueChange={(v) => {
                                           setSliderOneValue(v)
                                       }}/>;
            }
            case Step.QUESTION_THREE: {
                return <SliderQuestion question={"How much do you like the color purple?"}
                                       value={sliderTwoValue}
                                       onValueChange={(v) => {
                                           setSliderTwoValue(v)
                                       }}/>;
            }
            default: {
                throw new Error("component not found for step " + step);
            }
        }
    }

    type NavigationButtonsProps = {
        step: Step;
        setStep: (step: Step) => void;
    }

    function NavigationButtons({step, setStep}: NavigationButtonsProps) {
        const next = (step: Step) => setStep(step + 1);

        if (step === 0) {
            return <Button
                aria-label={"start-button"}
                bg="white"
                mt={8}
                variant={"solid"}
                onClick={() => {
                    next(step)
                }}
            >Let's go!</Button>
        }
        if (step > 0 && step < Step.END_SENTINEL - 1) {
            return <IconButton
                icon={<FiArrowRight/>}
                aria-label={"back-arrow-button"}
                bg="white"
                mt={8}
                variant={"solid"}
                onClick={() => {
                    next(step)
                }}
            />
        }
        if (step === Step.END_SENTINEL - 1) {
            return <Button
                aria-label={"start-button"}
                bg="white"
                mt={8}
                variant={"solid"}
                onClick={() => {
                    alert("Hi world");
                }}
            >Find my calling!</Button>
        }
        throw new Error("navigation not found for step " + step)
    }

    const [step, setStep] = useState(Step.SPLASH);

    // survey inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dragAndDropItems, setDragAndDropItems] = useState(["one", "two", "three", "four", "five", "six"]);
    const [sliderOneValue, setSliderOneValue] = useState(50);
    const [sliderTwoValue, setSliderTwoValue] = useState(50);

    return (
        <Center w={"100vw"} h={"100vh"} bgGradient={'linear(to-b, purple.900, purple.600)'}>
            <Flex direction={"column"} alignItems={"center"}>
                <ComponentByStep step={step}/>
                <NavigationButtons step={step} setStep={setStep}/>
            </Flex>
        </Center>
    );
}
