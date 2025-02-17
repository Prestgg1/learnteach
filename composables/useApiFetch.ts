export function useApiFetch(url: string, options = {}) {
  return useFetch(url, {
    baseURL: "http://127.0.0.1:8000/api/",
    ...options,
    onRequestError({ error }) {
      console.error("Sorğu xətası:", error);
    },
    onResponseError({ response }) {
      console.error("API Xətası:", response);
    },
  });
}
