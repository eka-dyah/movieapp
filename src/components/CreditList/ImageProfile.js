import "./ImageProfile.css";

const ImageProfile = ({ type, info }) => {
	let imgPathOnObject;
	let imgUrlForPict;
	switch (type) {
		case "companies":
			imgPathOnObject = "logo";
			imgUrlForPict = "https://image.tmdb.org/t/p/w300";
			break;
		case "acting":
			imgPathOnObject = "profile";
			imgUrlForPict = "https://image.tmdb.org/t/p/w185";
			break;
		default:
			imgPathOnObject = "poster";
			imgUrlForPict = "https://image.tmdb.org/t/p/original";
	}
	imgPathOnObject = imgPathOnObject + "_path";
	const imgUrl = info[imgPathOnObject]
		? imgUrlForPict + info[imgPathOnObject]
		: null;

	return (
		imgUrl && (
			<div className="ImageProfile">
				<img className={type} src={imgUrl} alt={info.name} />
				<p>{info.name}</p>
				{type === "acting" ? <p className="character">({info.character})</p> : null}
			</div>
		)
	);
};

export default ImageProfile;
