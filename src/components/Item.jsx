import { useContext } from "react";
import Contexto from "../context/Contexto";
import "../assets/styles/producto.css"

function Item(props) {
    
    const { comprarProducto } = useContext(Contexto);
    const {productos} = props;

    const handleComprar = () => {
        const nombreProducto = productos[0]?.nombre;
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

    console.log(productos)

    return ( <>

        <div className="all-space-product">
            <div className="product-img">
                <img src="https://i.postimg.cc/43cxvyLp/lataCoca.png" alt="lata de coca cola" />
            </div>

            <div className="product-description">
                <div>
                    {productos[0]?.nombre}
                </div>
                <div>
                    {productos[0]?.descripcion}
                </div>
                <div>
                    {productos[0]?.precio}
                </div>

                <div className="comprar-button">
                    <button onClick={handleComprar}>Comprar</button>
                </div>
            </div>
        </div>

    </> );
}

export default Item;