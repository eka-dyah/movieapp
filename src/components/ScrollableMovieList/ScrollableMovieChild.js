import "./ScrollableMovieChild.css";
import starIcon from "../../assets/star.svg";
import { Link } from "react-router-dom";
import { decimalPlace } from "../../utils/decimalPlace";

const ScrollableMovieChild = ({ movie = null }) => {
	if (!movie) return <></>;

	const posterUrl = "https://image.tmdb.org/t/p/w200" + movie.poster_path;
	const release = new Date(movie.release_date);
	const releaseStr = release.getFullYear();
	return (
		<div className="ScrollableMovieChild">
			<Link to={`/movie/${movie.id}`}>
				<div className="image">
					<img src={posterUrl} alt={movie.title} />
					<p className="rating">
						{decimalPlace(movie.vote_average)}
						<img src={starIcon} alt="rating" />
					</p>
				</div>
				<div className="text">
					<p className="title">{movie.title}</p>
					<p>( {releaseStr} )</p>
				</div>
			</Link>
		</div>
	);
};

export default ScrollableMovieChild;
