import React from 'react';
import styles from './card.module.css'
import Image from 'next/image'

export default function Card(props){

const img = require('../public/Medico2.jpg');

  return (
   
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.circulo} >
          <div className={styles.contenido}>
            <h2>Clinica chia</h2>
            <p>lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut optio rerum placeat! Id nobis mollitia, quos repellendus officia beatae iusto accusamus sint maiores cum impedit corporis iure fugit. Sunt, quaerat.</p>
            <a href="#">conocer mas</a>
          </div>
          <div className={styles.image}>
            <Image src={img}  objectFit='cover'
            />
            
          </div>
          
        </div>
      </div>
    </div>
    
    
  
  );
};
