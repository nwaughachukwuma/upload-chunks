# Upload-Chunks

Code examples for chunk uploads to different storage providers.

1. Cloudinary Chunk Uploads

```ts
import cloudinaryUpChunk from './cloudinaryUpChunk'

const options = {
  url: "https://api.cloudinary.com/v1_1/demo/upload", 
  appendToFormData: {
    upload_preset: "demo_upload_preset",
    public_id: "test_id",
    cloud_name: "demo"
  },
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "X-Unique-Upload-Id": `${Date.now()}`,
    ...
  }
}

picker = document.getElementById("file_picker");
picker.addEventListener("onchange", async (e) => {
    e.preventDefault();
    
    const file = e.target.files[0];
    const chunkSize = 1024 * 1024 * 5; // 5MB
    await cloudinaryUpChunk(file, options, chunkSize)
});
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