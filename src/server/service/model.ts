import { Survey } from "~/server/service/types";

export type ModelResult = {
  description: string;
};

type ModelInput = Survey;

export type Model = {
  apply(input: ModelInput): Promise<ModelResult>;
};

export function createModel(): Model {
  function apply(input: ModelInput): Promise<ModelResult> {
    return Promise.resolve({
      description:
        "You are an amazing person and would do well in many jobs! We just don't " +
        "have a result for you yet! Please stay tuned!",
    });
  }

  return {
    apply,
  };
}
