import {Reorder} from "framer-motion";
import React, {useState} from "react";
import {Card, Center, Flex, Text, UnorderedList} from "@chakra-ui/react";
import {NextButton} from "~/client/components/NextButton";

export type DragAndDropItem = {
    key: string
    description: string
}

type DragAndDropQuestionProp = {
    question: string;
    items: Array<DragAndDropItem>;
    setItemsOrder: (items: Array<DragAndDropItem>) => void;
    onNavigation: () => void;
};

export default function DragAndDropQuestion({
                                                question,
                                                items,
                                                setItemsOrder,
                                                onNavigation,
                                            }: DragAndDropQuestionProp) {
    const [itemsInput, setItemsInput] = useState(items);
    return (
        <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
            <Text
                w={{base: "80", md: "100"}}
                fontSize={{base: "xl", md: "xxl"}}
                color={"white"}
                mb={2}
            >
                {question}
            </Text>
            <Reorder.Group axis="y" onReorder={setItemsInput} values={items}>
                <UnorderedList listStyleType={"none"} pl={0} ml={0}>
                    {itemsInput.map((item) => (
                        <Reorder.Item key={item.key} value={item} id={item.key}>
                            <Card
                                bgGradient="linear(to-tl, purple.400, purple.200)"
                                w={{base: 200, md: 300}}
                                h={{base: 12, md: 16}}
                                p={4}
                                mt={{base: 2, md: 4}}
                            >
                                <Center w={"100%"} h={"100%"}>
                                    <Text fontSize="xl" color="black">
                                        {item.description}
                                    </Text>
                                </Center>
                            </Card>
                        </Reorder.Item>
                    ))}
                </UnorderedList>
            </Reorder.Group>
            <NextButton
                aria-label={"forward-arrow-button"}
                onClick={() => {
                    setItemsOrder(itemsInput);
                    onNavigation();
                }}
            />
        </Flex>
    );
}
