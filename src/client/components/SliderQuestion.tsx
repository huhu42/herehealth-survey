import {Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text} from "@chakra-ui/react";

type SliderQuestionProps = {
    question: string
}

export default function SliderQuestion({question}: SliderQuestionProps) {
    return (
        <Flex direction={"column"} textAlign={"center"}>
            <Text w={{base: "80", md: "100"}} fontSize={{base: "xl", md: "xxl"}} color={"white"} mb={10}>{question}</Text>
            <Slider defaultValue={150} min={0} max={300} step={30}>
                <SliderTrack bg='pink.100'>
                    <Box position='relative' right={10}/>
                    <SliderFilledTrack bg='pink.800'/>
                </SliderTrack>
                <SliderThumb boxSize={6}/>
            </Slider>
        </Flex>
    )
}