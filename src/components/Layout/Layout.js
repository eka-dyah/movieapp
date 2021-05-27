import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import "./Layout.css";

const Layout = ({ children }) => (
	<div className="Layout">
		<Header />
		<div className="content">{children}</div>
		<Footer />
	</div>
);

export default Layout;
