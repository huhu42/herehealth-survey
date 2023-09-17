import {Id, Request, Response, SurveyService} from "~/server/service/types";
import {PrismaClient} from "@prisma/client";
import {Model} from "~/server/service/model";
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
                    request: input.survey,
                    response: modelResult
                },
                select: {id: true},
            })
            .then((r) => r.id);
    }

    function response(id: Id): Promise<Response> {
        throw new Error("unimplemented");
    }

    return {
        request,
        response
    }
}