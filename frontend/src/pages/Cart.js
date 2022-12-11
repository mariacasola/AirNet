import {useCart} from '../context/cart';
import {useAuth} from '../context/auth';
import Jumbotron from '../components/cards/Jumbotron';
import { useNavigate} from 'react-router-dom';

import UserCartSidebar from '../components/cards/UserCartSiderbar';
import ProductCardHorizontal from '../components/cards/ProductCardHorizontal';




export default function Cart () {
    // context
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();

    // hooks
    const navigate = useNavigate();





    return (
        <>
            <Jumbotron title={`Hola ${auth?.token && auth?.user?.name}`} subTitle={
                cart.length  
                ? `Hay ${cart?.length} productos en el carrito. ${auth?.token ? '' : 'Por favor inicie sesion para pagar'}`
                : 'El carrito esta vacio'
                }
            />


            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='p-3 mt-2 mb-2 h4 bg-light text-center'>
                            {cart?.length ? ("Mi Carrito"):( 
                            <div className='text-center'>
                                <button 
                                className='btn btn-primary' 
                                onClick={()=> navigate("/")}>
                                Seguir Comprando

                                </button>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>

            {cart?.length  && ( 
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8'>
                            <div className='row'>
                                {cart?.map((p, index) => (
                                    <ProductCardHorizontal key={index} p={p}/>
                                ))}

                            </div>

                        </div>

                       <UserCartSidebar/>


                    </div>
                </div>
            )}
        
        
        </>
    );
}