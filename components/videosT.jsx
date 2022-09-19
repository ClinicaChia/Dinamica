
import React,{useState,useEffect} from 'react';
import styles from '../styles/tablaV.module.css';
import Modal from '../components/modal';

const axios = require('axios');

export default function Tabla({listaV,setlistV,categoriaF,setCatF,categorias,setcategorias}){


    const [nombre, setNombre] = useState("");
    const [modal, setmodal] = useState(false);
    const [file,setFile] = useState();
    const [dataB, setdataB] = useState([]);

    const delVid= async (e)=>{
        const id=parseInt(e.target.id);
        const temp=[];
        listaV.forEach((el,index) => {
            if(id!=index){temp.push(el);}
        });
        
        axios.post("/api/delVid",{nombre:listaV[id].nombre});
        setlistV(temp);
    }

    const ChangeFile= (e)=>{
        const files = e.target.files;
        
        if(files?.length){
            setFile(files[0]);
            setNombre(files[0].name);
            return;
        }

        setNombre("");
        
    }


    return(
        <div className={styles.container}>

 
                
                <table className={styles.tabla}>
                    <thead>
                        <tr>
                            <th>nombre</th>
                            <th>categoria</th>
                            <th>accion</th>
                        </tr>
                    </thead>
                    <tbody>

                        {listaV.map( (val,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{val.nombre}</td>
                                    <td>{val.categoria}</td>
                                    <td><button id={index} className={styles.eliminar} onClick={delVid}>eliminar</button></td>
                                </tr>
                            )
                        } )}

                    </tbody>
                </table>

                <section className={styles.add}>

                    <article className={styles.archivo}>
                        <input  type="file" accept='.mp4'  onChange={ChangeFile}/>
                    
                    </article>
                    <article>
                        <button className={styles.db} disabled>Nombre</button>
                        <input type="text" value={nombre}  />
                    </article>
                    <article>
                        <button className={styles.db} disabled>Categoria</button>
                        <select value={categoriaF} onChange={(e)=>{setCatF(e.target.value)}}>
                            {categorias.map((vals,index)=>{
                                return(
                                    <option key={index} value={vals}>{vals}</option>
                                )
                            })}
                        </select>
                        
                    </article>
                    <button className={styles.cyg} onClick={()=>{
                        setmodal(!modal);
                    }}>Crear y guardar preguntas</button>
                </section>


                {modal && <Modal file={file} setV={setlistV} listV={listaV} nombreV={nombre} cat={categoriaF} data={dataB} setData={setdataB} closeModal={setmodal}/>}
            </div>
    )
}