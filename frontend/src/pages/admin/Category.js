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
    const [visible, setVisible] = useState(false);
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
            console.log('actualiza categoria', updatingName);

        } catch (err){
            console.log(err)

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
                                    setVisible(true);
                                    setSelected(c);
                                    setUpdatingName(c.name);
                                }}>
                                {c.name}
                                </button>

                            ))}
                        </div>

                        <Modal 
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={()=> setVisible(false)}
                            footer={null}
                        >
                            <CategoryForm 
                                value={updatingName}
                                setValue={setUpdatingName}
                                handleSubmit={handleUpdate}
                                />
                            
                            </Modal>
                    </div>
                 </div>
            </div>
        </>

    );
}