import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/auth";
import { useNavigate } from 'react-router-dom';
import Search from '../forms/Search';
import useCategory from '../../hooks/useCategory';

export default function Menu () {
    //context
    const [auth, setAuth] = useAuth();

    //hooks
    const categories = useCategory();
    const navigate = useNavigate();
    // console.log('categorias => ', categories)


    const logout = () =>{
        setAuth({ ...auth, user: null, token:""});
        localStorage.removeItem("auth");
        navigate('/login');
    };


//  condition ? true : false


    return (
        <>
            <ul className="nav d-flex justify-content-between shadow-sm mb-2">
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">INICIO
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/shop">COMPRAR
                    </NavLink>
                </li>

                <div className='dropdown'>
                        <li>
                            <a 
                            className="nav-link pointer dropdown-toggle"
                            data-bs-toggle='dropdown'
                            >
                                Categorias
                            </a>

                            <ul className='dropdown-menu'
                            style={{ height: "300px", overflow: 'scroll'}}
                            >
                                    <li>
                                        <NavLink 
                                        className="nav-link" 
                                        to={'/categories'}>
                                        todas las categorias
                                        </NavLink>
                                    </li>

                                {categories?.map ((c) => (
                                    <li>
                                        <NavLink 
                                        className="nav-link" 
                                        to={`/category/${c.slug}`}>
                                        {c.name}
                                        </NavLink>
                                    </li>
                                ))}

                            </ul>

                        </li>       

                    </div>


            <Search/>
             
             {!auth?.user? (            
                 <>
       
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">INICIAR SESION</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/register">REGISTRARSE</NavLink>
                    </li>
                </> 

                 ) : (
                    <div className='dropdown'>
                        <li>
                            <a 
                            className="nav-link pointer dropdown-toggle"
                            data-bs-toggle='dropdown'
                            >
                                {auth?.user?.name}
                            </a>

                            <ul className='dropdown-menu'>
                                <li>
                                <NavLink className="nav-link" to={`/dashboard/${
                                    auth?.user?.role === 1 ? "admin" : "user"
                                }`}
                                >
                                    PLATAFORMA
                                    </NavLink>
                                </li>

                                <li className="nav-item pointer">
                                    <a onClick={logout} className="nav-link">
                                    CERRAR SESION
                                </a>
                                </li>

                            </ul>

                        </li>       

                    </div>
                )}

            </ul>
        </>
    );
}
