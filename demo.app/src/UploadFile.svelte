<script lang="ts">
  import upchunk from "../../lib/cloudinaryUpChunk";

  const onchangeInput = async (e) => {
    const file = e.target.files[0];
    await upchunk(file);
  };
</script>

<input type="file" id="file-upload" on:change={onchangeInput} />
