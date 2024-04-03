import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Contexto from "../context/Contexto";
import Item from "./Item";
import "../assets/styles/logueado.css"

function Logueado(props) {

    const { dataUsuario } = props;
    const { usuarioLogout, traemeProductos, productos, traerProductosComprados, productosComprados } = useContext(Contexto);

    // console.log("usuario: ", dataUsuario);

    useEffect(() => {
        traemeProductos();
        traerProductosComprados();
    }, []);

    // console.log("productos: ", productos);
    console.log("productos comprados: ", productosComprados);

    const Desloguear = () => {
        usuarioLogout();
    }

    return ( <>

        <div className="all-loged-page">
            <div className="loged-page">
                <div className="left-menu">

                    <div className="name-title">
                        <h1>Hola,</h1>
                        <p>{dataUsuario.displayName}</p>
                    </div>

                    <div className="name-products">
                        <h3>Mis productos</h3>
                        <Link to={"/SummerHack-P3/mis_productos"} >Productos</Link>
                    </div>

                    <div className="logout-button">
                        <button onClick={Desloguear}>Desloguear</button>
                    </div>
                </div>

                <div className="right-side">
                    <h2>Productos</h2>
                    <Item productos={ productos } />
                </div>
            </div>
        </div>
    </> );
}

export default Logueado;