# Upload-Chunks

Code examples for chunk uploads to different storage providers.

1. Cloudinary Chunk Uploads

```ts
import upchunk from "./lib/uploadChunks";

const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/cpnwaugha/auto/upload";

const onchangeInput = async (e) => {
  const file: File = e.target.files[0];
  await upchunk(file, {
    url: CLOUDINARY_UPLOAD_URL,
    appendToFormData: {
      upload_preset: "rtdfil2g",
      cloud_name: "cpnwaugha",
      tags: ["t1", "t2"],
      public_id: `chunk_uploads-${Date.now()}`,
    },
    headers: {},
  });
};

picker = document.getElementById("file_picker");
picker.addEventListener("onchange", (e) => {
    e.preventDefault();
    onchangeInput(e)
});
```

2. Mux Chunk Uploads

May not be used to upload to Cloudinary.
> See https://github.com/muxinc/upchunk
```ts
import muxUpchunk from './muxUpChunk'

picker = document.getElementById("file_picker");
  picker.addEventListener("onchange", async (e) => {
    e.preventDefault();
    
    const file = e.target.files[0];
    const chunkSize = 1024 * 1024 * 5; // 5MB
    const endpoint = 'your-endpoint';

    await muxUpchunk({file, endpoint, chunkSize})
});
```