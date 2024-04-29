import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDY2NTkyNGFlOWIwY2VmMGUzZjY4NzEyYWIyZWMzMiIsInN1YiI6IjY2MmFhYmNkOWY1ZGZiMDExZTVlNGFjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aQOv35EuMhcX3hLbSZEIt-AJAUZV0dNykxHTAfhqDsw",
  },
};

export const searchByQuery = async (searchQuery) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
  const response = await axios.get(url, options);
  return response;
};

export const getMovies = async () => {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const response = await axios.get(url, options);
  return response;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return response;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
    options
  );
  return response;
};
