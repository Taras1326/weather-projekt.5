const API_KEY = '0ad651487453424da3d937bfd2b9f4d9';

export const fetchNews = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=general&pageSize=6&apiKey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const data = await response.json();

  return data.articles;
};