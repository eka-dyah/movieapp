import Card from "../Card/Card";
import "./MovieList.css";

const MovieList = ({
	movies,
	moviesPage,
	moviesTotalPage,
	genreList,
	loading,
	error,
	showMoreButton,
}) => {
	let movieList;
	let buttonShowMore;

	if (movies && genreList) {
		movieList = movies.map((movie) => (
			<div key={movie.id} className="list">
				<Card movie={movie} genreSource={genreList} />
			</div>
		));
	} else movieList = null;

	if (loading) {
		buttonShowMore = <p>Loading</p>;
	} else if (error) {
		buttonShowMore = <p>Something went wrong</p>;
	} else if (moviesPage < moviesTotalPage) {
		buttonShowMore = (
			<button
				onClick={() => showMoreButton(moviesPage + 1)}
			>
				Show more movies
			</button>
		);
	} else {
		buttonShowMore = null;
	}

	return (
		<div className="MovieList">
			<div className="content">{movieList}</div>
			<div className="btn-or-info">{buttonShowMore}</div>
		</div>
	);
};

export default MovieList;
