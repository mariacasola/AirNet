import { NavLink } from "react-router-dom";

export default function AdminMenu () {
    return (
        <>
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
                    <li>
                        <NavLink className='list-group-item' to='/dashboard/admin/products'>
                            Productos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className='list-group-item' to='/dashboard/admin/orders'>
                            Gestion de pedidos
                        </NavLink>
                    </li>
                </ul>
        </>
    )
}