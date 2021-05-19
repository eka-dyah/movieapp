import "./FullMovieList.css";
import MovieList from "./MovieList";

const FullMovieList = ({
	movies,
	genreList,
	moviesPage,
	moviesTotalPage,
	showMoreButton,
	loading,
	error = null,
}) => (
	<div className="FullMovieList">
		<MovieList
			movies={movies}
			moviesPage={moviesPage}
			moviesTotalPage={moviesTotalPage}
			genreList={genreList}
			loading={loading}
			error={error}
			showMoreButton={showMoreButton}
		/>
	</div>
);

export default FullMovieList;
