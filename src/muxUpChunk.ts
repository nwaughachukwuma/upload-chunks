import * as UpChunk from "@mux/upchunk";

/**
 * ## muxUpchunk
 *  promisifies @mux/upchunk UpChunk API. See the package on npmjs here
 * https://www.npmjs.com/package/@mux/upchunk
 * 
 * ### Usage
 ```ts
 picker = document.getElementById("file_picker");
  picker.addEventListener("onchange", async (e) => {
    e.preventDefault();
    
    const file = e.target.files[0];
    const chunkSize = 1024 * 1024 * 5; // 5MB
    const endpoint = 'your-endpoint';

    await muxUpchunk({file, endpoint, chunkSize})
  });
 * 
 * @param options
 * @returns
 */
export async function muxUpchunk(options: UpChunk.UpChunkOptions) {
  const upload = UpChunk.createUpload({
    endpoint: options.endpoint,
    file: options.file,
    chunkSize: options.chunkSize, // Uploads the file in ~5mb chunks default to 5120
  });

  return new Promise((resolve, reject) => {
    upload.on("error", (error) => {
      console.error("💥 🙀", error.detail);
      reject(error);
    });

    upload.on("progress", (progress) => {
      console.log(`${progress.detail}% of the file has been uploaded`);
    });

    upload.on("success", (result) => {
      console.log("Wrap it up, we're done here. 👋");
      resolve(result);
    });
  });
}

export default muxUpchunk;
