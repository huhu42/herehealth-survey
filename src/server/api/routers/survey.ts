import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {FollowUpSchema, IdSchema, RequestSchema} from "~/server/service/types";

export const surveyRouter = createTRPCRouter({
    request: publicProcedure
        .input(RequestSchema)
        .mutation(({ctx, input}) => {
            return ctx.service.request(input);
        }),
    response: publicProcedure
        .input(IdSchema)
        .query(({ctx, input}) => {
            return ctx.service.response(input);
        }),
    submitFollowUp: publicProcedure
        .input(FollowUpSchema)
        .query(({ctx, input}) => {
            return ctx.service.submitFollowUp(input);
        })
});