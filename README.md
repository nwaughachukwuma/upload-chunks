# Upload-Chunks

Code examples for chunk uploads to different storage providers.

1. Cloudinary Chunk Uploads

```ts
import cloudinaryUpChunk from './cloudinaryUpChunk'

picker = document.getElementById("file_picker");
picker.addEventListener("onchange", async (e) => {
    e.preventDefault();
    
    const file = e.target.files[0];
    const chunkSize = 1024 * 1024 * 5; // 5MB
    await cloudinaryUpChunk(file, chunkSize)
});

// Note: You'll need the following parameters from your Cloudinary account:
// const UPLOAD_PRESET = "your-upload-preset";
// const CLOUD_NAME = "your-cloud-name";
// const PUBLIC_ID = "your-public-id";
// const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/.../.../upload";
```

2. Mux Chunk Uploads

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