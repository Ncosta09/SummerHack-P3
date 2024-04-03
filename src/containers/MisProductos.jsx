import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import Contexto from "../context/Contexto";

function MisProductos() {

    const { estadoLogin, usuarioLogeado, traerProductosComprados, productosComprados, traemeProductos, productos } = useContext(Contexto);

    useEffect(() => {
        usuarioLogeado();
        traemeProductos();
        traerProductosComprados();
    }, [estadoLogin]);

    return ( <>
        <div className="all-loged-page">
            <div className="loged-page">
                <div className="left-menu">

                    <div className="name-title">
                        <h1>Hola,</h1>
                        <p>{estadoLogin.displayName}</p>
                    </div>

                    <div className="name-products"> </div>

                    <div className="logout-button">
                        <Link to={"/"}> <button>Vovler</button> </Link>
                    </div>
                </div>

                <div className="right-side">
                    <h2>Mis productos</h2>
                    {
                        productosComprados?.estado && productos.map((producto) => (
                            producto.nombre === productosComprados?.nombre ? (
                                <div className="all-space-product">
                                    <div className="product-img">
                                        <img src={producto?.img} alt="lata de coca cola" />
                                    </div>
        
                                    <div className="product-description-misProductos">
                                        <div>
                                            <p className="product-name">{producto?.nombre}</p>
                                        </div>
                                        <div>
                                            <p>${producto?.precio}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        ))
                    }
                </div>
            </div>
        </div>
    </> );
}

export default MisProductos;