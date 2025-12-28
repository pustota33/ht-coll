import { supabase } from "./supabase";

export async function uploadAudioFile(file: File): Promise<string> {
  if (!file.type.startsWith("audio/")) {
    throw new Error("File must be an audio file");
  }

  if (file.size > 50 * 1024 * 1024) {
    throw new Error("File size must be less than 50MB");
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error: uploadError, data } = await supabase.storage
    .from("audio-previews")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data: publicUrl } = supabase.storage
    .from("audio-previews")
    .getPublicUrl(data.path);

  return publicUrl.publicUrl;
}

export async function deleteAudioFile(fileUrl: string): Promise<void> {
  try {
    const url = new URL(fileUrl);
    const pathParts = url.pathname.split("/");
    const fileName = pathParts[pathParts.length - 1];

    const { error } = await supabase.storage
      .from("audio-previews")
      .remove([fileName]);

    if (error) {
      console.error("Delete error:", error);
      throw new Error(`Delete failed: ${error.message}`);
    }
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}
