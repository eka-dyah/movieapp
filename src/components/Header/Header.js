import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

import "./Header.css";

const Header = () => {
	return (
		<div className="Header">
			<div className="title">
				<Link to="/">
					<h3>MovieDb</h3>
				</Link>
			</div>
			<div className="search">
				<input type="checkbox" />
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
