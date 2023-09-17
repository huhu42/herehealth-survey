import {z} from "zod";

import {createTRPCRouter, publicProcedure} from "~/server/api/trpc";
import {RequestSchema} from "~/server/service/types";

export const surveyRouter = createTRPCRouter({
    request: publicProcedure
        .input(RequestSchema)
        .mutation(({ctx, input}) => {
            return ctx.service.request(input);
        }),
    response: publicProcedure
        .input(z.string())
        .query(({ctx, input}) => {
            return ctx.service.response(input);
        })
});
