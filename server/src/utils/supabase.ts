import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Supabase environment variables are not defined in .env");
  }

  return createClient(url, key);
}

export async function uploadImagesToSupabase(files: Express.Multer.File[]): Promise<string[]> {
  const supabase = getSupabase();
  const bucket = "roommatch-images";

  const uploadPromises = files.map(async (file) => {
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, { contentType: file.mimetype });

    if (error) throw new Error(`Failed to upload image: ${error.message}`);

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  });

  return Promise.all(uploadPromises);
}

export async function deleteImageFromSupabase(imageUrl: string){

  const supabase= getSupabase();
  const bucket = "roommatch-images";

  const parts = imageUrl.split(`/storage/v1/object/public/${bucket}/`);
  const fileName= parts[1];

  if(!fileName)
    return;

  const {error}= await supabase.storage.from(bucket).remove([fileName]);

  if(error)
    throw new Error(`Failed to delete image: ${error.message}`);
}