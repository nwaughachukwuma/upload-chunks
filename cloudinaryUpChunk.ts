interface FileChunk {
  start: number;
  end: number;
  file: Blob;
}

/**
   * ## cloudinaryUpChunk
   * This function takes a file and chunks it up into smaller chunks for uploading to Cloudinary.
   * 
   * ### Usage
   ```ts
   picker = document.getElementById("file_picker");
    picker.addEventListener("onchange", async (e) => {
      e.preventDefault();
      
      const file = e.target.files[0];
      const chunkSize = 1024 * 1024 * 5; // 5MB
      await cloudinaryUpChunk(file, chunkSize)
    });
   ```
   * @param file 
   * @param chunkSize 
   */
export async function cloudinaryUpChunk(
  file: File,
  chunkSize: number = 5000000
) {
  const fileChunks: FileChunk[] = [];
  for (let i = 0; i <= file.size; i += chunkSize) {
    const end = i + chunkSize;
    fileChunks.push({ start: i, end, file: file.slice(i, end) });
  }

  for (const chunk of fileChunks) {
    await uploadChunk(chunk, file.size);
  }
}

async function uploadChunk(chunk: FileChunk, totalSize: number) {
  const { start, end, file } = chunk;
  const formData = new FormData();

  const UPLOAD_PRESET = "your-upload-preset";
  const CLOUD_NAME = "your-cloud-name";
  const PUBLIC_ID = "your-public-id";
  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/.../.../upload";

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("cloud_name", CLOUD_NAME);
  formData.append("public_id", PUBLIC_ID);

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
    headers: {
      "X-Unique-Upload-Id": `${Date.now()}`,
      "Content-Range": "bytes " + start + "-" + end + "/" + totalSize,
    },
  });
  const json = await response.json();
  console.log(json);
}
