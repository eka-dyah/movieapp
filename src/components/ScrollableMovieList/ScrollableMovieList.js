import "./ScrollableMovieList.css";
import ScrollableMovieChild from "./ScrollableMovieChild";

const ScrollableMovieList = ({ category, movies = [] }) => {
	if (movies.length === 0) return <></>;

	return (
		<div className="ScrollableMovieList width-1000">
			<p className="text-subtitle text-capitalize">{category}</p>
			<div className="list">
				{movies.map((movie) => {
					return <ScrollableMovieChild key={movie.id} movie={movie} />;
				})}
			</div>
		</div>
	);
};

export default ScrollableMovieList;
