import React ,{useState} from 'react';
import styles from '../styles/hamburger.module.css';

export default function hamburger({stateMenu}){
    const [state, setstate] = useState(false);
    const HandleClick = (e)=>{
        e.preventDefault();
        setstate(!state);
        stateMenu(!state);
    }
    return(

        <div onClick={HandleClick} className={styles.hamburger}>

                <span className={state? styles.bar1 : styles.bar}></span>
                <span className={ state? styles.bar2 : styles.bar}></span>
                <span className={ state? styles.bar3 : styles.bar}></span>

        </div>
        
    )
}