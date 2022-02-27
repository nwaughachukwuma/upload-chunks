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
  chunkSize: number = 1024 * 1024 * 5 //20000000
) {
  const XUniqueUploadId = `${Date.now()}`;

  function slice(file: File, start: number, end: number) {
    const slice = file.slice || noop;
    return slice.bind(file)(start, end);
  }

  function noop() {}

  function send(piece: Blob, start: number, end: number, size: number) {
    console.log("start ", start);
    console.log("end", end);

    const formdata = new FormData();
    console.log(XUniqueUploadId);

    const { url, appendToFormData = {} } = options;

    formdata.append("file", piece);
    for (const key in appendToFormData) {
      formdata.append(key, appendToFormData[key]);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("X-Unique-Upload-Id", XUniqueUploadId);
    xhr.setRequestHeader(
      "Content-Range",
      "bytes " + start + "-" + end + "/" + size
    );

    xhr.onload = function () {
      // do something to response
      console.log(this.responseText);
    };

    xhr.send(formdata);
  }

  function processFile(file: File) {
    const size = file.size;
    const sliceSize = chunkSize;
    let start = 0;

    setTimeout(loop, 3);

    function loop() {
      let end = start + sliceSize;

      if (end > size) {
        end = size;
      }
      const s = slice(file, start, end);
      send(s, start, end - 1, size);
      if (end < size) {
        start += sliceSize;
        setTimeout(loop, 3);
      }
    }
  }

  processFile(file);
}
