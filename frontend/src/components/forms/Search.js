import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Search () {

    const [keyword, setKeyword] = useState("");
    const [results, setResults] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/products/search/${keyword}`);
            console.log(data);
        } catch (err){
            console.log(err)
        }
    }


    return (
        <form className='d-flex' onSubmit={handleSubmit}>
                    <input
                    type="search"
                    style={{ borderRadius: '0px'}}
                    className='form-control'
                    placeholder='Buscar'
                    onChange= {(e) => setKeyword(e.target.value)}
                    />
                    <button
                    className='btn btn-outline-primary'
                    type='submit'
                    style={{ borderRadius: '0px'}}
                    >
                        Buscar
                    </button>

                </form>
    );
}