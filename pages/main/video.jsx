import React,{useState,useEffect} from 'react';
import Nav from '../../components/navbar';
import styles from '../../styles/video.module.css';
import Video from '../../components/video_contanier';
import axios from 'axios';


export default function VideoM({videoN}){

    const [nombre, setNombre] = useState("");
    const [data, setData] = useState([]);
    const user = localStorage.getItem('user');
    useEffect(() => {
        
        const dat=localStorage.getItem('nombre');
        axios.post("/api/getdataVideo", {name:videoN}).then(res=>{
        
            setData(res.data.preguntas);
        })
        setNombre(dat);
    }, []);

    return(
        
        <div className={styles.container}>

            <Nav nombre={nombre}/>

            <h1>{videoN}</h1>

            <Video nombre={videoN} user={user} preguntas={data}/>

        </div>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
   
    return { props: { videoN:context.query.nombre}  }
  }