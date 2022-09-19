import React,  { useEffect, useState }  from 'react';
import styles from '../styles/nav.module.css';
import Hamburger from './hamburger';
import { useRouter } from 'next/router'
export default function Nav ({nombre}){
    const router = useRouter();
    const [state, setstate] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        e.target.id=="s"? localStorage.clear() : "";
        router.push(e.target.href);
      }

    return(
        <nav className={styles.navbar}>

            <a href="/main/uid"  onClick={handleClick} className={styles.nombre}>{nombre}</a>

            <ul className={state? styles.menuA :styles.menu }>

                <li className={styles.navItem}>
                    <a href="/main/dashboard"  onClick={handleClick} className={styles.navLink}>Puntuaciones geneales</a>
                </li>
                <li className={styles.navItem}>
                    <a href="/" id="s" onClick={handleClick} className={styles.navLink}>Salir</a>
                </li>
            </ul>

           <Hamburger stateMenu={setstate} />

        </nav>
    )

}