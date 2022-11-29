import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";


export default function AdminDashboard(){
    // context
    const [auth, setAuth] = useAuth();

    return (
        <>
            <Jumbotron title={`Holis ${auth?.user?.name}`} subTitle='Plataforma de Administrador'/>
            <pre>{JSON.stringify(auth, null, 4)}</pre>

        </>
    );
}