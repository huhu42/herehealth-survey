import {Survey, Tenure} from "~/server/service/types";
import {openAIClient} from "~/server/service/openai";
import {inputToDescriptionPrompt, WorkingEnergizerList} from "~/server/service/prompt";

export type ModelResult = {
    description: string;
    // nullable for backwards compatability
    label?: string;
};

export type ModelInput = Survey & { tenure: Tenure };

export type Model = {
    apply(input: ModelInput): Promise<ModelResult>;
};

export function createModel(): Model {

    /**
     * HHHHH (1)
     *
     * HHHHL (1)
     * HHHLH (1*)
     * HHLHH (3)
     * HLHHH (1*)
     * LHHHH (1)
     *
     * LHHHL (1)
     * LHHLH (1*)
     * LHLHH (1*)
     * LLHHH (1*)
     *
     * HLHHL (1*)
     * HLHLH (2*)
     * HLLHH (2*)
     * HHLHL (2*)
     * HHLLH (2*)
     * HHHLL (2)
     * ------
     * LLLLL (3)
     *
     * LLLLH (3*)
     * LLLHL (3*)
     * LLHLL (2*)
     * LHLLL (2)
     * HLLLL (3)
     *
     * HLLLH (3*)
     * HLLHL (3*)
     * HLHLL (2*)
     * HHLLL (2)
     *
     * LHLLH (3)
     * LHLHL (3*)
     * LHHLL (2)
     * LLHLH (3*)
     * LLHHL (3*)
     * LLLHH (3*)
     */
    function labelByPersonality(labelOne: string,
                                labelTwo: string,
                                labelThree: string,
                                workingEnergizer: string,
                                personality: string): string | undefined {
        if (containedIn(personality, ["HHHHH", "HHHHL", "LHHHH", "LHHHL"])) {
            return labelOne;
        }
        if (containedIn(personality, ["HHHLL", "HHLLL", "LHHLL", "LHLLL"])) {
            return labelTwo;
        }
        if (containedIn(personality, ["HHLLH", "HLLLL", "LHLLH", "LLLLL"])) {
            return labelThree;
        }
        console.warn("unexpected " + workingEnergizer + " + " + personality);
        return undefined;
    }

    function inputToLabel(input: ModelInput): string | undefined {
        const workingEnergizer = topWorkingEnergizer(input);
        const personality = encodedPersonalityComponents(input);
        if ("Assessing" === workingEnergizer) {
            return labelByPersonality("Mindful Accessor",
                "Reserved Analyst",
                "Social Evaluator",
                workingEnergizer,
                personality);
        }
        if ("Supporting" === workingEnergizer) {
            return labelByPersonality("Emotional Supporter",
                "Focused Helper",
                "Casual Aide",
                workingEnergizer,
                personality);
        }
        if ("Challenging" === workingEnergizer) {
            return labelByPersonality("Strategic Challenger",
                "Solo Critic",
                "Bold Instigator",
                workingEnergizer,
                personality);
        }
        if ("Encouraging" === workingEnergizer) {
            return labelByPersonality("Inspirational Guide",
                "Attentive Coach",
                "Group Energizer",
                workingEnergizer,
                personality);
        }
        if ("Novelizing" === workingEnergizer) {
            return labelByPersonality("Deep Innovator",
                "Focused Creator",
                "Spontaneous Dreamer",
                workingEnergizer,
                personality);
        }
        if ("Delivering" === workingEnergizer) {
            return labelByPersonality("Meticulous Completer",
                "Solo Finisher",
                "Team Closer",
                workingEnergizer,
                personality);
        }
        console.warn("unexpected " + workingEnergizer + " + " + personality);
        return undefined;
    }

    function topWorkingEnergizer(input: ModelInput): string {
        return WorkingEnergizerList.at(input["0"].at(0)!)!;
    }

    function encodedPersonalityComponents(input: ModelInput): string {
        return toEncoding(input["1"]) + toEncoding(input["2"]) + toEncoding(input["3"]) +
            toEncoding(input["4"]) + toEncoding(input["5"]);
    }

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
        const label = inputToLabel(input);
        const description = await openAIClient.complete(inputToDescriptionPrompt(input))
        return {
            label: label,
            description: description
        }
    }

    return {
        apply,
    };
}

