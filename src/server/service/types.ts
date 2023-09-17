import {z} from "zod";

export type SurveyService = {
    request(input: Request): Id
    response(id: Id): Response
};

export type Id = string;

const PERCENTAGE = z.number().min(0).max(100).multipleOf(1);
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
    text: string
};