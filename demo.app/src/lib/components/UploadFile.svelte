<script lang="ts">
  import upchunk from "../../../../lib/uploadChunks";

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
</script>

<input type="file" id="file-upload" on:change={onchangeInput} />
