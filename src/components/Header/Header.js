import SearchBar from "../SearchBar/SearchBar";

import "./Header.css";

const Header = ({ refSearchBox, onSubmitSearch }) => {
	return (
		<div className="Header">
			<div className="title">
				<h3>MovieDb</h3>
			</div>
			<div className="search">
				<input type="checkbox" />
				<div>
					<div className="search-icon">
						<i className="fa fa-search" aria-hidden="true"></i>
					</div>
					<div className="search-bar">
						<SearchBar
							ref={refSearchBox}
							onSubmit={onSubmitSearch}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
