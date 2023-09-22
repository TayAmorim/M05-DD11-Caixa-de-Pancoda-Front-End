import React, { useState, useEffect } from 'react';
import axios from 'axios';

function fetchData() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/clientes/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar dados:', error);
            });
    }, []);

    return data;
}

export default fetchData;