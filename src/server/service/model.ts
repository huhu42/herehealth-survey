import {Survey, Tenure} from "~/server/service/types";
import {openAIClient} from "~/server/service/openai";
import {inputToDescriptionPrompt, inputToLabelPrompt} from "~/server/service/prompt";

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
    async function apply(input: ModelInput): Promise<ModelResult> {
        const label = await openAIClient.complete(inputToLabelPrompt(input))
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
