import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import MovieDb from "./containers/MovieDb";
import MovieDetails from "./containers/MovieDetails";
import SearchResult from "./containers/SearchResult";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<Route path="/" exact component={MovieDb} />
					<Route path="/search" component={SearchResult} />
					<Route path="/movie/:id" component={MovieDetails} />
					<Redirect to="/" />
				</Switch>
			</Layout>
		</BrowserRouter>
	);
}

export default App;
