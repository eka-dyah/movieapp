import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CreditList from "../components/CreditList/CreditList";
import MovieBanner from "../components/MovieBanner/MovieBanner";
import ScrollableMovieList from "../components/ScrollableMovieList/ScrollableMovieList";
import Spinner from "../components/Spinner/Spinner";
import { getMoviePropById, getMoviesByCategory } from "../utils/fetchData";

const MovieDetails = ({ movieId }) => {
	const { id } = useParams();
	let mId = movieId || id;

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
		setMovies({ loading: true, error: null, movies: null });
		getMoviePropById(mId, null, null, (error, data) => {
			if (error) setMovies({ ...movies, loading: false, error: error });
			else
				setMovies({
					loading: false,
					error: null,
					movies: { ...data },
				});
		});
	};

	const getPerson = () => {
		setPerson({ loading: true, error: null, person: [] });
		getMoviePropById(mId, "credits", 1, (error, data) => {
			if (error) setPerson({ ...person, loading: false, error: error });
			else {
				let acting = data.cast.filter(
					(credit) => credit.known_for_department === "Acting"
				);
				acting = acting.length > 10 ? acting.slice(0, 10) : acting;
				setPerson({ loading: false, error: null, person: [...acting] });
			}
		});
	};

	const getSimilar = () => {
		setSimilar({ error: null, movies: [], loading: true });
		getMoviePropById(mId, "similar", 1, (error, data) => {
			if (error)
				setSimilar({
					loading: false,
					error: error,
					movies: [],
				});
			else
				setSimilar({
					loading: false,
					error: null,
					movies: [...data.results],
				});
		});
	};

	const getRecommendations = () => {
		setRecommendations({ ...person, loading: true });
		getMoviePropById(mId, "recommendations", 1, (error, data) => {
			if (error)
				setRecommendations({
					loading: false,
					error: error,
					movies: [],
				});
			else
				setRecommendations({
					loading: false,
					error: null,
					movies: [...data.results],
				});
		});
	};

	const getPopular = () => {
		setPopular({ ...person, loading: true });
		getMoviesByCategory("popular", 1, (error, data) => {
			if (error)
				setPopular({
					loading: false,
					error: error,
					movies: [],
				});
			else
				setPopular({
					loading: false,
					error: null,
					movies: [...data.results],
				});
		});
	};

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
		window.scrollTo(0, 0);
		getMoviesRef.current();
		getPersonRef.current();
		getSimilarRef.current();
		getRecommendationsRef.current();
	}, [mId]);

	useEffect(() => {
		if (movies.error) {
			getPopularRef.current();
		}
	}, [movies]);

	let content;
	if (movies.loading) {
		content = <Spinner />;
	} else if (movies.error) {
		content = (
			<p className="text-center text-error">
				{movies.error || "An error has occured."}
			</p>
		);
	} else if (movies.movies && Object.keys(movies.movies).length !== 0) {
		content = (
			<>
				<MovieBanner movieDetails={movies.movies} />
				{movies.movies.production_companies.length !== 0 && (
					<CreditList
						type="companies"
						info={movies.movies.production_companies}
					/>
				)}
			</>
		);
	}

	let personCredit;
	if (person.person.length !== 0) {
		personCredit = <CreditList type="acting" info={person.person} />;
	} else personCredit = null;

	return (
		<>
			{content}
			{personCredit}
			<ScrollableMovieList category="similar" movies={similar.movies} />
			<ScrollableMovieList
				category="recommendations"
				movies={recommendations.movies}
			/>
			<ScrollableMovieList category="popular" movies={popular.movies} />
		</>
	);
};

export default MovieDetails;
