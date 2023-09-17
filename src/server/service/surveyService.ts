import {Id, Request, Response, SurveyService} from "~/server/service/types";
import {PrismaClient} from "@prisma/client";
import {Model, ModelResult} from "~/server/service/model";
import {newId} from "~/server/utils";

export function createSurveyService(
    prisma: PrismaClient,
    model: Model
): SurveyService {

    async function request(input: Request): Promise<Id> {
        const modelResult = await model.apply(input.survey);
        return prisma.survey
            .create({
                data: {
                    id: newId(),
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    input: input.survey,
                    result: modelResult
                },
                select: {id: true},
            })
            .then((r) => r.id);
    }

    async function response(id: Id): Promise<Response> {
        let r = await prisma.survey.findUniqueOrThrow({
            where: {id: id},
            select: {
                firstName: true,
                lastName: true,
                result: true
            },
        });
        return {
            firstName: r.firstName,
            lastName: r.lastName,
            result: r.result as ModelResult
        };
    }

    return {
        request,
        response
    }
}