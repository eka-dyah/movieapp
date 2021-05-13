import Header from "../Header/Header";

import "./Layout.css";

const Layout = ({ refSearchBox, onSubmitSearch }) => (
	<div className="Layout">
		<Header refSearchBox={refSearchBox} onSubmitSearch={onSubmitSearch} />
	</div>
);

export default Layout;
