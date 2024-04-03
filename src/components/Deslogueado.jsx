import { useState, useContext } from "react";
import Contexto from "../context/Contexto";
import "../assets/styles/login.css";

function Deslogueado(props) {

    const { crearUsuario, usuarioLogin } = useContext(Contexto);
    const [crear, setCrear] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        usuarioLogin(email, password);
    };

    const handleCrear = () => {
        crearUsuario(email, password, nombreUsuario);
    };
    
    const handleNoTengo = () => {
        setCrear(true);
    }

    const handleTengo = () => {
        setCrear(false);
    }

    const handleTexto = (e) => {
        if (e.target.name == "email") {
            setEmail(e.target.value);
        } else if (e.target.name == "password"){
            setPassword(e.target.value);
        } else if (e.target.name == "username"){
            setNombreUsuario(e.target.value);
        }
    }

    return (<>
    <div className="all-log-content">
        <div className="log-content">

            <div className="content">

                <div className="log-title">
                    {!crear ? (
                        <>
                            <h2>LogIn</h2>

                            <div className="log-input">
                                <input type="text" onChange={handleTexto} name="email" placeholder="Email..." />
                                <input type="password" onChange={handleTexto} name="password" placeholder="Contreaseña..." />
                            </div>
                        </>
                    ) : 
                        <>
                            <h2>Crear cuenta</h2>

                            <div className="log-input">
                                <input type="text" onChange={handleTexto} name="username" placeholder="Nombre de usuario..." />
                                <input type="text" onChange={handleTexto} name="email" placeholder="Email..." />
                                <input type="password" onChange={handleTexto} name="password" placeholder="Contreaseña..." />
                            </div>
                        </>
                    }
                </div>



                {!crear ? (
                    <div className="log-button">
                        <button onClick={handleLogin}>Ingresar</button>
                        <p className="log-noCount" onClick={handleNoTengo}>No tengo cuenta</p>
                    </div>
                ) :
                    <div className="log-button">
                        <button onClick={handleCrear}>Crear cuenta</button>
                        <p className="log-noCount" onClick={handleTengo}>Ya tengo cuenta</p>
                    </div>
                }
            </div>
        </div>
    </div>
    </>);
}

export default Deslogueado;