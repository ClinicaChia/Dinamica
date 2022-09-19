import React,{useState} from 'react';
import styles from '../styles/category.module.css';
import Link from 'next/link'
import { Query } from 'mongoose';
export default function Category({cat,data,puntuacion}){
    const dataT=data.filter(el=>el.categoria==cat);
    const [open, setOpen] = useState(false);
    const handleClick = ()=>{
        setOpen(!open);
    }
    return(
        <section className={styles.contanier} >
        <div className={styles.textC} onClick={handleClick}>
            <h3>{cat}</h3>
            <p>puntuación: <span>{puntuacion}</span> </p>
            <div className={styles.slide}>
                <span className={ open?styles.bar11 :styles.bar1}></span>
                <span className={open?styles.bar22 :styles.bar2}></span>
            </div>
        </div>

        <article className={open?styles.content :styles.contentH}>
            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>leccion</th>
                        <th>numero de intentos</th>
                        <th>puntuacion</th>
                        
                    </tr>
                </thead>

                <tbody>

                    {dataT.map((val,index)=>{

                        return(
                            <tr key={index}>
                                <td>
                                    <Link href={{
                                        pathname: '/main/video',
                                        query: {nombre: val.nombre}
                                        
                                    }}>
                                        <a>{val.nombre}</a>
                                    </Link>                                
                                </td>
                                <td>{val.intentos}</td>
                                <td>{ (val.puntaje/val.intentos).toFixed(2)}</td>
                            </tr>
                        )
                    })}
                   
                </tbody>
            </table>
        </article>


        
    </section>
    )
}