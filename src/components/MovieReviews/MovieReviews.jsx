import { useEffect, useState } from "react";
import { getMovieReviews } from "../../movies-api";
import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData.data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <b>Loading reviews...</b>}
      {error && <b>Error loading reviews!</b>}
      <h2>Movie Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
