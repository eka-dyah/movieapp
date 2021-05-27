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
			<div className="ImageProfile">
				<div className="image">{imgUrl && <img className={type} src={imgUrl} alt={info.name} />}</div>
				<p>{info.name}</p>
				<p className="character">{type === "acting" ? `${info.character}` : ""}</p>
				
			</div>
	);
};

export default ImageProfile;
