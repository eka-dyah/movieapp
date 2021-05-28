import cameraIcon from "../../assets/playing-card.svg";

const Image = ({ src, alt = "", isTherePath = false, className }) => (
    isTherePath ?
        <img src={src} alt={alt} className={className} /> :
        <img src={cameraIcon} alt={alt} className={className} />     
);

export default Image;