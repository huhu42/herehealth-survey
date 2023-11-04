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

    function labelByPersonality(labelOne: string,
                                labelTwo: string,
                                labelThree: string,
                                workingEnergizer: string,
                                personality: string): string {
        if (containedIn(personality, ["HHHHH", "HHHHL", "LHHHH", "LHHHL"])) {
            return labelOne;
        }
        if (containedIn(personality, ["HHHLL", "HHLLL", "LHHLL", "LHLLL"])) {
            return labelTwo;
        }
        if (containedIn(personality, ["HHLLH", "HLLLL", "LHLLH", "LLLLL"])) {
            return labelThree;
        }
        throw new Error("unexpected " + workingEnergizer + " + " + personality);
    }

    function inputToLabel(input: ModelInput): string {
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
        throw new Error("unexpected " + workingEnergizer + " + " + personality);
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

