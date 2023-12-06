import {z} from "zod";
import {ModelResult} from "~/server/service/model";

export type SurveyService = {
    request(input: Request): Promise<Id>;
    response(id: Id): Promise<Response>;
    followUp(input: FollowUp): Promise<void>;
    didFollowUp(id: Id): Promise<boolean>;
    resultImage(label: string): Promise<string>;
};

export const IdSchema = z.string().length(8);
export type Id = z.infer<typeof IdSchema>;

const RankSchema = z.array(z.number().min(0).max(5)).length(6);
export type Rank = z.infer<typeof RankSchema>;
const PercentageSchema = z.number().min(0).max(100).multipleOf(1);
const SurveySchema = z.object({
    0: RankSchema,
    1: PercentageSchema,
    2: PercentageSchema,
    3: PercentageSchema,
    4: PercentageSchema,
    5: PercentageSchema
});
export type Survey = z.infer<typeof SurveySchema>;

export enum Tenure {
    NEW_GRAD,
    MID_CAREER
}

export const RequestSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    tenure: z.nativeEnum(Tenure),
    survey: SurveySchema,
});
export type Request = z.infer<typeof RequestSchema>;

export type Response = {
    firstName: string;
    lastName: string;
    result: ModelResult;
};

export const FollowUpSchema = z.object({
    id: IdSchema,
    email: z.string().email(),
    requestMatches: z.boolean(),
    teamCode: z.string().length(5).optional().or(z.literal(""))
});
export type FollowUp = z.infer<typeof FollowUpSchema>;
