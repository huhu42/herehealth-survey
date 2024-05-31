import {
    Box,
    Button,
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {NextButton} from "~/client/components/NextButton";
import {BackButton} from "~/client/components/BackButton";

type SliderQuestionProps = {
    title: string;
    leftDescription: string;
    rightDescription: string;
    progressLabel: string;
    initialValue: number,
    setValue: (val: number) => void;
    onNext: (val?: number) => void;
    onBack: () => void;
    finalQuestion?: boolean;
};

export default function SliderQuestion({
                                           title,
                                           leftDescription,
                                           rightDescription,
                                           progressLabel,
                                           initialValue,
                                           setValue,
                                           onNext,
                                           onBack,
                                           finalQuestion,
                                       }: SliderQuestionProps) {
    const [sliderValue, setSliderValue] = useState(initialValue);
    return (
        <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
            <Text
                w={{base: 80, md: 400}}
                fontWeight={"bold"}
                fontSize={{base: "2xl", md: "3xl"}}
                color={"white"}
                mb={6}
            >
                {title}
            </Text>
            <Flex direction={"row"} w={{base: 300, md: 480}}
                  justifyContent={"space-between"}
                  alignItems={"flex-end"}>
                <Text
                    w={{base: 40, md: 160}}
                    fontSize={{base: "sm", md: "lg"}}
                    color={"white"}
                    mb={2}
                >
                    {leftDescription}
                </Text>
                <Text
                    w={{base: 40, md: 160}}
                    fontSize={{base: "sm", md: "lg"}}
                    color={"white"}
                    mb={2}
                >
                    {rightDescription}
                </Text>
            </Flex>
            <Slider
                defaultValue={sliderValue}
                min={0}
                max={100}
                step={1}
                mb={8}
                w={{base: 240, md: 400}}
                onChange={(v) => setSliderValue(v)}
            >
                <SliderTrack bg="pink.100">
                    <Box position="relative" right={10}/>
                    <SliderFilledTrack bg="pink.800"/>
                </SliderTrack>
                <SliderThumb boxSize={6}/>
            </Slider>
            {!!finalQuestion ? (
                <>
                    <Button
                        aria-label={"submit-button"}
                        bg="white"
                        mt={8}
                        variant={"solid"}
                        onClick={() => {
                            onNext(sliderValue);
                        }}
                    >
                        Optimize my morning!
                    </Button>
                    <BackButton
                        aria-label={"back-arrow-button"}
                        onClick={() => {
                            setValue(sliderValue);
                            onBack();
                        }}
                    />
                    <Text
                        fontSize={"sm"}
                        color={"white"}
                        mt={6}
                    >
                        {progressLabel}
                    </Text>
                </>
            ) : (
                <Flex direction={"row"} alignItems={"center"}>
                    <BackButton
                        aria-label={"back-arrow-button"}
                        onClick={() => {
                            setValue(sliderValue);
                            onBack();
                        }}
                    />
                    <Text
                        fontSize={"sm"}
                        color={"white"}
                        mt={8}
                    >
                        {progressLabel}
                    </Text>
                    <NextButton
                        aria-label={"forward-arrow-button"}
                        onClick={() => {
                            setValue(sliderValue);
                            onNext();
                        }}
                    />
                </Flex>
            )}
        </Flex>
    );
}
