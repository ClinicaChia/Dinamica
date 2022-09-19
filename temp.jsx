import React,{useState,useEffect} from 'react';
const img = require('../public/LOGO BLANCO.png');
import styles from '../styles/admin.module.css';
import { useForm } from "react-hook-form";
import Modal from '../components/modal';
import { Query } from 'mongoose';

const axios = require('axios');
 

export default function Admin({u,c,videos}){
    
    
    const temp1=c;
    
    
    
    
    const [URL, setURL] = useState("");
    
    
    const [listaV, setlistV] = useState(videos);
    const [file,setFile] = useState();


    useEffect(()=>{(videos)},[])

    

    


    return (
        <div className={styles.container}>
            
            <div className={styles.otros}>


                {categorias.map((vals,index)=>{
                    return(
                    <article key={index}>
                        <button className={styles.perf} id={index} onClick={del} >+</button>
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

            
            {false && <div className={styles.spinner}>
                <div></div>
            </div> }        
        </div>

    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    let res = await fetch(process.env.URL+"/api/getUsers");
    const users = await res.json();
    res = await fetch(process.env.URL+"/api/getCat");
    const categorias = await res.json();
    const videos= await (await fetch(process.env.URL+"/api/getVideos")).json();
    // Pass data to the page via props
    return { props: { u:users,c:categorias, videos} }
  }