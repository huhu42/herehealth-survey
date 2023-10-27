import {Reorder} from "framer-motion";
import React, {useState} from "react";
import {Box, Card, Center, Flex, Icon, Text, UnorderedList} from "@chakra-ui/react";
import {NextButton} from "~/client/components/NextButton";
import {BackButton} from "~/client/components/BackButton";
import {FiAlignJustify, FiArrowLeft} from "react-icons/fi";

type ItemKey = 0 | 1 | 2 | 3 | 4 | 5;
export type DragAndDropItem = {
    key: ItemKey
    description: string
}

type DragAndDropQuestionProp = {
    title: string
    question: string;
    prompt: string;
    progressLabel: string;
    items: Array<DragAndDropItem>;
    setItemsOrder: (items: Array<DragAndDropItem>) => void;
    onBack: () => void;
    onNext: () => void;
};

export default function DragAndDropQuestion({
                                                title,
                                                question,
                                                prompt,
                                                progressLabel,
                                                items,
                                                setItemsOrder,
                                                onNext,
                                                onBack,
                                            }: DragAndDropQuestionProp) {
    const [itemsInput, setItemsInput] = useState(items);
    return (
        <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
            <Text
                w={{base: 80, md: 400}}
                fontWeight={"bold"}
                fontSize={{base: "xl", md: "2xl"}}
                color={"white"}
                mb={2}
            >
                {title}
            </Text>
            <Text
                w={{base: 80, md: 400}}
                fontSize={{base: "sm", md: "md"}}
                color={"white"}
                mb={2}
            >
                {question}
            </Text>
            <Text
                w={{base: 80, md: 400}}
                fontSize={{base: "md", md: "lg"}}
                fontWeight={"semibold"}
                color={"white"}
                my={2}
            >
                {prompt}
            </Text>
            <Reorder.Group axis="y" onReorder={setItemsInput} values={items}>
                <UnorderedList listStyleType={"none"} pl={0} ml={0}>
                    {itemsInput.map((item) => (
                        <Reorder.Item key={item.key} value={item} id={item.key.toString()}>
                            <Card
                                bgGradient="linear(to-tl, purple.400, purple.200)"
                                w={{base: 300, md: 480}}
                                h={{base: 12, md: 20}}
                                px={2}
                                mt={{base: 2, md: 4}}
                            >
                                <Flex w={"100%"} h={"100%"}
                                      textAlign={"left"}
                                      alignItems={"center"}
                                      justifyContent={"flex-start"}
                                      mx={{base: 3, md: 2}}
                                >
                                    <Box pr={5}>
                                        <FiAlignJustify color={"white"}/>
                                    </Box>
                                    <Text fontSize={{base: "sm", md: "lg"}} color="white"
                                          dangerouslySetInnerHTML={{__html: item.description}}/>
                                </Flex>
                            </Card>
                        </Reorder.Item>
                    ))}
                </UnorderedList>
            </Reorder.Group>
            <Flex direction={"row"} alignItems={"center"}>
                <BackButton
                    aria-label={"back-arrow-button"}
                    onClick={() => {
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
                        setItemsOrder(itemsInput);
                        onNext();
                    }}
                />
            </Flex>
        </Flex>
    );
}
