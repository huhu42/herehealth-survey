import {UseTRPCQueryResult} from "@trpc/react-query/shared";
import {TRPCClientErrorLike} from "@trpc/client";

type CheckProps = {
    result: UseTRPCQueryResult<any, TRPCClientErrorLike<any>>;
    fieldName: string;
    params?: Record<string, any>;
};

export class QueryError extends Error {
    private constructor(
        fieldName: string,
        params: Record<string, any> | undefined,
        cause: string | undefined,
    ) {
        super(
            `missing ${fieldName}` +
            (params !== undefined ? ` (params: ${JSON.stringify(params)}` : "") +
            (cause !== undefined ? ` with cause: ${cause}` : ""),
        );
        Object.setPrototypeOf(this, QueryError.prototype);
    }

    private static isError(
        result: UseTRPCQueryResult<any, TRPCClientErrorLike<any>>,
    ) {
        return !!result.error;
    }

    private static isNull(
        result: UseTRPCQueryResult<any, TRPCClientErrorLike<any>>,
    ) {
        return !result.isLoading && !result.data;
    }

    static check({result, fieldName, params}: CheckProps): void {
        if (QueryError.isError(result) || QueryError.isNull(result)) {
            // TODO client-side logging
            throw new QueryError(fieldName, params, result.error?.message);
        }
    }

    static checkNullable({result, fieldName, params}: CheckProps): void {
        if (QueryError.isError(result)) {
            // TODO client-side logging
            throw new QueryError(fieldName, params, result.error?.message);
        }
    }
}
