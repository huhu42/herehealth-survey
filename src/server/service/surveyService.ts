import {
    Tenure,
    FollowUp,
    Id,
    Request,
    Response,
    SurveyService,
} from "~/server/service/types";
import {$Enums, PrismaClient} from "@prisma/client";
import {Model, ModelResult} from "~/server/service/model";
import {newId} from "~/server/utils";
import DbTenure = $Enums.Tenure;

export function createSurveyService(
    prisma: PrismaClient,
    model: Model,
): SurveyService {

    function toDatabaseEnum(tenure: Tenure): DbTenure {
        switch (tenure) {
            case Tenure.NEW_GRAD: {
                return DbTenure.NEW_GRAD;
            }
            case Tenure.MID_CAREER: {
                return DbTenure.MID_CAREER;
            }
            default: {
                throw new Error(`unrecognized enum ${tenure}`);
            }
        }
    }

    async function request(input: Request): Promise<Id> {
        const modelResult = await model.apply({
            ...input.survey,
            tenure: input.tenure
        });
        return prisma.survey
            .create({
                data: {
                    id: newId(),
                    firstName: input.firstName,
                    lastName: input.lastName,
                    tenure: toDatabaseEnum(input.tenure),
                    input: input.survey,
                    result: modelResult,
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
                result: true,
            },
        });

        return {
            firstName: r.firstName,
            lastName: r.lastName,
            result: r.result as ModelResult,
        };
    }

    async function followUp(input: FollowUp): Promise<void> {
        const followUp = await prisma.survey.findUniqueOrThrow({
            where: {id: input.id},
            select: {id: true, email: true},
        });
        if (!!followUp.email) {
            throw new Error("cannot update user follow-up once submitted");
        }
        await prisma.survey.update({
            where: {
                id: input.id,
            },
            data: {
                email: input.email,
                requestMatches: input.requestMatches,
            },
        });
    }

    async function didFollowUp(id: Id): Promise<boolean> {
        const followUp = await prisma.survey.findUniqueOrThrow({
            where: {id: id},
            select: {id: true, email: true},
        });
        return !!followUp.email;
    }

    return {
        request,
        response,
        followUp,
        didFollowUp,
    };
}
