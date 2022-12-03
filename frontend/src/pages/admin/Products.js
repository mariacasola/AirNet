import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";


export default function AdminProducts(){
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [products, setProducts] = useState([]);

    useEffect (() => {
        loadProduct();
    }, []);


    const loadProduct = async () => {
        try {
          const { data } = await axios.get("/products");
          setProducts(data);
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <>
            <Jumbotron title={`Holis ${auth?.user?.name}`} subTitle='Plataforma de Administrador'
            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                    <AdminMenu/>

                    </div>
                    <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Productos</div>

                    show list of products...{products.length}
                       
                    </div>

                 </div>
            </div>
        </>

    );
}