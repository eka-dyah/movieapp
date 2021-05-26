export const getMoviesByCategory = (category, page = 1, callback) => {
	fetch(
		`${process.env.REACT_APP_MOVIES_URL}/movies/${category}/${page}`
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				throw new Error();
			}
			callback(null, data);
		})
		.catch(() => {
			callback("An error has occured", null);
		});
};

export const getGenreList = (callback) => {
	fetch(
		`${process.env.REACT_APP_MOVIES_URL}/genre`
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				throw new Error();
			}
			callback(null, data);
		})
		.catch(() => callback("Cannot obtain genre list.", null));
};

export const getMoviePropById = (id, option, page = 1, callback) => {
	let pages = page && page !== 0 ? "&page=" + page : "";
	let addPathToUrl = option ? "/" + option : "";
	
	fetch(
		`${process.env.REACT_APP_MOVIES_URL}/movie/${id}${addPathToUrl}/${pages}`
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				throw new Error();
			}
			callback(null, data);
		})
		.catch(() => callback("Cannot get the information of the movie", null));
};

export const getSearchResult = (keyword, page = 1, callback) => {
	fetch(
		`${process.env.REACT_APP_MOVIES_URL}/search/query=${keyword}/${page}`
	)
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				throw new Error();
			}
			callback(null, data);
		})
		.catch(() => callback("An error has occured.", null));
}
