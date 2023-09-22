import {Reorder, useMotionValue} from "framer-motion";
import React, {useState} from "react";
import {useRaisedShadow} from "~/client/useRaisedShadow";
import {Card, Flex, Text, UnorderedList} from "@chakra-ui/react";

type DragAndDropQuestion = {
    question: string
    options: Array<string>
}

export default function DragAndDropQuestion({question, options}: DragAndDropQuestion) {
    type ReorderItemProps = {
        text: string;
    }

    function ReorderItem({text}: ReorderItemProps) {
        const y = useMotionValue(0);
        const boxShadow = useRaisedShadow(y);

        return (
            <Reorder.Item value={text} id={text} style={{boxShadow, y}}>
                <Card bgGradient='linear(to-tl, purple.400, purple.200)' w={{base: 240, md: 300}} p={4}
                      mt={{base: 2, md: 4}}>
                    <Text fontSize="xl" color='black'>
                        {text}
                    </Text>
                </Card>
            </Reorder.Item>
        );
    };

    const [items, setItems] = useState(options);

    return (
        <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
            <Text w={{base: "80", md: "100"}}
                  fontSize={{base: "xl", md: "xxl"}}
                  color={"white"}
                  mb={2}>{question}</Text>
            <Reorder.Group axis="y" onReorder={setItems} values={items}>
                <UnorderedList listStyleType={"none"} pl={0} ml={0}>
                    {items.map((item) => (
                        <ReorderItem key={item} text={item.toString()}/>
                    ))}
                </UnorderedList>
            </Reorder.Group>
        </Flex>
    )
}