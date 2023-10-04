import React, {useState} from "react";
import {Center, Flex} from "@chakra-ui/react";
import {Reorder} from "framer-motion";

export default function Test() {
    function DragAndDropQuestion() {
        const [itemsInput, setItemsInput] = useState([0,
            1,
            2,
            3,
            4,
            5]
        );
        return (
            <Reorder.Group axis="y" onReorder={setItemsInput} values={itemsInput}>
                {itemsInput.map((item) => (
                    <Reorder.Item key={item} value={item}>
                        {item}
                    </Reorder.Item>
                ))}
            </Reorder.Group>
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