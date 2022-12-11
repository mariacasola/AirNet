import {useCart} from '../context/cart';
import {useAuth} from '../context/auth';
import Jumbotron from '../components/cards/Jumbotron';
import { useNavigate} from 'react-router-dom';
import moment from 'moment';




export default function Cart () {
    // context
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();

    // hooks
    const navigate = useNavigate();

    const removeFromCart = (productId) => {
        let myCart = [...cart];
        let index = myCart.findIndex((item) => item._id === productId);
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));

    };



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
                                    <div key={index} className='card mb-3'>
                                        <div className='row g-0'>
                                            <div className='col-md-4'>
                                                <img
                                                src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                                                alt={p.name}
                                                style={{
                                                    height: "150px",
                                                    width: "150px",
                                                    objectFit:"cover",
                                                    marginLeft: "-12px",
                                                    borderTopRightRadius: "0px",
                                                }}
                                                />
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>
                                                        {p.name}{" "}
                                                        {p?.price?.toLocaleString
                                                        ("en-US", {
                                                            style: "currency",
                                                            currency: "USD"
                                                        })}
                                                    </h5>
                                                    <p className='card-text'>
                                                        {`${p?.description?.substring(0,50)}...`}
                                                    </p>
                                                    
                                                </div>
                                            </div>

                                            <div className='d-flex justify-content-between'>
                                                <p className='card-text'>
                                                    <small className='text-muted'> 
                                                        Agregado {moment(p.createdAt).fromNow()}
                                                    </small>
                                                    </p>
                                                    <p 
                                                    className='text-danger mb-2 pointer'
                                                    onClick={() =>removeFromCart(p._id)}
                                                    >
                                                        Eliminar
                                                    </p>
                                            </div>
                                            
                                            </div>
                                     
                                    </div>
                                ))}

                            </div>

                        </div>

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


                    </div>
                </div>
            )}
        
        
        </>
    );
}