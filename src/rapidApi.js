// API
const apiUrl = import.meta.env.VITE_APP_API_URL;
const apiKey = import.meta.env.VITE_APP_API_KEY;
const apiHost = import.meta.env.VITE_APP_API_HOST;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": apiHost,
  },
};

export async function fetchData() {
    const response = await fetch(`${apiUrl}/trending?geo=IN`, options);
    const json = await response.json();
    const results = json?.data;
    return results;
}

export async function searchVideo(query) {
    const response = await fetch(`${apiUrl}/search?query=${query}`, options);
    const results = await response.json();
    return results;
}