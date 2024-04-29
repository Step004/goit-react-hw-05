import { useState, useEffect } from "react";
import { getMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMovies();
        setFilms(data.data.results);
      } catch (e) {
        setError(true);
      } finally {
       setLoading(false); 
      }
    }
    fetchMovies();
  }, []);
  return (
    <>
      {loading && <b>Loading movies</b>}
      {error && <b>Sorry. Films not found!!!</b>}
      <MovieList items={films} />
    </>
  );
}
