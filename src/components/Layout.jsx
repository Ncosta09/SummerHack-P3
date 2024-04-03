import Header from "./Header.jsx"
import Footer from "./Footer.jsx"

function Layout(props) {
    const {children} = props;

    return (<>
        <Header></Header>
            {children}
        <Footer></Footer>
    </>);
}

export default Layout;