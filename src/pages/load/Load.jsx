import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styles from './Load.module.scss';

function Load() {
    const [currentHash, setCurrentHash] = useState("kajhsbdia876%*$");
    const [currentUrl, setCurrentUrls] = useState("");
    const [currentPath, setCurrentPath] = useState("");
    const [message, setMessage] = useState("");

    const hasFetched = useRef(false); // <-- evita chamadas duplicadas

    function redirectToOriginalUrl(url) {
        if (url) {
            window.open(url, '_blank');
        }
    }

    useEffect(() => {
        if (hasFetched.current) return; // impede execução duplicada
        hasFetched.current = true;

        const parts = window.location.pathname.split("/");
        const hash = parts[1];
        setCurrentPath(window.location.pathname);
        setCurrentHash(hash);

        axios.post(`${process.env.REACT_APP_API_URL}/call-hash`, JSON.stringify(hash), {
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
    }, []);

    return (
        <div className={styles.mainContainer}>
            <label>Redirecionando...</label>
            <label>Path: {currentPath}</label>
            <label>Hash: {currentHash}</label>
            <label>Url: {currentUrl}</label>
            {message && <label style={{ color: "red" }}>{message}</label>}
        </div>
    );
}

export default Load;
