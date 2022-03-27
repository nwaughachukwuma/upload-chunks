<script lang="ts">
  import upchunk from "../../../../lib/uploadChunks";
  import fetchParams from "../../../../lib/fetchParams";

  const CLOUDINARY_UPLOAD_URL =
    "https://api.cloudinary.com/v1_1/cloud_name/auto/upload";

  const onchangeInput = async (e) => {
    const file: File | undefined = e.target.files[0];
    if (!file) return;

    const payload = {
      folder: "remote-folder-name",
      transformations: "c_fill",
    };

    const response = await fetchParams(payload);

    await upchunk(file, {
      url: CLOUDINARY_UPLOAD_URL,
      appendToFormData: response.upload_params,
      headers: {},
    });
  };

  const fetchUploadParams = async () => {
    const payload = {
      folder: "remote-folder-name",
      transformations: "c_fill",
    };

    const params = await fetchParams(payload);
    console.log({ params });
  };
</script>

<input type="file" id="file-upload" on:change={onchangeInput} />

<div>
  <button on:click={fetchUploadParams}> Fetch Upload Params </button>
</div>
