import React,{useState,useEffect} from 'react';
import styles from '../styles/categorias.module.css';
const axios = require('axios');

export default function Categorias({categorias, setcategorias,listaV,setlistV}){

    const [categoria, setcategoria] = useState("");


    const del = async (e)=>{
        const id=parseInt(e.target.id);
        const temp=[];
        categorias.forEach((el,index)=>{

            if(index!=id){
                temp.push(el);
            }

        })
        const res=await axios.post("/api/updateUsers",
        {acc:0,categoria:categorias[id]});

        if(res.data=="ok"){
            setcategorias(temp);
            temp=[]
            listaV.forEach((el,index)=>{
                if(el.categoria!=categorias[id]){
                    temp.push(el);
                }
            })
            setlistV(temp);
            alert("Categoria eliminada con exito");

        }
        else{
            alert("Ocurrio un error");
        }
        
        
    }
    const Change= (e)=>{
        
        setcategoria(e.target.value);
    }
    const add= async ()=>{

        const res=await axios.post("/api/updateUsers",
        {acc:1,categoria})

        if(res.data=="ok"){
            setcategorias(categorias.concat([categoria]));
            alert("Categoria creada con exito");

        }
        else{
            alert("Ocurrio un error");
        }
        

    }

    return(
        <div className={styles.otros}>


                {categorias.map((vals,index)=>{
                    return(
                    <article key={index}>
                        
                        <input type="text" disabled value={vals}/>
                        <button className={styles.menos} id={index} onClick={del} >-</button>
                    </article>
                    )
                })}

                <article>
                    <input type="text" onChange={Change} value={categoria}/>
                    <button className={styles.mas} onClick={add}>+</button>
                </article>
                
            </div>
    )

}