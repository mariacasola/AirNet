import { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron"; 
import axios from "axios";
import moment from "moment";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err)
    }
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a,b) => (a.sold <b.sold ? 1 : -1));


    return (
        <div>
          <Jumbotron title="Hola a todos" subTitle="Bienvenidos a Airnet"/>

          <div className="row">
            <div className="col-md-6">
              <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">Lo ultimo!</h2>
              {products?.map (p => (
              <div>
                <p>{p.name}</p>
                <p>{moment(p.createdAt).fromNow()}</p>
                <p>{p.sold}</p>
              </div>
            ))}
            </div>

            <div className="col-md-6">
              <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">Los mas vendidos!</h2>
            {products?.map (p => (
              <div>
                <p>{p.name}</p>
                <p>{moment(p.createdAt).fromNow()}</p>
                <p>{p.sold}</p>
              </div>
            ))}
            </div>

          </div>

          

         

      </div>
    );
}