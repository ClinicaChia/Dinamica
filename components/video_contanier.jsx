import React,{useState} from 'react';
import styles from '../styles/video.module.css';
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import axios from 'axios';
export default function Video({user,nombre,preguntas}){
    const [Video,setVideo] = useState(true);
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    const onSubmit = data => {
        
       const p_total=0;
       const keys=Object.keys(data);

       keys.forEach(key =>{

        p_total+= parseInt(data[key])
       })

       axios.post("/api/UpdateUser",{user,video:nombre,puntaje:p_total}).then( (res)=>{  alert("Se ha registrado su respuesta!"); router.push("/main/uid"); } )

    };
    return(
        <div>

            { Video && <video controls src={`/videos/${nombre}.mp4`} onEnded={()=>{setVideo(!Video)}} ></video>
            }
            
            { !Video && <section className={styles.containerV}>

                <form onSubmit={handleSubmit(onSubmit)}>

                    
                        {preguntas.map((fila,index)=>{
                            return(
                                <fieldset key={index}>
                                    <legend>{fila.pregunta}</legend>
                                    {fila.respuestas.map((respuesta,index2)=>{
                                        const pregunta=`pregunta${index}`;
                                        return(
                                            <div key={index2}>
                                                <input type="radio" name={pregunta} value={index2==fila.respuestaC? 1:0} {...register(pregunta)}  />
                                                <span>{respuesta}</span>
                                            </div>
                                        )

                                    })}

                                </fieldset>
                                
                            )
                        })}
                        
                    
                
                    <div className={styles.wrap}>
                        <button className={styles.button}>enviar</button>
                    
                    </div>
                </form>

            </section>}
            
           
        </div>
    )
}