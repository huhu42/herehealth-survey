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
                    <UnorderedList listStyleType={"none"} pl={0} ml={0}>
                        {itemsInput.map((item) => (
                            <Reorder.Item key={item} value={item} id={item}>
                                <Card
                                    bgGradient="linear(to-tl, purple.400, purple.200)"
                                    w={{base: 300, md: 400}}
                                    h={{base: 12, md: 20}}
                                    px={2}
                                    mt={{base: 2, md: 4}}
                                >
                                    <Center w={"100%"} h={"100%"}>
                                        <Text fontSize={{base: "sm", md: "lg"}} color="white">
                                            {item}
                                        </Text>
                                    </Center>
                                </Card>
                            </Reorder.Item>
                        ))}
                    </UnorderedList>
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