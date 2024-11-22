const postData = async <T>(
  url: string,
  body: Record<string, any>,
): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Failed to POST data. Status: ${response.status}`);
  }

  return response.json();
};

export default postData;
