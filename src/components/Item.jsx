import { useContext } from "react";
import Contexto from "../context/Contexto";
import "../assets/styles/producto.css"

function Item(props) {
    
    const { comprarProducto } = useContext(Contexto);
    const {productos} = props;

    const handleComprar = (nombreProducto) => {
        comprarProducto(nombreProducto);
        window.location.href = "https://mpago.la/1dostkD";
        // Swal.fire({
        //     title: "Compra realizada con exito",
        //     text: "espere para continuar",
        //     icon: "success",
        //     timer: 3000,
        //     timerProgressBar: true,
        //     showConfirmButton: false
        // })
        // .then(() => {
        //     comprarProducto(nombreProducto);
        // })
    }

    return ( <>

        {
            productos.map((producto) => (
                
                <div className="all-space-product">
                    <div className="product-img">
                        <img src={producto?.img} alt="" />
                    </div>
        
                    <div className="product-description">
                        <div>
                            <p className="product-name">{producto?.nombre}</p>
                        </div>
                        <div>
                            <p>{producto?.descripcion}.</p>
                        </div>
                        <div>
                            <p>${producto?.precio}</p>
                        </div>
        
                        <div className="comprar-button">
                            {/* <button onClick={handleComprar}>Comprar</button> */}
                            <button onClick={() => handleComprar(producto.nombre)}>Comprar</button>
                        </div>
                    </div>
                </div>
            ))
        }

    </> );
}

export default Item;