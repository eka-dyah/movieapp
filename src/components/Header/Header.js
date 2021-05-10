import { useRef } from "react";
import SearchBar from "../SearchBar/SearchBar";

import "./Header.css";

const Header = () => {
	const inputCheckboxRef = useRef();

	const clickCheckboxHandler = () => {};

	return (
		<div className="Header">
			<div className="title">
				<h3>MovieDb</h3>
			</div>
			<div className="search">
				<input
					type="checkbox"
					ref={inputCheckboxRef}
					onClick={clickCheckboxHandler}
				/>
				<div>
					<div className="search-icon">
						<i className="fa fa-search" aria-hidden="true"></i>
					</div>
					<div className="search-bar">
						<SearchBar />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
