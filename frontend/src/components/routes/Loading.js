import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGIF from "../../images/loading.gif";

export default function Loading ({path = 'login'}){
    //state
    const [count, setCount] = useState(3);

    // hooks
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() =>{
        const interval = setInterval(()=> {
            setCount ((currentCount) => --currentCount )
        }, 1000);
        // redireccion cuando la cuenta llega a cero
        count === 0 && navigate(`/${path}`, {
            state: location.pathname,
        });

        // limpiar
        return () => clearInterval(interval);
    }, [count]);

    return (
    <div className="d-flex justify-content-center align-items-center vh-100">
        <img src={LoadingGIF} alt="Cargando" style={{ width: '300px'}}/>
        </div>
    );
}