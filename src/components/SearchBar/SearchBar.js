import { useRef } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
	const history = useHistory();

	const inputSearchRef = useRef();
	const onSubmitSearch = (e) => {
		e.preventDefault();
		history.push("/search", {
			keyword: inputSearchRef.current.value
		})
		inputSearchRef.current.value = "";
	}
	return (
		<form onSubmit={onSubmitSearch}>
			<input name="query" ref={inputSearchRef}></input>
			<button>
				<i className="fa fa-search" aria-hidden="true"></i>
			</button>
		</form>
	);
}

export default SearchBar;
