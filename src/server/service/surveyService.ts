import {Id, Request, Response, SurveyService} from "~/server/service/types";
import {PrismaClient} from "@prisma/client";
import {Model} from "~/server/service/model";

export function createSurveyService(
    prisma: PrismaClient,
    model: Model
): SurveyService {

    function request(input: Request): Id {
        throw new Error("unimplemented");
    }

    function response(id: Id): Response {
        throw new Error("unimplemented");
    }

    return {
        request,
        response
    }
}