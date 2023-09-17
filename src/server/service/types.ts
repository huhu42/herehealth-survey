import {z} from "zod";
import {ModelResult} from "~/server/service/model";

export type SurveyService = {
    request(input: Request): Id
    response(id: Id): Response
};

export type Id = string;

const PERCENTAGE = z.number().min(0).max(100).multipleOf(1);
const SurveySchema = z.object({
    a: PERCENTAGE,
    b: PERCENTAGE,
    c: PERCENTAGE,
    d: PERCENTAGE,
    e: PERCENTAGE,
    f: PERCENTAGE,
    g: PERCENTAGE,
    h: PERCENTAGE,
    i: PERCENTAGE,
    j: PERCENTAGE,
});
export type Survey = z.infer<typeof SurveySchema>;

export const RequestSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    survey: z.object({
        a: PERCENTAGE,
        b: PERCENTAGE,
        c: PERCENTAGE,
        d: PERCENTAGE,
        e: PERCENTAGE,
        f: PERCENTAGE,
        g: PERCENTAGE,
        h: PERCENTAGE,
        i: PERCENTAGE,
        j: PERCENTAGE,
    })
});
export type Request = z.infer<typeof RequestSchema>;

export type Response = {
    firstName: string
    lastName: string
    result: ModelResult
};