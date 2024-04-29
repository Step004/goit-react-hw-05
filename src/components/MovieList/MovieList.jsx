import { Link, useLocation } from "react-router-dom";

export default function MovieList({ items }) {
const location = useLocation()
  return (
    <ul>
      {items.map((image) => (
        <li key={image.id}>
          <Link to={`/movies/${image.id}`} state={location}>
            {image.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
