import React, {useState} from "react";
import {Center, Flex, IconButton, Spacer, Text} from "@chakra-ui/react";
import Logo from "~/client/components/Logo";
import NameForm from "~/client/components/NameForm";
import DragAndDropQuestion from "~/client/components/DragAndDropQuestion";
import SliderQuestion from "~/client/components/SliderQuestion";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";

export default function Survey() {
    function Splash() {
        return <Flex direction={"column"} alignItems={"center"} textAlign="center">
            <Logo w={{base: "60", md: "80"}}/>
            <Text w={{base: "80", md: "100"}} fontSize={{base: "md", md: "lg"}} color={"white"} mt={4}>
                Find your calling with state-of-the-art psychometrics and AI.
            </Text>
        </Flex>
    }

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
                return <NameForm/>
            }
            case Step.QUESTION_ONE: {
                return <DragAndDropQuestion question={"What is your favorite number?"} options={dragAndDropValue}/>;
            }
            case Step.QUESTION_TWO: {
                return <SliderQuestion question={"How much do you prefer right over left?"}/>;
            }
            case Step.QUESTION_THREE: {
                return <SliderQuestion question={"How much do you like the color purple?"}/>;
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
        return (<Flex my={8}>
            {step !== 0 && <IconButton
                icon={<FiArrowLeft/>}
                aria-label={"back-arrow-button"}
                bg="white"
                mx={6}
                variant={"outline"}
                onClick={() => {
                    setStep(step - 1)
                }}
            />}
            {step < Step.END_SENTINEL - 1 && <IconButton
                icon={<FiArrowRight/>}
                aria-label={"back-arrow-button"}
                bg="white"
                mx={6}
                variant={"outline"}
                onClick={() => {
                    setStep(step + 1)
                }}
            />}
        </Flex>);
    }

    const [step, setStep] = useState(Step.SPLASH);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);

    const [dragAndDropValue, setDragAndDropValue] = useState(["one", "two", "three", "four", "five", "six"]);
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
