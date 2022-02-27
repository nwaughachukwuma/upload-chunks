export interface UploadOptions {
  /** upload url to the storage service */
  url: string;
  appendToFormData?: Record<string, any>;
  /** headers to be sent with the request */
  headers?: Record<string, any>;
}

export default async function directUpload(file: File, options: UploadOptions) {
  const { url, appendToFormData = {}, headers } = options;
  const formData = new FormData();

  formData.append("file", file);
  for (const key in appendToFormData) {
    formData.append(key, appendToFormData[key]);
  }

  const response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      "X-Unique-Upload-Id": `${Date.now()}`,
      "Content-Type": "application/json; charset=UTF-8",
      ...headers,
    },
    mode: "no-cors",
  })
    .then((r) => r.text())
    .catch((err) => err);

  console.log({ response });
}
