import "./ScrollableMovieChild.css";
import starIcon from "../../assets/star.svg";

const ScrollableMovieChild = ({ movie = null }) => {
    if (!movie) return <></>;

    const posterUrl = "https://image.tmdb.org/t/p/w200" + movie.poster_path;
    const release = new Date(movie.release_date);
    const releaseStr = release.getFullYear();
    return (
        <div className="ScrollableMovieChild">
            <div className="image">
                <img src={posterUrl} alt={movie.title} />
                <p className="rating">
                    {movie.vote_average}
                    <img src={starIcon} alt="rating" />
                </p>
            </div>
            <div className="text">
                <p className="title">{movie.title}</p>
                <p>( {releaseStr} )</p>
            </div>
        </div>
    )
}

export default ScrollableMovieChild;