import SearchResultPage from "../components/SearchResultPage/SearchResultPage";
import { useEffect, useRef, useState } from "react";
import { getGenreList, getSearchResult } from "../utils/fetchData";
import MovieList from "../components/MovieList/MovieList";

const SearchResult = ({ location }) => {
	const keyword = location.state ? location.state.keyword : "";

	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [genres, setGenres] = useState(null);
	const [moviesPage, setMoviesPage] = useState(1);
	const [moviesPageTotal, setMoviesPageTotal] = useState(10);

	const getGenres = () => {
		getGenreList((error, data) => {
			if (error) setGenres(null);
			else setGenres(data.genres);
		});
	};

	const showMoreHandler = (pages) => {
		setLoading(true);
		getSearchResult(keyword, pages, (error, data) => {
			setLoading(false);
			if (error) setError(error);
			else {
				setMovies([...movies, ...data.results]);
				setMoviesPage(data.page);
				setMoviesPageTotal(data.total_pages);
				setError(null);
			}
		});
	};

	const getMoviesResult = () => {
		// reset states
		setMovies([]);
		setMoviesPage(1);
		setMoviesPageTotal(1);
		setError(null);

		if (keyword === "") {
			setError("Please enter a keyword :)");
		} else {
			setLoading(true);
			getSearchResult(keyword, 1, (error, data) => {
				setLoading(false);
				if (error) setError(error);
				else if (data.results.length === 0) {
					setError("Not Found.");
				} else {
					setMovies([...data.results]);
					setMoviesPage(data.page);
					setMoviesPageTotal(data.total_pages);
					setError(null);
				}
			});
		}
	};

	const getGenresRef = useRef();
	const getMoviesResultRef = useRef();

	getGenresRef.current = getGenres;
	getMoviesResultRef.current = getMoviesResult;

	useEffect(() => {
		getMoviesResultRef.current();
	}, [keyword]);

	useEffect(() => {
		window.scrollTo(0, 0)
		getGenresRef.current();
	}, []);

	return (
		<SearchResultPage keyword={keyword}>
			<MovieList
				movies={movies}
				moviesPage={moviesPage}
				moviesTotalPage={moviesPageTotal}
				genreList={genres}
				loading={loading}
				error={error}
				showMoreButton={showMoreHandler}
			/>
		</SearchResultPage>
	);
};

export default SearchResult;
