import React,{useState} from 'react';
import styles from '../styles/selector.module.css';

const data= {
    dato1: true,
    dato2: false,
    dato3: true,
    dato4: false,
    dato5: true,
    dato: false,
}

const animated={
    transform: 'translateY(100vh)'
}

export default function Selector(){

    const [open, setopen] = useState(false);
    return(
        <div className={styles.container}>

            <div className={styles.textC} onClick={()=>{setopen(!open)}}>
                <h3>Perfiles</h3>
                <div className={styles.slide} >
                    <span className={ open?styles.bar11 :styles.bar1}></span>
                    <span className={open?styles.bar22 :styles.bar2}></span>
                </div>
            </div>

            <div className={[styles.opciones]}>
                <div className={!open?styles.containerOA:styles.containerO}>
                
                <div className={styles.opcion}>
                    <label className={styles.sel}> <input className={styles.ch} type="checkbox" id="Name" name="Name" />cat 1</label>
                </div>

                
                

                </div>

            </div>
            
        </div>
    )
}