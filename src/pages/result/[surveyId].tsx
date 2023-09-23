import {Center, Flex, Image, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

export default function ResultPage() {
    const router = useRouter();
    const surveyId: string = router.query.surveyId as string

    const modelResult = {
        text: "You are an amazing person and would do well in many jobs! We just don't " +
            "have a result for you yet! Please stay tuned!",
    }

    return (<Center
        w={"100vw"}
        h={"100vh"}
        bgGradient={"linear(to-b, purple.600, purple.400)"}
    >
        <Flex direction={"column"} alignItems={"center"} textAlign={"left"}>
            <Image w={{base: 150, md: 200}} src={"../placeholder.jpg"} borderRadius={"10"}/>
            <Text w={{base: 200, md: 400}}
                  fontWeight={"semibold"}
                  fontSize={{base: "md", md: "xl"}}
                  my={10}
                  color={"white"}>
                {modelResult.text}
            </Text>
        </Flex>
    </Center>);
}