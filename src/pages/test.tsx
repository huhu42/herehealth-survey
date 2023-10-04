import React, {useState} from "react";
import {Card, Center, Flex, Text, UnorderedList} from "@chakra-ui/react";
import {Reorder} from "framer-motion";

export default function Test() {
    function DragAndDropQuestion() {
        const [itemsInput, setItemsInput] = useState(["Assessing ideas and situations",
            "Supporting those in need with an idea or project",
            "Challenging norms and pondering possibilities for potential and opportunity",
            "Encouraging and inspiring others to take action",
            "Novelizing new ideas and solutions in response to problems",
            "Delivering projects and pushing tasks to completion"]
        );
        return (
            <Flex direction={"column"} textAlign={"center"} alignItems={"center"}>
                <Reorder.Group axis="y" onReorder={setItemsInput} values={itemsInput}>
                    {itemsInput.map((item) => (
                        <Reorder.Item key={item} value={item}>
                            {item}
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </Flex>
        );
    }

    return (
        <Center
            minW={"100vw"}
            minH={"100vh"}
            p={4}
            bgGradient={"linear(to-b, purple.900, purple.600)"}
        >
            <Flex direction={"column"} alignItems={"center"}>
                <DragAndDropQuestion/>
            </Flex>
        </Center>
    );
}