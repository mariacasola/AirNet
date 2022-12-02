export default function CategoryForm({value, setValue, handleSubmit}) {
    return (

        <div className="p-3">
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                className="form-control p-3"
                placeholder="Escribir el nombre de la categoria"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                />
                <button className="btn btn-primary mt-3">Enviar</button>
            </form>
        </div>
    )
}