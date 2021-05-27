import imageStar from "../../assets/star.svg";
import imdbLogo from "../../assets/imdb.svg";

import "./MovieBanner.css";
import { decimalPlace } from "../../utils/decimalPlace";

const MovieBanner = ({ movieDetails }) => {
	const posterUrl =
		"https://image.tmdb.org/t/p/w500" + movieDetails.poster_path;
	const backdropUrl =
		"https://image.tmdb.org/t/p/w1280" + movieDetails.backdrop_path;
	const imdbLink = "https://www.imdb.com/title/" + movieDetails.imdb_id;
	const genres = movieDetails.genres.map((genre) => genre.name);
	const releaseDate = new Date(movieDetails.release_date);

	return (
		<div className="MovieBanner">
			<div className="backdrop">
				<img src={backdropUrl} alt="backdrop" />
			</div>
			<div className="content">
				<div className="info width-1000">
					<div className="poster">
						<img src={posterUrl} alt={movieDetails.title} />
					</div>
					<div className="text">
						<div className="title">
							<a
								href={movieDetails.homepage}
								target="_blank"
								rel="noreferrer"
							>
								<h1>{movieDetails.title}</h1>
							</a>
							<div className="imdb">
								<a
									href={imdbLink}
									target="_blank"
									rel="noreferrer"
								>
									<img src={imdbLogo} alt="imdb" />
								</a>
							</div>
						</div>
						<p>Genre: {genres.join(", ")}</p>
						<p>
							Release:{" "}
							{releaseDate.toLocaleString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</p>
						<p className="overview">
							Overview: <br /> {movieDetails.overview}
						</p>
						<div className="rating">
							{decimalPlace(movieDetails.vote_average)}{" "}
							<img src={imageStar} alt="rating" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MovieBanner;
