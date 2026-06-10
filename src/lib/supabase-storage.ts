import { getSupabaseBrowserClient, getSupabaseServerClient } from "./supabase";

export interface UploadOptions {
  bucket: string;
  path: string;
  file: File;
  onProgress?: (progress: number) => void;
}

export interface StorageFile {
  name: string;
  id?: string | null;
  updated_at?: string | null;
  metadata?: Record<string, unknown>;
  size?: number;
}

/**
 * Upload a file to Supabase Storage (browser client)
 */
export async function uploadFile(options: UploadOptions): Promise<string | null> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    console.error("Supabase is not configured");
    return null;
  }

  try {
    const fileExt = options.file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${options.path}/${fileName}`;

    const { error } = await supabase.storage
      .from(options.bucket)
      .upload(filePath, options.file);

    if (error) {
      console.error("Storage upload error:", error);
      return null;
    }

    return filePath;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
}

/**
 * Get public URL for a file in Supabase Storage
 */
export function getStoragePublicUrl(bucket: string, filePath: string): string | null {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return null;
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return data?.publicUrl || null;
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteStorageFile(
  bucket: string,
  filePath: string,
): Promise<boolean> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return false;
  }

  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error("Storage delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  }
}

/**
 * List files in a Supabase Storage bucket (browser client)
 */
export async function listStorageFiles(
  bucket: string,
  path: string = "",
): Promise<StorageFile[]> {
  const supabase = getSupabaseBrowserClient();

  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase.storage.from(bucket).list(path);

    if (error) {
      console.error("Storage list error:", error);
      return [];
    }

    return (data || []) as StorageFile[];
  } catch (error) {
    console.error("List error:", error);
    return [];
  }
}

/**
 * Server-side file upload with service role (more secure)
 */
export async function uploadFileServerSide(
  bucket: string,
  filePath: string,
  fileContent: Buffer | Uint8Array,
): Promise<string | null> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    console.error("Supabase is not configured");
    return null;
  }

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileContent);

    if (error) {
      console.error("Server storage upload error:", error);
      return null;
    }

    return data.path;
  } catch (error) {
    console.error("Server upload error:", error);
    return null;
  }
}

/**
 * Server-side delete with service role
 */
export async function deleteStorageFileServerSide(
  bucket: string,
  filePath: string,
): Promise<boolean> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return false;
  }

  try {
    const { error } = await supabase.storage.from(bucket).remove([filePath]);

    if (error) {
      console.error("Server storage delete error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Server delete error:", error);
    return false;
  }
}
