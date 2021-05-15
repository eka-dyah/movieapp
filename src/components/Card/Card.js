import starIcon from "../../assets/star.svg";

import "./Card.css";

const Card = ({ genreSource, movie }) => {
	const genre = movie.genre_ids.map((id) => {
		const find = genreSource.find((gr) => gr.id === id);
		return find.name;
	});

	const posterUrl = "https://image.tmdb.org/t/p/w200" + movie.poster_path;
	const backdropUrl = "https://image.tmdb.org/t/p/w300" + movie.backdrop_path;

	return (
		<div className="Card">
			<img className="backdrop" alt="Rating" src={backdropUrl} />
			<div className="inside">
				<div className="content">
					<div className="image">
						<img
							className="image-poster"
							alt={movie.title}
							src={posterUrl}
						/>
					</div>
					<div className="info">
						<p className="title">{movie.title}</p>
						<p>Genre: {genre.join(", ")}</p>
						<p>Release: {movie.release_date}</p>
						<div className="rating">
							<div>{movie.vote_average}</div>
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
	);
};

export default Card;
