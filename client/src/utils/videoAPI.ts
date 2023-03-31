export async function startVideoProcessing(videoId: string) {
  const res = await fetch(`/api/videos/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ videoId: videoId }),
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  }

  return null;
}

export async function stopVideoProcessing() {
  const res = await fetch(`/api/videos/stop`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  }

  return null;
}
