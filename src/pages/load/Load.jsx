import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Load.module.scss';

function Load() {
    const { hash } = useParams(); // <- capturando o hash da URL
    const [currentUrl, setCurrentUrls] = useState("");
    const [message, setMessage] = useState("");

    const hasFetched = useRef(false);

    function redirectToOriginalUrl(url) {
        if (url) {
            window.open(url, '_blank');
        }
    }

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        axios.post(`${import.meta.env.VITE_API_URL}/call-hash`, hash, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            const data = response.data;
            if (data.isOk) {
                const url = data.shortUrl?.url ?? "";
                setCurrentUrls(url);
                setTimeout(() => {
                    redirectToOriginalUrl(url);
                }, 1000);
            } else {
                setMessage(data.message);
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
            setMessage("Erro ao conectar com a API.");
        });
    }, [hash]);

    return (
        <div className={styles.mainContainer}>
            <label>Redirecionando...</label>
            <label>Hash: {hash}</label>
            <label>Url: {currentUrl}</label>
            {message && <label style={{ color: "red" }}>{message}</label>}
        </div>
    );
}

export default Load;
