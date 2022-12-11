import {useAuth} from '../../context/auth';
import { useCart } from '../../context/cart';
import { useNavigate } from 'react-router-dom';



export default function UserCartSidebar () {

    // context
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();

    // hoos
    const navigate = useNavigate();


    
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



    return (
        <div className='col-md-3'>
        <h4>Subtotal</h4>
        Total / Direccion / Medios de Pago
        <hr/>
        <h6>Total: {cartTotal()}</h6>

        {auth?.user?.address ? (
            <>
             <div className='mb-3'> <hr/>
                <h4>Direccion:</h4>
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


    </div>
    )
}