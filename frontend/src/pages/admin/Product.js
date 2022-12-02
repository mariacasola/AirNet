import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import React from 'react';
import { Select } from 'antd';

const {Option} = Select;

export default function AdminProduct(){
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
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Crear Producto</div>


                    {photo && (
                        <div className="text-center">
                            <img 
                            src={URL.createObjectURL(photo)}
                            alt="foto del producto"
                            className="img img=responsive"
                            height='200px'
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


                    <Select
                    showSearch
                    bordered={false} 
                    size="large" 
                    className="form-select mb-3" 
                    placeholder="Seleccione una categoria" 
                    onChange={(value) => setCategory(value)}
                    >
                        {categories?.map((c) => (
                        <Option key={c._id} value={c.name}>
                            {c.name}
                        </Option>))}
                    </Select>

                    
                       
                    </div>

                 </div>
            </div>
        </>

    );
}