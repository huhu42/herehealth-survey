import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {
    FollowUpSchema,
    IdSchema,
    RequestSchema,
} from "~/server/service/types";

export const surveyRouter = createTRPCRouter({
        request: publicProcedure.input(RequestSchema)
            .mutation(({ctx, input}) => {
                return ctx.service.request(input);
            }),
        response: publicProcedure.input(IdSchema)
            .query(({ctx, input}) => {
                return ctx.service.response(input);
            }),
        followUp: publicProcedure
            .input(FollowUpSchema)
            .mutation(({ctx, input}) => {
                return ctx.service.followUp(input);
            }),
        didFollowUp: publicProcedure.input(IdSchema)
            .query(({ctx, input}) => {
                return ctx.service.didFollowUp(input);
            }),
    })
;
