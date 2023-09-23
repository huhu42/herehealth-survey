import {Reorder} from "framer-motion";
import React from "react";
import {Card, Center, Flex, Text, UnorderedList} from "@chakra-ui/react";

type DragAndDropQuestion = {
    question: string
    items: Array<string>
    onItemsReorder: (items: Array<string>) => void
}

export default function DragAndDropQuestion({question, items, onItemsReorder}: DragAndDropQuestion) {
    return (
        <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
            <Text w={{base: "80", md: "100"}}
                  fontSize={{base: "xl", md: "xxl"}}
                  color={"white"}
                  mb={2}>
                {question}
            </Text>
            <Reorder.Group axis="y" onReorder={onItemsReorder} values={items}>
                <UnorderedList listStyleType={"none"} pl={0} ml={0}>
                    {items.map((item) => (
                        <Reorder.Item key={item} value={item} id={item}>
                            <Card bgGradient='linear(to-tl, purple.400, purple.200)'
                                  w={{base: 200, md: 300}}
                                  h={{base: 12, md: 16}}
                                  p={4}
                                  mt={{base: 2, md: 4}}>
                                <Center w={"100%"} h={"100%"}>
                                    <Text fontSize="xl" color='black'>
                                        {item}
                                    </Text>
                                </Center>
                            </Card>
                        </Reorder.Item>))
                    }
                </UnorderedList>
            </Reorder.Group>
        </Flex>
    )
}