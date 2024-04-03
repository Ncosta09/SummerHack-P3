import { useContext, useEffect } from "react";
import Contexto from "../context/Contexto";
import { initializeApp } from "firebase/app";
import Logueado from "../components/Logueado";
import Deslogueado from "../components/Deslogueado";

const firebaseConfig = {
    apiKey: "AIzaSyA2DtKVwmqb7O0WD-yhMDHwv9iZFOhhNls",
    authDomain: "fir-app-522e1.firebaseapp.com",
    databaseURL: "https://fir-app-522e1-default-rtdb.firebaseio.com",
    projectId: "fir-app-522e1",
    storageBucket: "fir-app-522e1.appspot.com",
    messagingSenderId: "829871240920",
    appId: "1:829871240920:web:037f93e84b809a3eea09ad",
    measurementId: "G-FLNPNQQ4QY"
};

const app = initializeApp(firebaseConfig);

function Home() {

    const { estadoLogin, usuarioLogeado } = useContext(Contexto);

    useEffect(() => {
        usuarioLogeado();
    }, []);

    return (<>
        {!estadoLogin ? <Deslogueado /> : <Logueado dataUsuario={estadoLogin}/>}
    </>);
}

export default Home;