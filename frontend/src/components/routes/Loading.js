import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Loading (){
    //state
    const [count, setCount] = useState(3);

    // hooks
    const navigate = useNavigate();

    useEffect(() =>{
        const interval = setInterval(()=> {
            setCount ((currentCount) => --currentCount )
        }, 1000);
        // redireccion cuando la cuenta llega a cero
        count === 0 && navigate('/login');

        // limpiar
        return () => clearInterval(interval);
    }, [count]);

    return <div className="d-flex justify-content-center align-items-center vh-100">
        Redireccionando en {count} segundos
        </div>;
    
}