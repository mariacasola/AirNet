import { useAuth } from "../../context/auth";
import { NavLink } from "react-router-dom";
import Jumbotron from "../../components/cards/Jumbotron";


export default function AdminDashboard(){
    // context
    const [auth, setAuth] = useAuth();

    return (
        <>
            <Jumbotron title={`Holis ${auth?.user?.name}`} subTitle='Plataforma de Administrador'
            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Links</div>

                        <ul className="list-group list-unstyled">
                            <li>
                                <NavLink className='list-group-item' to='/dashboard/admin/category'>
                                    Crear Categoria
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='list-group-item' to='/dashboard/admin/product'>
                                    Crear Producto
                                </NavLink>
                            </li>
                        </ul>



                        </div>
                    <div className="col-md-9">Contenido</div>

                 </div>
            </div>
        </>

    );
}