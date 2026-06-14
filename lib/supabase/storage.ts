import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Scan-image storage helpers.
 * Bucket: `scan-images`, private, with a per-user `{userId}/` prefix enforced
 * by RLS storage policies. Images are retained indefinitely for eval and are
 * NOT user-deletable in the MVP.
 */
export const SCAN_IMAGES_BUCKET = "scan-images";

/** Builds the canonical storage object path for a user's scan image. */
export function scanImagePath(userId: string, fileName: string): string {
  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${userId}/${Date.now()}-${safeName}`;
}

export async function uploadScanImage(
  supabase: SupabaseClient<Database>,
  userId: string,
  file: File | Blob,
  fileName = "scan.jpg",
): Promise<{ path: string }> {
  const path = scanImagePath(userId, fileName);
  const contentType =
    file instanceof File && file.type ? file.type : "image/jpeg";

  const { error } = await supabase.storage
    .from(SCAN_IMAGES_BUCKET)
    .upload(path, file, { contentType, upsert: false });

  if (error) throw error;
  return { path };
}

/**
 * Returns a time-limited signed URL for a stored scan image (bucket is private).
 */
export async function getScanImageUrl(
  supabase: SupabaseClient<Database>,
  path: string,
  expiresInSeconds = 60 * 60,
): Promise<string | null> {
  const { data, error } = await supabase.storage
    .from(SCAN_IMAGES_BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error) return null;
  return data?.signedUrl ?? null;
}
