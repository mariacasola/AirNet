import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";


export default function UserOrders(){
    // context
    const [auth, setAuth] = useAuth();

    return (
        <>
            <Jumbotron title={`Hola ${auth?.user?.name}`} subTitle='Plataforma'
            />

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                    <UserMenu/>

                    </div>
                    <div className="col-md-9">
                        <div className="p-3 mt-2 mb-2 h4 bg-light">Ordenes</div>
                        historial de ordenes de usuario                  
                    </div>
                 </div>
            </div>
        </>

    );
}