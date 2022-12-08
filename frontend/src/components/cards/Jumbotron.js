export default function Jumbotron({title, subTitle = "Bienvenidos a AirNet"}) {
    return <div className="container-fluid">
        <div className="row"> 
            <div 
            className="col text-center p-5 jumbotron"
            style={{ marginTop: '8px', height:'200px'}}>
                <h1 className="fw-bold" id="airnet">{title}</h1>
                <p className="lead">{subTitle}</p>
            </div>
        </div>
    </div>
}