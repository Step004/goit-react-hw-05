import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { searchByQuery } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [params, setParams] = useSearchParams();
  const queryParams = params.get("query") ?? "";
  
  console.log(queryParams);
  const handleSubmit = (query) => {
    setQuery(query);
    setParams(queryParams);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchMovies() {
      try {
        setFilms([]);
        setLoading(true);
        const data = await searchByQuery(query);
        setFilms(data.data.results);
        setParams({ query: query });
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [query, setParams]);

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {loading && <b>Loading movies</b>}
      {error && <b>Sorry. Films not found!!!</b>}
      <MovieList items={films} />
    </>
  );
}
