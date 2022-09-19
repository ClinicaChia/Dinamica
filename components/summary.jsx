import React,{useState} from 'react';
import styles from  '../styles/main.module.css';

export default function summary({pt1,pt2,pt3}){

    return(
    <section className={styles.container_summary} >
    <article>
        <p>Puntuacion Global</p>
        <br />
        <span>{pt1}</span>
    </article>
    <article>
        <p>Mejor Categoria</p>
        <br />
        <span>{pt2}</span>
    </article>
    <article>
        <p>Puesto Global</p>
            <br />
            <span>{pt3}</span>
    </article>
</section>
    )
}