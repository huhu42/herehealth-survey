import {Survey, //Tenure

} from "~/server/service/types";
import {openAIClient} from "~/server/service/openai";
import {inputToDescriptionPrompt, //WorkingEnergizerList

} from "~/server/service/prompt";

export type ModelResult = {
    description: string;
    // nullable for backwards compatability
    label?: string;
};

export type ModelInput = Survey; //& { tenure: Tenure };

export type Model = {
    apply(input: ModelInput): Promise<ModelResult>;
};

export function createModel(): Model {
    function labelByPersonality(labelOne: string,
                                labelTwo: string,
                                labelThree: string,
                                workingEnergizer: string,
                                personality: string): string | undefined {
        if (containedIn(personality, ["HHHHH", "HHHHL", "LHHHH", "LHHHL", "HHHLH", "HLHHH", "LHHLH", "LHLHH", "LLHHH", "HLHHL"])) {
            return labelOne;
        }
        if (containedIn(personality, ["HHHLL", "HHLLL", "LHHLL", "LHLLL", "HLHLH", "HLLHH", "HHLHL", "HHLLH", "HHLLH", "LLHLL", "LLHLH"])) {
            return labelTwo;
        }
        if (containedIn(personality, ["HHLLH", "HLLLL", "LHLLH", "LLLLL", "LLLLH", "LLLHL", "HLLLH", "HLLHL", "LHLHL", "LLHHL", "LLLHH"])) {
            return labelThree;
        }
        console.warn("unexpected " + workingEnergizer + " + " + personality);
        return undefined;
    }

    // function inputToLabel(input: ModelInput): string | undefined {
    //     //const workingEnergizer = topWorkingEnergizer(input);
    //     const personality = encodedPersonalityComponents(input);
    //     if ("Assessing" === workingEnergizer) {
    //         return labelByPersonality("Mindful Accessor",
    //             "Reserved Analyst",
    //             "Social Evaluator",
    //             workingEnergizer,
    //             personality);
    //     }
    //     if ("Supporting" === workingEnergizer) {
    //         return labelByPersonality("Emotional Supporter",
    //             "Focused Helper",
    //             "Casual Aide",
    //             workingEnergizer,
    //             personality);
    //     }
    //     if ("Challenging" === workingEnergizer) {
    //         return labelByPersonality("Strategic Challenger",
    //             "Solo Critic",
    //             "Bold Instigator",
    //             workingEnergizer,
    //             personality);
    //     }
    //     if ("Encouraging" === workingEnergizer) {
    //         return labelByPersonality("Inspirational Guide",
    //             "Attentive Coach",
    //             "Group Energizer",
    //             workingEnergizer,
    //             personality);
    //     }
    //     if ("Novelizing" === workingEnergizer) {
    //         return labelByPersonality("Deep Innovator",
    //             "Focused Creator",
    //             "Spontaneous Dreamer",
    //             workingEnergizer,
    //             personality);
    //     }
    //     if ("Delivering" === workingEnergizer) {
    //         return labelByPersonality("Meticulous Completer",
    //             "Solo Finisher",
    //             "Team Closer",
    //             workingEnergizer,
    //             personality);
    //     }
    //     console.warn("unexpected " + workingEnergizer + " + " + personality);
    //     return undefined;
    // }

    // function topWorkingEnergizer(input: ModelInput): string {
    //     return WorkingEnergizerList.at(input["0"].at(0)!)!;
    // }

    // function encodedPersonalityComponents(input: ModelInput): string {
    //     return toEncoding(input["1"]) + toEncoding(input["2"]) + toEncoding(input["3"]) +
    //         toEncoding(input["4"]) + toEncoding(input["5"]);
    // }

    function toEncoding(percentage: number) {
        if (percentage > 50) {
            return "H";
        }
        return "L";
    }

    function containedIn(target: string, list: Array<string>): boolean {
        for (const i of list) {
            if (target === i) {
                return true;
            }
        }
        return false;
    }

    async function apply(input: ModelInput): Promise<ModelResult> {    
        //const label = inputToLabel(input);
        const description = await openAIClient.complete(inputToDescriptionPrompt(input))
        return {
            description: description
        }
    }

    return {
        apply,
    };
}

