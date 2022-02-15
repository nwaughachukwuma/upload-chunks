interface FileChunk {
  start: number;
  end: number;
  blob: Blob;
}

export interface UploadOptions {
  /** upload url to the storage service */
  url: string;
  appendToFormData?: Record<string, any>;
  /** headers to be sent with the request */
  headers?: Record<string, any>;
}

/**
   * ## uploadChunks
   * This function takes a file and chunks it up into smaller chunks for uploading to Cloudinary.
   * 
   * ### Usage
   ```ts
   picker = document.getElementById("file_picker");
    picker.addEventListener("onchange", async (e) => {
      e.preventDefault();
      
      const file = e.target.files[0];
      const options = {url: "https://api.cloudinary.com/v1_1/demo/upload", appendToFormData: {upload_preset: "demo_upload_preset"}};
      const chunkSize = 1024 * 1024 * 5; // 5MB
      await uploadChunks(file, options chunkSize)
    });
   ```
   * @param file 
   * @param options 
   * @param chunkSize 
   */
export async function uploadChunks(
  file: File,
  options: UploadOptions,
  chunkSize: number = 5000000
) {
  const fileChunks = getChunks(file, chunkSize);

  for (const chunk of fileChunks) {
    console.log(
      `chunk is := start: ${chunk.start}; end: ${chunk.end}; file: ${chunk.blob}`
    );
    await uploader(chunk, file.size, options);
  }
}

export async function uploader(
  chunk: FileChunk,
  totalSize: number,
  options: UploadOptions
) {
  const { start, end, blob } = chunk;
  const formData = new FormData();
  const { url, appendToFormData, headers } = options;

  formData.append("file", blob);
  if (appendToFormData) {
    Object.keys(appendToFormData).forEach((key) => {
      formData.append(key, appendToFormData[key]);
    });
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      "X-Unique-Upload-Id": `${Date.now()}`,
      "Content-Range": "bytes " + start + "-" + end + "/" + totalSize,
      ...headers,
    },
    mode: "no-cors",
  });

  if (response.ok) {
    const json = await response.json();
    console.log(json);
  } else {
    console.log("error", response.statusText);
  }
}

export function getChunks(file: File, chunkSize: number) {
  const fileChunks: FileChunk[] = [];
  for (let i = 0; i <= file.size; i += chunkSize) {
    const end = i + chunkSize;
    fileChunks.push({ start: i, end, blob: file.slice(i, end) });
  }

  return fileChunks;
}

export default uploadChunks;
