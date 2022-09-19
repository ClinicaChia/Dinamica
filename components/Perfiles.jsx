import React,{useState,useEffect} from 'react';
import styles from '../styles/perfiles.module.css';
const axios = require('axios');

export default function Perfiles({categorias,perfilesA}){


    const [nombre, setnombre] = useState("");
    const [cat, setcat] = useState({});
    const [perfiles, setperfiles] = useState(perfilesA);
    
    
    const HandleChange= (e)=>{

        setcat( cat =>( {...cat,...{[e.target.value]:e.target.checked}}) )
    }


    const Crear = async (e)=>{

        e.preventDefault();
        const catF = [];
        const keys= Object.keys(cat);
        keys.forEach(key =>{
            if(cat[key]){
                catF.push(key);
            }
        })

        const res=await axios.post("/api/addPerfil",{ data:{nombre,categorias:catF} });
        if(res.data=="ok"){

            alert("Se creo el perfil de forma exitosa");
            setperfiles(perfiles.concat([{nombre,categorias:catF}]));

        }
        else{
            alert("error en la creacion del perfil")
        }

        //peticion a axios

    }

    const del = (e)=>{
        const id= parseInt(e.target.id);
        const temp=[];

        axios.post("/api/delPerfil",{nombre:perfiles[id].nombre}).then((res)=>{

            if(res.data=="ok"){
                alert("Se elimino el perfil de forma exitosa")
                perfiles.forEach( (data,index)=>{
                    if(index!=id){
                        temp.push(data);
                    }
                })
        
                setperfiles(temp);
            }
        })

        
        
    }

    return(
        <div className={styles.container}>

            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categorias</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {perfiles.map((val,index)=>{
                        
                        return(
                            <tr key={index}>
                                
                                <td>{val.nombre}</td>
                                <td>{val.categorias.map((val,index)=>{
                                    return(
                                        <p>{val}</p>
                                    )
                                })}</td>
                                <td>
                                    <button id={index}  onClick={del} className={styles.eliminar}>eliminar</button>
                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className={styles.add}>


                    <article>
                        <button disabled>Nombre:</button>
                        <input type="text" value={nombre}  onChange={(e)=>{setnombre(e.target.value)}}/>
                    </article>
                    
                    <h4>Categorias:</h4>
                    {categorias.map((val,index)=>{

                        return(
                            <div className={styles.op} key={index}>
                                <label className={styles.sel}> <input type="checkbox" value={val} onChange={HandleChange}/>{val}</label>
                             </div>
                        )
                    })}
                    <button className={styles.crear} onClick={Crear}>Crear</button>


            </div>

        </div>
    )

}