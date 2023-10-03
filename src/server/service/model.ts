import {Survey, Tenure} from "~/server/service/types";
import {openAIClient} from "~/server/service/openai";
import {inputToPrompt} from "~/server/service/prompt";

export type ModelResult = {
    description: string;
};

export type ModelInput = Survey & { tenure: Tenure };

export type Model = {
    apply(input: ModelInput): Promise<ModelResult>;
};

export function createModel(): Model {
    async function apply(input: ModelInput): Promise<ModelResult> {
        const description = await openAIClient.complete(inputToPrompt(input))
        return {description: description}
    }

    return {
        apply,
    };
}
