import { useEffect, useRef, useState } from "react";
import "./Carousel.css";

const Carousel = ({ movies }) => {
	const [current, setCurrent] = useState(0);
	const [translate, setTranslate] = useState(-100);
	const [transition, setTransition] = useState(0.45);
	const [slides, setSlides] = useState([
		movies[movies.length - 1],
		movies[0],
		movies[1],
	]);

	const autoPlayRef = useRef();
	const transitionRef = useRef();

	const transitionCondition = () => {
		let newSlides = [];
		if (current === movies.length - 1) {
			newSlides = [
				movies[movies.length - 2],
				movies[movies.length - 1],
				movies[0],
			];
		} else if (current === 0) {
			newSlides = [movies[movies.length - 1], movies[0], movies[1]];
		} else {
			newSlides = movies.slice(current - 1, current + 2);
		}
		setSlides(newSlides);
		setTranslate(-100);
		setTransition(0);
	};

	const nextHandler = () => {
		setTranslate(translate - 100);
		if (current === movies.length - 1) {
			setCurrent(0);
		} else {
			setCurrent(current + 1);
		}
	};

	const prevHander = () => {
		setTranslate(0);
		if (current === 0) {
			setCurrent(movies.length - 1);
		} else {
			setCurrent(current - 1);
		}
	};

	useEffect(() => {
		autoPlayRef.current = nextHandler;
		transitionRef.current = transitionCondition;
	});

	useEffect(() => {
		const autoPlay = () => autoPlayRef.current();
		const transitioned = () => transitionRef.current();

		const interval = setInterval(autoPlay, 7000);
		const transitionEnd = window.addEventListener(
			"transitionend",
			transitioned
		);
		return () => {
			clearInterval(interval);
			window.removeEventListener("transitionend", transitionEnd);
		};
	}, []);

	useEffect(() => {
		if (transition === 0) setTransition(0.45);
	}, [transition]);

	const child = slides.map((movie, index) => {
		const backdropUrl =
			"https://image.tmdb.org/t/p/w1280" + movie.backdrop_path;
		return (
			<div
				key={movie.id}
				className="slide"
				style={{
					transform: `translateX(${translate}%)`,
					transition: `transform ease-out ${transition}s`,
				}}
			>
				<img src={backdropUrl} alt={movies.title} />
				<div className="text-container">
					<div className="text">
						<h2>{movie.title}</h2>
						<p>{movie.overview}</p>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="Carousel">
			<button className="prev-button" onClick={prevHander}>
				<i className="fa fa-arrow-circle-left" aria-hidden="true"></i>
			</button>
			<button className="next-button" onClick={nextHandler}>
				<i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
			</button>
			<div
				className="slider"
				style={{
					transform: `translateX(${translate})`,
					transition: transition,
				}}
			>
				{child}
			</div>
		</div>
	);
};

export default Carousel;
