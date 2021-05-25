import { useEffect, useRef, useState } from "react";
import CreditList from "../components/CreditList/CreditList";
import Layout from "../components/Layout/Layout";
import MovieBanner from "../components/MovieBanner/MovieBanner";
import ScrollableMovieList from "../components/ScrollableMovieList/ScrollableMovieList";
import Spinner from "../components/Spinner/Spinner";
import { getMoviePropById, getMoviesByCategory } from "../utils/fetchData";

const MovieDetails = ({ movieId }) => {
	const [movies, setMovies] = useState({
		movies: null,
		error: null,
		loading: false,
	});
	const [person, setPerson] = useState({
		person: [],
		error: null,
		loading: false,
	});
	const [similar, setSimilar] = useState({
		movies: [],
		error: null,
		loading: false,
	});
	const [recommendations, setRecommendations] = useState({
		movies: [],
		error: null,
		loading: false,
	});
	const [popular, setPopular] = useState({
		movies: [],
		error: null,
		loading: false,
	});

	const getMovies = () => {
		setMovies({ ...movies, loading: true });
		getMoviePropById(movieId, null, null, (error, data) => {
			if (error) setMovies({ ...movies, loading: false, error: error });
			else setMovies({
				loading: false,
				error: null,
				movies: { ...data },
			});
		})
	}

	const getPerson = () => {
		setPerson({ ...person, loading: true });
		getMoviePropById(movieId, "credits", 1, (error, data) => {
			if (error) setPerson({ ...person, loading: false, error: error });
			else {
				let acting = data.cast.filter(
					(credit) => credit.known_for_department === "Acting"
				);
				acting = acting.length > 10 ? acting.slice(0, 10) : acting;
				setPerson({ loading: false, error: null, person: [...acting] });
			}
		})
	}

	const getSimilar = () => {
		setSimilar({ ...person, loading: true });
		getMoviePropById(movieId, 'similar', 1, (error, data) => {
			if (error) setSimilar({
				loading: false,
				error: error,
				movies: [],
			});
			else setSimilar({
				loading: false,
				error: null,
				movies: [...data.results],
			});
		})
	}

	const getRecommendations = () => {
		setRecommendations({ ...person, loading: true });
		getMoviePropById(movieId, 'recommendations', 1, (error, data) => {
			if (error) setRecommendations({
				loading: false,
				error: error,
				movies: [],
			});
			else setRecommendations({
				loading: false,
				error: null,
				movies: [...data.results],
			});
		})
	}

	const getPopular = () => {
		setPopular({ ...person, loading: true });
		getMoviesByCategory("popular", 1, (error, data) => {
			if (error) setPopular({
				loading: false,
				error: error,
				movies: [],
			});
			else setPopular({
				loading: false,
				error: null,
				movies: [...data.results],
			});
		})
	}

	const getMoviesRef = useRef();
	const getPersonRef = useRef();
	const getSimilarRef = useRef();
	const getRecommendationsRef = useRef();
	const getPopularRef = useRef();

	getMoviesRef.current = getMovies;
	getPersonRef.current = getPerson;
	getSimilarRef.current = getSimilar;
	getRecommendationsRef.current = getRecommendations;
	getPopularRef.current = getPopular;

	useEffect(() => {
		getMoviesRef.current();
		getPersonRef.current();
		getSimilarRef.current();
		getRecommendationsRef.current();
	}, []);

	useEffect(() => {
		if (movies.error) {
			getPopularRef.current();
		}
	}, [movies])

	let content;
	if (movies.loading) {
		content = <Spinner />;
	} else if (movies.error) {
		content = <p className="text-center text-error">{movies.error || "An error has occured."}</p>;
	} else if (movies.movies && Object.keys(movies.movies).length !== 0) {
		content = (
			<>
				<MovieBanner movieDetails={movies.movies} />
				<CreditList
					type="companies"
					info={movies.movies.production_companies}
				/>
			</>
		);
	}

	let personCredit;
	if (person.person.length !== 0) {
		personCredit = <CreditList type="acting" info={person.person} />;
	} else personCredit = null;
	
	return (
		<Layout>
			{content}
			{personCredit}
			<ScrollableMovieList category="similar" movies={similar.movies} />
			<ScrollableMovieList
				category="recommendations"
				movies={recommendations.movies}
			/>
			<ScrollableMovieList
				category="popular"
				movies={popular.movies}
			/>
		</Layout>
	);
};

export default MovieDetails;
