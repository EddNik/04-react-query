import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

//типізація відповіді
interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<FetchMoviesResponse> {
  const config = {
    params: {
      query: query,
      page: page,
      include_adult: false,
      language: "en-US",
    },
    method: "GET",
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    baseURL: "https://api.themoviedb.org/3/search/movie",
  };
  const response = await axios.request<FetchMoviesResponse>(config);

  return response.data;
}
