import moment from "moment";
import { Badge } from "antd";

export default function ProductCard ({ p }) {
    return (
        <div className="card mb-3 hoverable">


            <Badge.Ribbon text={`${p?.sold} vendidos`} color="red">
            <Badge.Ribbon 
            text={`${p?.quantity >=1 
                ? `${p?.quantity - p?.sold} En stock`
                : 'Sin stock'
            }`} 
            placement="start"
            color="green">

            <img
            className="card-img-top"
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: "300px", objectFit: "cover"}}
            />

            </Badge.Ribbon>
            </Badge.Ribbon>


            
            <div className="card-body">
                <h5>{p?.name}</h5>
                <p className="card-text">{p?.description?.substring(0,60)}...</p>

            </div>

            <div className="d-flex justify-content-between">
                <button className="btn btn-primary col card-button" 
                style={{ borderBottomLeftRadius: '5px'}}>
                    Ver Producto
                </button>

                <button className="btn btn-outline-primary col card-button"
                 style={{ borderBottomRightRadius: '5px'}}>
                    Añadir al Carrito
                </button>
            </div>
            
            {/* <p>{moment(p.createdAt).fromNow()}</p>
            <p>{p.sold}</p> */}
        </div>
    );
}