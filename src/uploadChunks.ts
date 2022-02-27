import type { UploadOptions } from "./types";

/**
 * ## chunkedUpload
 * 
 * ### Example usage:
 * uploading to cloudinary
 * ```ts
  picker = document.getElementById("file_picker");
  picker.addEventListener("onchange", async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    await chunkedUpload(file, {
      url: CLOUDINARY_UPLOAD_URL,
      appendToFormData: {
        upload_preset: "upload_preset",
        cloud_name: "cloud_name",
        tags: ["tag1", "tag2"],
        public_id: `public_id`,
      },
      headers: {},
    });
  });
 * ```
 * @param file 
 * @param options 
 * @param chunkSize 
 */
export async function chunkedUpload(
  file: File,
  options: UploadOptions,
  chunkSize: number = 1024 * 1024 * 5
) {
  function noop() {}

  function slice(file: File, start: number, end: number) {
    const slice = file.slice || noop;
    return slice.bind(file)(start, end);
  }

  async function send(chunk: Blob, start: number, end: number, size: number) {
    console.log({ start, end, size });
    const { url, appendToFormData = {}, headers } = options;
    const formData = new FormData();

    formData.append("file", chunk);
    for (const key in appendToFormData) {
      formData.append(key, appendToFormData[key]);
    }

    const xhr = new XMLHttpRequest();
    await new Promise((resolve, reject) => {
      xhr.open("POST", url, false);
      for (const header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }
      xhr.setRequestHeader("X-Unique-Upload-Id", `${Date.now()}`);
      xhr.setRequestHeader("Content-Range", `bytes ${start}-${end}/${size}`);

      xhr.onload = function () {
        console.log(this.responseText);
        resolve(this.responseText);
      };

      xhr.onerror = function () {
        reject(this.responseText);
      };

      // add upload progress event listener
      xhr.upload.addEventListener("progress", function (e) {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total);
          console.log(`${percent}% of the file has been uploaded`);
        }
      });

      xhr.send(formData);
    });
  }

  async function uploadFile(file: File) {
    const size = file.size;

    for (let start = 0; start <= size; start += chunkSize) {
      let end = start + chunkSize;
      if (end > size) {
        end = size;
      }

      const blob = slice(file, start, end);
      await send(blob, start, end - 1, size);
    }
  }

  await uploadFile(file);
}

export default chunkedUpload;
