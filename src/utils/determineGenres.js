const determineGenres = (genreSource = null, genreIds = []) => {
	return genreSource && genreIds.length !== 0
		? genreIds.map((id) => {
				const find = genreSource.find((gr) => gr.id === id);
				return find.name;
		  })
		: [];
};

export default determineGenres;
