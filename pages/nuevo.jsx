import React,{useState} from 'react';
import Image from 'next/image'
const img = require('../public/LOGO BLANCO.png');
import styles from '../styles/user.module.css';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router'
import { set } from 'mongoose';
const axios = require('axios');


export default function User({perfiles}){

    const { register, handleSubmit } = useForm();
    const [Perfiles, setperfiles] = useState({});

    const router = useRouter();

    const ref = (e)=>{
        setperfiles(perfiles=>({...Perfiles,...{ [e.target.value]:e.target.checked }}))
    }

    const onSubmit = async (data) => {
    
        //La validacion que todo este bien para almacenar el nombre de usuario
        //validar los datos
        let correct=0;
        data.user.length < 5 ? alert("Nombre de usuario corto") : correct+=1;
        data.nombre.length < 10 ? alert("Revise que su nombre tenga apellido") : correct+=1;
        data.servicio.length < 3 ? alert("Nombre de servicio no valido") : correct+=1;
        data.nombre.length < 5 ? alert("Contraseña corta") : correct+=1;
        
        const perfilesFill= [];
        const keys= Object.keys(Perfiles);
        keys.forEach( (key,index)=>{
            if(Perfiles[key]){
                perfilesFill.push(key);
            }
        } )

        data.perfiles=perfilesFill;
        data.servicio=data.servicio.toLowerCase();
        if(correct==4){
            //peticion a axios
            
            const res=await axios.post('/api/create',{
                
                data
            
            });
            if(res.data=="ok"){

                localStorage.setItem('nombre',data.nombre);
                localStorage.setItem('user',data.user);
                //router.push("/main/uid");
                alert("Usuario Creado");

            }
            else{
                alert("Usuario ya exisistente");
            }

        }        
    };

    return(

        <div className={styles.container}>

            <aside className={styles.container_img}>
            <div className={styles.imagen}>
                <Image  src={img}  />
            </div>
            </aside>

            <section className={styles.content}>

                <h1>Creación de Usuario</h1>
                
                <form  onSubmit={handleSubmit(onSubmit)}>

                <input type="text" {...register("user")}   placeholder='usuario...' />
                <input type="text" {...register("nombre")} placeholder='nombre...' />
                <input type="text" {...register("servicio")} placeholder='servicio...' />
                
                <fieldset className={styles.perfiles}>
                    <legend>Perfiles</legend>
                    {perfiles.map((val,index)=>{
                    return(
                        <label><input value={val.nombre} onChange={ref} type="checkbox"/>{val.nombre}</label>
                    )
                })}
                    
                </fieldset>
                <input type="password" {...register("password")} placeholder='contraseña...'/>
                
                <button className={styles.btn}>Crear</button>
                

                </form>
                

            

            </section>


        </div>
    )

}
export async function getServerSideProps() {
    // Fetch data from external API

    const perfiles = await (await fetch(process.env.URL+"/api/getPerfiles")).json();
    
    return { props: {perfiles} }
  }
