import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import React from 'react';
import { Select } from 'antd';
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


const {Option} = Select;

export default function AdminProductUpdate(){
    // context
    const [auth, setAuth] = useAuth();
    // state
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [shipping, setShipping] = useState("");
    const [quantity, setQuantity] = useState("");
    const [id, setId] = useState("");

    // hook 
    const navigate = useNavigate();
    const params = useParams();


    useEffect (() =>{
        loadProduct();
    }, []);




    useEffect (() => {
        loadCategories();
    }, []);


    const loadCategories = async () =>{
        try {
            const {data} = await axios.get("/categories");
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
    }

    const loadProduct = async () => {
        try {
            const {data} = await axios.get(`/product/${params.slug}`);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setCategory(data.category._id);
            setShipping(data.shipping);
            setQuantity(data.quantity);
            setId(data._id);
        } catch (err) {
            console.log(err)

        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const productData = new FormData();
            photo && productData.append("photo", photo);
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("shipping", shipping);
            productData.append("quantity", quantity);

            const {data} = await axios.put(`/product/${id}`, productData);
            if (data?.error) {
                toast.error(data.error);
            } else {
                toast.success(`"${data.name}" ha sido creado`);
                navigate("/dashboard/admin/products");
            }
        
        } catch (err) {
            toast.error("No se creo el producto")
    }
};

    const handleDelete = async (req, res) => {
        try {
            let answer = window.confirm("Realmente desea eliminar este producto?");
            if(!answer) return;
            const {data} = await axios.delete(`/product/${id}`);
            toast.success(`"${data.name}" ha sido eliminado`);
            navigate("/dashboard/admin/products");
        } catch (err) {
            console.log(err);
            toast.error("No se pudo eliminar");
        }
    };
    


    return (
        <>
            <Jumbotron title={`Hola ${auth?.user?.name}`} subTitle='Plataforma de Administrador'
            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                    <AdminMenu/>

                    </div>
                    <div className="col-md-9">
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Actualizar Producto</div>


                    {photo ? (
                        <div className="text-center">
                            <img 
                            src={URL.createObjectURL(photo)}
                            alt="foto del producto"
                            className="img img=responsive"
                            height='200px'
                            />
                        </div>
                    ) : (
                        <div className="text-center">
                            <img
                                src={`${process.env.REACT_APP_API}/product/photo/${id}?${new Date().getTime()}`}
                                alt="foto del producto"
                                className="img img-responsive"
                                height="200px"
                            />
                        </div>
                    )}





                    <div className="pt-2">
                        <label className="btn btn-outline-secondary col-12 mb-3">
                            {photo ? photo.name : 'Cargar imagen'}
                            <input 
                            type='file' 
                            name='photo' 
                            accept='image/*' 
                            onChange={(e) => setPhoto(e.target.files[0])}
                            hidden />
                        </label>
                    </div>

                    <input 
                    type='text' 
                    className="form-control p-2 mb-3" placeholder="Ingrese un nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />

                    <textarea 
                    type='text' 
                    className="form-control p-2 mb-3" placeholder="Ingrese una descripcion"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />


                    <input 
                    type="number" 
                    className="form-control p-2 mb-3" placeholder="Ingrese el precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    />


                    <Select
                    //showSearch
                    bordered={false} 
                    size="large" 
                    className="form-select mb-3" 
                    placeholder="Seleccione una categoria" 
                    onChange={(value) => setCategory(value)}
                    value={category}
                    >
                        {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                            {c.name}
                        </Option>))}
                    </Select>


                    <Select
                    bordered={false} 
                    size="large" 
                    className="form-select mb-3" 
                    placeholder="Seleccione Envio" 
                    onChange={(value) => setShipping(value)}
                    value={shipping ? "Si" : "No"}
                    >
                        <Option value="0">No</Option>
                        <Option value="1">Si</Option>

                    </Select>



                    <input 
                    type="number" 
                    min="1"
                    className="form-control p-2 mb-3" placeholder="Ingrese la cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    />

                    <div className="d-flex justify-content-between">
                    <button onClick={handleSubmit} className="btn btn-primary mb-5">Actualizar</button>
                    <button onClick={handleDelete} className="btn btn-danger mb-5">Eliminar</button>
                    </div>
                    
                    
                       
                    </div>

                 </div>
            </div>
        </>

    );
}