import React,{useEffect} from 'react';
import Image from 'next/image'
const img = require('../public/LOGO BLANCO.png');
import styles from '../styles/home.module.css';
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import axios from 'axios';
export default function Home() {

  const router = useRouter();
  const { register, handleSubmit } = useForm();


  useEffect(() => {
    const log = localStorage.getItem('user');
    if(log){
      
      router.push('/main/uid')
    }

  }, []);


  const onSubmit = async (data) => {
    
    //La validacion que todo este bien para almacenar el nombre de usuario
    //localStorage.setItem('nombre',data.nombre);

    const res= await axios.post('/api/validar',{data} );

    if(res.data){
      localStorage.setItem('nombre',res.data.nombre);
      localStorage.setItem('user',res.data.user);
      router.push('/main/uid');
    }
    else{
      alert("Credenciales no validos");
    }

};

  return (

    <div className={styles.container}>

        <aside className={styles.container_img}>
          <div className={styles.imagen}>
            <Image  src={img}  />
          </div>
        </aside>

        <section className={styles.content}>

            <h1>Sistema de capacitaciones Dinamica Gerencial</h1>
            <p>El sistema guarda datos en la cache, por lo cual, una vez ingresado la primera vez, no tendra que rellenar el formulario otra vez</p>
            
            <form  onSubmit={handleSubmit(onSubmit)}>

            <input type="text" {...register("user")} placeholder='usuario...'/>
            <input type="password" {...register("password")} placeholder='contraseña...'/>
            <button className={styles.btn}>Entrar</button>

            </form>
            

          

        </section>


    </div>
    
  
  );
}

