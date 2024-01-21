export const useFetch = async (
  url: string,
  options = {},
  errorMessage?: string,
) => {
  const response = await fetch(url, options);
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message || errorMessage);
  }

  return { body };
};
