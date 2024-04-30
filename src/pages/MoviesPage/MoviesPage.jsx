import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { searchByQuery } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const queryParams = params.get("query") ?? "";
  
  const handleSubmit = (params) => {
    setParams({ query: params });
  };

  useEffect(() => {
    if (queryParams === "") {
      return;
    }

    async function fetchMovies() {
      try {
        setFilms([]);
        setLoading(true);
        const data = await searchByQuery(queryParams);
        setFilms(data.data.results);
        
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [queryParams, setParams]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <b>Loading movies</b>}
      {error && <b>Sorry. Films not found!!!</b>}
      <MovieList items={films} />
    </>
  );
}
