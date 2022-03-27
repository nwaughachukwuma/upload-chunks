const baseURL = "https://us-central1-project-id.cloudfunctions.net/api";

export default async function fetchParams(payload: Record<string, any> = {}) {
  const res = await fetch(`${baseURL}/services/fetch-signed-upload-props`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(payload),
    headers: {
      "content-type": "application/json",
    },
  }).catch((e) => {
    console.warn("error fetchUploadData: ", e);

    throw e;
  });

  const json = await res.json();
  if (!json) {
    console.log("Failed to fetch upload props!");
    return null;
  }

  return json;
}
