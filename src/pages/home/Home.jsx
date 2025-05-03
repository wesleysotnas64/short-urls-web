import { Link } from "react-router-dom";
import { useState } from 'react';
import styles from './Home.module.scss';

function Home() {
    const [setShortUrl, shortUrl] = useState("www.google.com")
    const [setShorttenedUrl, shortenedUrl] = useState(false)

    return (
        <div className={styles.mainContainer}>
            <header>
                <h1>Free URL Shortener</h1>
            </header>

            <main className={styles.mainContent}>
                <input
                    placeholder='link: www.youtube.com'
                />
                <button>Shorten</button>
            </main>
            {
                shortenedUrl &&
                (
                    <div className={styles.copyArea}>
                        <label>Url: {shortUrl}</label>
                        <button>Copy</button>
                    </div>
                )
            }
            <Link to="/LbZPaieUVeg">
                <button>Ir para Load</button>
            </Link>

            <footer className={styles.footer}>
                <label>
                    Developed by <a href='https://github.com/wesleysotnas64' target="_blank">Wesley Santos</a>
                </label>
            </footer>
        </div>
    );
}

export default Home;