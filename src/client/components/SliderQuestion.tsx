import {Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";
import React from "react";

type SliderQuestionProps = {
    question: string,
    value: number,
    onValueChange: (val: number) => void
}

export default function SliderQuestion({question, value, onValueChange}: SliderQuestionProps) {
    return (
        <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
            <Text w={{base: "80", md: "100"}} fontSize={{base: "xl", md: "xxl"}} color={"white"} mb={10}>
                {question}
            </Text>
            <Slider defaultValue={value} min={0} max={100} step={1} w={{base: 240, md: 300}}
                    onChange={(v) => onValueChange(v)}>
                <SliderTrack bg='pink.100'>
                    <Box position='relative' right={10}/>
                    <SliderFilledTrack bg='pink.800'/>
                </SliderTrack>
                <SliderThumb boxSize={6}/>
            </Slider>
        </Flex>
    )
}