import {Survey} from "~/server/service/types";
import {openAIClient} from "~/server/service/openai";

export type ModelResult = {
    description: string;
};

type ModelInput = Survey;

export type Model = {
    apply(input: ModelInput): Promise<ModelResult>;
};

export function createModel(): Model {
    function inputToPrompt(input: ModelInput): string {
        return "Hype me up and give me some job recommendations. Keep it short and sweet.";
    }

    async function apply(input: ModelInput): Promise<ModelResult> {
        const description = await openAIClient.complete(inputToPrompt(input))
        return {description: description}
    }

    return {
        apply,
    };
}
