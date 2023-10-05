import {SupabaseClient} from "@supabase/supabase-js";

export type StorageClient = {
    getImageUrlFromLabel(label: string): string;
};

export default function createStorageClient(
    supabaseClient: SupabaseClient,
): StorageClient {
    function getImageUrlFromLabel(label: string): string {
        const {data} = supabaseClient.storage
            .from("images")
            .getPublicUrl(`result/${label}.jpg`);
        return data.publicUrl;
    }

    return {
        getImageUrlFromLabel,
    };
}
