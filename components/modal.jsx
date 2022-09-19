import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import styles from '../styles/modal.module.css';

function Modal({file,closeModal,data,setData,nombreV,cat,setV,listV}) {
    
    (listV);
    const [n, setn] = useState([]);
    const [pregunta, setpregunta] = useState("");
    const [titulo, settitulo] = useState("");
    const [vald,setVald]=useState(-1);
    const addQ= ()=>{
        
        setn(n.concat([pregunta]));
    }

    const NewQ= ()=>{

        const obj={
            pregunta:titulo,
            respuestas: n,
            respuestaC:vald
        }

        setData(data.concat([obj]));
        alert(`Se agrego una pregunta mas a la lista, la cantidad de preguntas es: ${data.length+1}`)
    }

    const changeP=(e)=>{ setpregunta(e.target.value)};

    const changeT=(e)=>{settitulo(e.target.value)};

    const Save= async ()=>{
        const dat= new FormData();
        const obj={

            nombre: nombreV,
            categoria:cat,
            preguntas: data

        }

        if(!file){
            alert("debe cargar algun Video");
            return;
        }

        dat.append('file',file);
        dat.append('nombre',nombreV);
        const config = {
            onUploadProgress: (PE)=>{
                const Pc= Math.round(PE.loaded*100)/PE.total;
              
            }
        }
        let res=await axios.post("/api/Uvideo",dat,config)
        
        if(res.data=="ok"){
            res=await axios.post('/api/postVideo',{
                data: obj,
            })
            if(res.data=="ok"){

                setV(listV.concat([{nombre:nombreV,categoria:cat}]));
                setData([]);
                alert("Se creo el video en la plataforma de forma satisfactoria");

            }
        }

        

    }

    
  return (
    <div className={styles.container}>
        <div className={styles.modal}>

            <button className={styles.esc} 
            onClick={()=>{closeModal(false)}}
            >X</button>
            <section className={styles.head}>
                <button className={styles.save} onClick={Save}>guardar</button>
                <input type="text" placeholder='pregunta...' value={titulo} onChange={changeT}/>
                <button className={styles.mas} onClick={NewQ}>+</button>
            </section>

            {n.map( (val,index)=>{
                return(
                    <section className={styles.pregunta} key={index}>
                        <input type="radio"  name='g1' onChange={()=>{setVald(index)}}/>
                        <p>{val}</p>
                    </section>
                )
            })}

            <section className={styles.foot}>

                            <input type="radio" defaultChecked />
                            <input type="text" value={pregunta} onChange={changeP} placeholder='respuesta nueva...'/>
                        <button className={styles.mas} onClick={addQ}>+</button>
                </section>

            

        </div>
    </div>
  )
}

export default Modal