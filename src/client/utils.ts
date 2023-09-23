import {UseTRPCQueryResult} from "@trpc/react-query/shared";
import {TRPCClientErrorLike} from "@trpc/client";

export function isLoaded(
    result: UseTRPCQueryResult<any, TRPCClientErrorLike<any>>,
): boolean {
    return !result.isLoading;
}