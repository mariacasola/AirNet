import moment from "moment";

export default function ProductCard ({ p }) {
    return (
        <div className="card mb-3 hoverable">
            <img
            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
            alt={p.name}
            style={{ height: "300px", objectFit: "cover"}}
            />
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
                    Añadir al carrito
                </button>
            </div>
            
            {/* <p>{moment(p.createdAt).fromNow()}</p>
            <p>{p.sold}</p> */}
        </div>
    );
}