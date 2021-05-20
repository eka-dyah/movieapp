import "./ButtonGroup.css";

const ButtonGroup = ({ buttons = [], onClickHandler }) => (
	<div className="ButtonGroup">
		{buttons.map((button) => (
			<button
                key={button.id}
				className={[
					"button",
					button.active ? "active" : "inactive",
				].join(" ")}
                onClick={() => onClickHandler(button.id)}
			>
				{button.name}
			</button>
		))}
	</div>
);

export default ButtonGroup;
