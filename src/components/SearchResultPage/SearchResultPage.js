import "./SearchResultPage.css";

const SearchResultPage = ({ keyword, children }) => {
	return (
		<div className="SearchResultPage width-1000">
			<h3 className="title">Search result : {keyword}</h3>
			{children}
		</div>
	);
};

export default SearchResultPage;
