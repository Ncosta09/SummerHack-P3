import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsarContexto from "../context/UsarContexto.jsx";
import Layout from "../components/Layout.jsx";
import Home from "../containers/Home.jsx"
import MisProductos from "../containers/MisProductos.jsx";

function Rutas() {
    return ( 
        <BrowserRouter>
            <UsarContexto>
                <Layout>
                    <Routes>
                        <Route path="/SummerHack-P3/" element={<Home />}></Route>
                        <Route path="/SummerHack-P3/mis_productos" element={<MisProductos />}></Route>
                    </Routes>
                </Layout>
            </UsarContexto>
        </BrowserRouter>
     );
}

export default Rutas;