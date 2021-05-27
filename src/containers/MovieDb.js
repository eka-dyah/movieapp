import { useEffect, useRef, useState } from "react";
import FullMovieList from "../components/MovieList/FullMovieList";
import Carousel from "../shared/Carousel/Carousel";
import { getMoviesByCategory, getGenreList } from "../utils/fetchData";

const btns = [
	{
		name: "Upcoming",
		id: "upcoming",
		active: true,
	},
	{
		name: "Now Playing",
		id: "now_playing",
		active: false,
	},
	{
		name: "Popular",
		id: "popular",
		active: false,
	},
	{
		name: "Top Rated",
		id: "top_rated",
		active: false,
	},
];

const MovieDb = () => {
	const [movies, setMovies] = useState(null);
	const [moviesCarousel, setMoviesCarousel] = useState(null);
	const [genres, setGenres] = useState(null);
	const [moviesPage, setMoviesPage] = useState(1);
	const [moviesPageTotal, setMoviesPageTotal] = useState(1);
	const [loading, setLoading] = useState(false);
	const [loadingAll, setLoadingAll] = useState(false);
	const [error, setError] = useState(null);
	const [buttons, setButtons] = useState(btns);

	const showMoreHandler = (pages) => {
		const category = buttons.filter((button) => button.active);
		
		setLoading(true);
		getMoviesByCategory(category[0].id, pages, (error, data) => {
			setLoading(false);
			if (error) {
				setError("An error has occured");
			} else {
				setMovies([...movies, ...data.results]);
				setMoviesPage(data.page);
				setMoviesPageTotal(data.total_pages);
				setError(null);
			}
		});
	};

	const getGenres = () => {
		getGenreList((error, data) => {
			if (error) setGenres(null);
			else setGenres(data.genres);
		});
	};

	const getMoviesCarouselData = () => {
		getMoviesByCategory("popular", 1, (error, data) => {
			if (error) setMoviesCarousel(null);
			else
				setMoviesCarousel(
					data.results.length >= 5
						? data.results.slice(0, 5)
						: data.results.slice(0, data.results.length)
				);
		});
	};

	const getMovies = (id) => {
		const category = buttons.filter((button) => button.id === id);

		setLoadingAll(true);
		getMoviesByCategory(category[0].id, 1, (error, data) => {
			setLoadingAll(false);
			if (error) {
				setError("An error has occured");
				setMovies(null);
			} else {
				setMovies(data.results);
				setMoviesPage(data.page);
				setMoviesPageTotal(data.total_pages);
				setError(null);
			}
		});
	};

	const getMoviesRef = useRef();
	const getGenresRef = useRef();
	const getMoviesCarouselRef = useRef();

	getMoviesRef.current = getMovies;
	getGenresRef.current = getGenres;
	getMoviesCarouselRef.current = getMoviesCarouselData;

	const buttonClickHandler = (id) => {
		const newButtons = buttons.map((btn) => {
			const button = { ...btn };
			button.active = id === button.id;
			return button;
		});
		setButtons(newButtons);
	};

	useEffect(() => {
		const cateogryActive = buttons.filter((btn) => btn.active);
		getMoviesRef.current(cateogryActive[0].id);
	}, [buttons]);

	useEffect(() => {
		window.scrollTo(0, 0);
		getGenresRef.current();
		getMoviesCarouselRef.current();
	}, []);

	let carouselPart;
	if (moviesCarousel) {
		carouselPart = <Carousel movies={moviesCarousel} />;
	} else carouselPart = null;

	return (
		<>
				{carouselPart}
				<FullMovieList
					movies={movies}
					moviesPage={moviesPage}
					moviesTotalPage={moviesPageTotal}
					genreList={genres}
					showMoreButton={showMoreHandler}
					buttonClickHandler={buttonClickHandler}
					buttons={buttons}
					loadingAll={loadingAll}
					loading={loading}
					error={error}
				/>
		</>
	);
};

export default MovieDb;
