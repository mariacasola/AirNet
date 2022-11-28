import { useState } from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Jumbotron from "../../components/cards/Jumbotron";  
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
    //state

    const [email, setEmail] = useState("majo@gmail.com");
    const [password, setPassword] = useState("123456");

  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const {data} = await axios.post(`${process.env.REACT_APP_API}/login`, 
          { email,
            password,
          }); 
          console.log(data);
          if(data?.error){
            toast.error(data.error);
          } else {
            localStorage.setItem('auth', JSON.stringify(data));
            setAuth({ ...auth, token: data.token, user: data.user});
            toast.success("Acceso correcto");
            navigate("/dashboard");
          }
        } catch (err) {
          console.log(err);
          toast.error('Acceso denegado');
        };
    };

        
    return (
        <div>
          <Jumbotron title="Login"/>


          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3">

                <form onSubmit={handleSubmit}>


                <input 
                type='email' 
                className='form-control mb-4 p-2'
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

                />

              <input 
                type='password' 
                className='form-control mb-4 p-2'
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button 
                className="btn btn-primary"
                type="submit"
                >Enviar</button>

                </form>
              </div>

            </div>
          </div>

  
      </div>
    );
  }



