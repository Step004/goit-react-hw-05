import { useEffect, useState } from "react";
import { getMovieCast } from "../../movies-api";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const castData = await getMovieCast(movieId);
        setCast(castData.data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  return (
    <div>
      {loading && <b>Loading cast</b>}
      {error && <b>Error loading cast!</b>}
      <h2>Movie Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            {actor.name}
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
