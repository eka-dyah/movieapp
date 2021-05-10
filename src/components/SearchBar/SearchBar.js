import "./SearchBar.css";

const SearchBar = ({ ref, onSubmit }) => (
	<form onSubmit={onSubmit}>
		<input name="query" ref={ref}></input>
		<button>
			<i className="fa fa-search" aria-hidden="true"></i>
		</button>
	</form>
);

export default SearchBar;
