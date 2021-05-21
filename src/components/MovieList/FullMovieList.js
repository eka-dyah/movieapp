import ButtonGroup from "../../shared/ButtonGroup/ButtonGroup";
import Spinner from "../Spinner/Spinner";
import "./FullMovieList.css";
import MovieList from "./MovieList";

const FullMovieList = ({
	movies,
	genreList,
	moviesPage,
	moviesTotalPage,
	showMoreButton,
	buttonClickHandler,
	buttons,
	loadingAll,
	loading,
	error = null,
}) => (
	<div className="FullMovieList width-1000">
		{movies ? <ButtonGroup buttons={buttons} onClickHandler={buttonClickHandler} />: null}
		{loadingAll ? <Spinner /> : <MovieList
			movies={movies}
			moviesPage={moviesPage}
			moviesTotalPage={moviesTotalPage}
			genreList={genreList}
			loading={loading}
			error={error}
			showMoreButton={showMoreButton}
		/>}
	</div>
);

export default FullMovieList;
