import Contexto from "./Contexto";
import Reducer from "./Reducer";
import { useReducer } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, push, onValue, update } from "firebase/database";

function UsarContexto(props) {

    const {children} = props;
    const auth = getAuth();
    const db = getDatabase();
    const refUsuarios = ref(db, 'Usuarios/');
    const refProductos = ref(db, 'Productos/');

    const estadoInicial = { 
        usuario: {
            productosComprados: [],
        },
        productos: [],
        estadoLogin: false
    }

    const [state, dispatch] = useReducer(Reducer, estadoInicial);

    const crearUsuario = (email, password, nombreUsuario) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
    
                updateProfile(user, {
                    displayName: nombreUsuario,

                }).then(() => {

                    dispatch({ 
                        type: 'CREAR_USUARIO', 
                        payload: { 
                            uid: user.uid, 
                            email: user.email,
                            displayName: nombreUsuario
                        }
                    });

                    guardarUsuario({
                        uid: user.uid, 
                        email: user.email,
                        displayName: nombreUsuario
                    });

                }).catch((error) => {
                    console.error("Error al actualizar el perfil:", error);
                });
            })
            .catch((error) => {
                console.error("Error al crear usuario:", error);
            });
    };    

    const guardarUsuario = (usuarioCreado) => {
        console.log("Guarde el usuario: ", usuarioCreado);
        push(refUsuarios, usuarioCreado);
    }

    const usuarioLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            estado(user);
            dispatch({ type: 'LOGIN_USUARIO', payload: user });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const usuarioLogout = () => {
        signOut(auth).then(() => {
            estado(false);
        }).catch((error) => {});
    }

    const usuarioLogeado = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                dispatch({ type: 'USUARIO_LOGUEADO', payload: user });
            } else {
                dispatch({ type: 'USUARIO_NO_LOGUEADO' });
            }
        });
    }

    const traemeProductos = () => {
        onValue(refProductos, (snapshot) => {
            const data = snapshot.val();
            dispatch({ type: 'VER_PRODUCTO', payload: data });
            // console.log("data useEffect: ", data);
        });
    }

    const comprarProducto = (nombreProducto) => {
        console.log("Nombre producto: ", nombreProducto);
        console.log("Nombre de usuario en sesion: ", auth.currentUser.displayName);
        
        if (auth.currentUser.displayName) {
            dispatch({ type: 'COMPRAR_PRODUCTO', payload: nombreProducto });
            const usuarioCompraRef = ref(db, `Usuarios/${auth.currentUser.uid}/productosComprados`);
                update(usuarioCompraRef, { 
                    estado: false,
                    nombre: nombreProducto
                })
                .then(() => {
                    console.log("Producto" + nombreProducto + "comprado con éxito.");
                })
                .catch((error) => {
                    console.error("Error al comprar el producto:", error);
                });
        }
    }

    const traerProductosComprados = () => {
        const usuarioCompraRef = ref(db, `Usuarios/${auth?.currentUser?.uid}/productosComprados`);
        onValue(usuarioCompraRef, (snapshot) => {
            const data = snapshot.val();
            dispatch({ type: 'VER_PRODUCTO_COMPRADO', payload: data });
        });

    }    
    
    return (<>
        <Contexto.Provider value={{ 
                crearUsuario, 
                usuarioLogin, 
                usuarioLogout, 
                traemeProductos, 
                comprarProducto, 
                traerProductosComprados, 
                usuarioLogeado,
                estadoLogin: state.estadoLogin,
                productos: state.productos, 
                productosComprados: state.productosComprados 
            }}> 
            {children} 
        </Contexto.Provider> 
    </>
    );
}

export default UsarContexto;