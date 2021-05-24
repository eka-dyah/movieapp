import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Layout.css";

const Layout = ({ refSearchBox, onSubmitSearch, children }) => (
	<div className="Layout">
		<Header refSearchBox={refSearchBox} onSubmitSearch={onSubmitSearch} />
		<div className="content">{children}</div>
		<Footer />
	</div>
);

export default Layout;
