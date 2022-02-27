interface UploadOptions {
  /** upload url to the storage service */
  url: string;
  appendToFormData?: Record<string, any>;
  /** headers to be sent with the request */
  headers?: Record<string, any>;
}

export default async function chunkedUpload(
  file: File,
  options: UploadOptions,
  chunkSize: number = 1024 * 1024 * 5
) {
  const XUniqueUploadId = `${Date.now()}`;
  console.log(XUniqueUploadId);

  function noop() {}

  function slice(file: File, start: number, end: number) {
    const slice = file.slice || noop;
    return slice.bind(file)(start, end);
  }

  async function send(chunk: Blob, start: number, end: number, size: number) {
    console.log({ start, end, size });

    const { url, appendToFormData = {}, headers } = options;
    const formdata = new FormData();

    formdata.append("file", chunk);
    for (const key in appendToFormData) {
      formdata.append(key, appendToFormData[key]);
    }

    const xhr = new XMLHttpRequest();
    await new Promise((resolve, reject) => {
      xhr.open("POST", url, false);
      for (const header in headers) {
        xhr.setRequestHeader(header, headers[header]);
      }
      xhr.setRequestHeader(
        "Content-Range",
        "bytes " + start + "-" + end + "/" + size
      );

      xhr.onload = function () {
        console.log(this.responseText);
        resolve(this.responseText);
      };

      xhr.onerror = function () {
        reject(this.responseText);
      };

      xhr.send(formdata);
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
