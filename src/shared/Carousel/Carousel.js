import { useState } from "react";
import "./Carousel.css";

const Carousel = ({ movies }) => {
	const [current, setCurrent] = useState(0);
	const [transition, setTr] = useState(0);
	const [slides] = useState(null)

	const child = movies.map((movie, index) => {
		const backdropUrl =
			"https://image.tmdb.org/t/p/w1280" + movie.backdrop_path;
		return (
			<div
				key={movie.id}
				className="slide"
				style={{transform: `translateX(${transition}%)`}}
			>
				<img src={backdropUrl} alt={movies.title} />
			</div>
		);
	});

	const nextHandler = () => {
		console.log(current, movies.length);
		const newTr = Math.abs(transition) === ((movies.length -1) * 100) ? 0 : transition - 100
		setTr(newTr);
		if (current === movies.length - 1) {
			setCurrent(0);
		} else {
			setCurrent(current + 1);
		}
	};

	const prevHander = () => {
		console.log(current + 1);
		const newTr = transition === 0 ? (movies.length -1) * -100 : transition + 100
		setTr(newTr);
		if (current === 0) {
			setCurrent(movies.length - 1);
		} else {
			setCurrent(current - 1);
		}
	};

	return (
		<div className="Carousel">
			<button className="prev-button" onClick={prevHander}>
				P
			</button>
			<button className="next-button" onClick={nextHandler}>
				N
			</button>
			<div className="slider">{child}</div>
		</div>
	);
};

export default Carousel;
