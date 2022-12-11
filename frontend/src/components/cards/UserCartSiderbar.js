import {useAuth} from '../../context/auth';
import { useCart } from '../../context/cart';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import toast from 'react-hot-toast';

export default function UserCartSidebar () {

    // context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    // state 
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");

    // hooks
    const navigate = useNavigate();

    useEffect (() => {
        if (auth?.token) {
            getClientToken();
        }
    }, [auth?.token]);


    const getClientToken = async () => {
        try {
            const {data} = await axios.get("/braintree/token");
            setClientToken(data.clientToken);
        } catch (err) {
            console.log(err)
        }
    }

    
    const  cartTotal = () => {
        let total = 0;
        cart.map((item) => {
            total += item.price;
        });
        return total.toLocaleString("en-US", {
            style: 'currency',
            currency: "USD",
        });
    }


    const handleBuy = async () => {
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post("/braintree/payment", {
                nonce,
                cart,
            });
            localStorage.removeItem("cart")
            setCart([]);
            navigate("/dashboard/user/orders")
            toast.success("Pago exitoso")
        } catch (err){
            console.log(err)
        }
    }



    return (
        <div className='col-md-3'>
        <h4>Subtotal</h4>
        Total / Direccion / Medios de Pago
        <hr/>
        <h6>Total: {cartTotal()}</h6>

        {auth?.user?.address ? (
            <>
             <div className='mb-3'> <hr/>
                <h4>Direccion de envio:</h4>
                <h5>{auth?.user?.address}</h5>
             </div>
             <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}>
                Actualizar direccion
             </button>

            </>

        ) :(
            <div className='mb-3'>
                {auth?.token ? (
                    <button
                    className='btn btn-outline-warning'
                    onClick={() => navigate('/dashboard/user/profile')}
                    >
                        Indique direccion de envio
                    </button>
                ) : (
                    <button 
                    className='btn btn-outline-danger mt-3'
                    onClick={() => navigate('/login', {
                        state: '/cart'
                    })}
                    >
                        Inicie sesion para comprar
                    </button>
                )}

            </div>
        )}

        <div className='mt-3'>
            {!clientToken || !cart?.length ? (
                ""
            ) : (
                <>
                    <DropIn
                        options={{
                        authorization: clientToken,
                        paypal: {
                            flow: "vault",
                        },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                    />
                    <button onClick={handleBuy} 
                    className='btn btn-primary col-12 mt-2'
                    disabled={!auth.user?.address || !instance}
                    >
                        Pagar
                    </button>
                </>
            
            )}
        </div>


    </div>
    );
}