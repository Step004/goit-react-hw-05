import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { getMovieById } from "../../movies-api";
import { NavLink } from "react-router-dom";
import css from "./MovieDetailsPage.module.css"

export default function MoviesDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkUrlRef = useRef(location.state ?? "/movies");

  
  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (e) {
        console.log(e);
      }
    }
    fetchMovie();
  }, [movieId]);


  const imagePath =
    movie && movie.backdrop_path
      ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
      : null;


  return (
    <div>
      <div>
        <Link to={backLinkUrlRef.current}>Go back</Link>
      </div>
      <div className={css.container}>
        {imagePath && <img src={imagePath} alt="Movie backdrop" />}
        {movie && (
          <div className={css.partInfo}>
            <h2>{movie.title}</h2>
            <h3>User score</h3>
            <p>{Math.round(movie.vote_average * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <ul>
              {movie.genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
