import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";


export default function AdminCategory(){
    // context
    const [auth, setAuth] = useAuth();

    // state
    const [name, setName] = useState("");
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatingName, setUpdatingName] = useState("");

    useEffect(() => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("/category", {name});
            if(data?.error) {
                toast.error(data.error)
            } else {
                loadCategories();
                setName("");
                toast.success(`"${data.name}" ya es una categoria`);
            }
        } catch (err){
            console.log(err);
            toast.error("Error al crear la categoria");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`/category/${selected._id}`, {name: updatingName,
            });
            if(data?.error){
                toast.error(data.error);
            } else {
                toast.success(`${data.name} se ha actualizado`);
                setSelected(null);
                setUpdatingName("");
                loadCategories();
                setOpen(false);
            }

        } catch (err){
            console.log(err)
            toast.error("La categoria ya existe");

        }
    };



    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.delete(`/category/${selected._id}`);
            if(data?.error){
                toast.error(data.error);
            } else {
                toast.success(`${data.name} se ha eliminado`);
                setSelected(null);
                loadCategories();
                setOpen(false);
            }

        } catch (err){
            console.log(err)
            toast.error("La categoria ya existe");

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
                    <div className="p-3 mt-2 mb-2 h4 bg-light">Administracion de Categorias</div>

                    <CategoryForm 
                    value={name}
                    setValue={setName}
                    handleSubmit={handleSubmit}
                    />

                    <hr/>

                    <div className="col">
                            {categories?.map((c)=>(

                                <button key={c._id} className="btn btn-outline-primary m-3" onClick={() =>{
                                    setOpen(true);
                                    setSelected(c);
                                    setUpdatingName(c.name);
                                }}>
                                {c.name}
                                </button>

                            ))}
                        </div>

                        <Modal 
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={()=> setOpen(false)}
                            footer={null}
                        >
                            <CategoryForm 
                                value={updatingName}
                                setValue={setUpdatingName}
                                handleSubmit={handleUpdate}
                                buttonText= 'Actualizar'
                                handleDelete={handleDelete}
                                />
                            
                            </Modal>
                    </div>
                 </div>
            </div>
        </>

    );
}