import { Link } from "react-router-dom";
import starIcon from "../../assets/star.svg";
import Image from "../../shared/Image/Image";
import { decimalPlace } from "../../utils/decimalPlace";
import determineGenres from "../../utils/determineGenres";

import "./Card.css";

const Card = ({ genreSource, movie }) => {
	const genre = determineGenres(genreSource, movie.genre_ids);

	const posterUrl = "https://image.tmdb.org/t/p/w200" + movie.poster_path;
	const backdropUrl = "https://image.tmdb.org/t/p/w300" + movie.backdrop_path;

	return (
		<Link to={`/movie/${movie.id}`}>
			<div className="Card">
				{movie.backdrop_path && (
					<img className="backdrop" alt="Rating" src={backdropUrl} />
				)}
				<div className="inside">
					<div className="content">
						<div className="image">
							<Image
								className="image-poster"
								src={posterUrl}
								alt={movie.title}
								isTherePath={movie.poster_path}
							/>
						</div>
						<div className="info">
							<p className="title">{movie.title}</p>
							<p>Genre: {genre.join(", ")}</p>
							<p>Release: {movie.release_date}</p>
							<div className="rating">
								<div>{decimalPlace(movie.vote_average)}</div>
								<img
									className="image-star-icon"
									alt="Rating"
									src={starIcon}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="click-effect"></div>
			</div>
		</Link>
	);
};

export default Card;
