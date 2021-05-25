import "./CreditList.css";
import ImageProfile from "./ImageProfile";

const CreditList = ({ type, info = [] }) => {
    let title = "";
    if (type === 'acting') title = 'Actors/Actrees';
    else if (type === 'companies') title = "Production Companies";

    return (
        <div className="CreditList width-1000">
            <p className="text-subtitle text-center text-capitalize">{title}</p>
            <div className="list">
                {info.map((data, index) => {
                    return <ImageProfile key={data.id} info={data} type={type} />
                })}
            </div>
        </div>
    );
}

export default CreditList;