import React,{useState,useEffect} from 'react';
import styles from '../styles/admin.module.css';
import Modal from '../components/modal';
import { useForm } from "react-hook-form";
import Videos from "../components/videosT";
import Usuarios from "../components/tablaU";
import CategoriasC from "../components/CategoriasM";
import Perfiles from "../components/Perfiles";

const axios = require('axios');
 

export default function Admin({u,c,videos,perfiles}){

    const [ventana, setVentna] = useState(0);
    const [listaV, setlistV] = useState(videos);
    const [categoriaF, setCatF] = useState(c[0]);
    const [categorias, setcategorias] = useState(c);
    const [users, setusers] = useState(u);


    const handleClick = (e)=>{

        const id= parseInt(e.target.id);

        setVentna(id);
    }

    //Funciones que se van al componente



    return (

        <div>

            <nav className={styles.navbar}>

                <h3 onClick={handleClick} className={styles.nombre}>Panel de adminstrador</h3>

                <ul className={styles.menu}>

                    <li className={styles.navItem}>
                        <a  id='0' onClick={handleClick} className={ventana==0?styles.navLink:styles.navLinkI}>Videos</a>
                    </li>
                    <li className={styles.navItem}>
                        <a id='1' onClick={handleClick} className={ventana==1?styles.navLink:styles.navLinkI}>Usuarios</a>
                    </li>
                    <li className={styles.navItem}>
                        <a id='2' onClick={handleClick} className={ventana==2?styles.navLink:styles.navLinkI}>Categorias</a>
                    </li>
                    <li className={styles.navItem}>
                        <a id='3'  onClick={handleClick} className={ventana==3?styles.navLink:styles.navLinkI}>Perfiles</a>
                    </li>
                </ul>


            </nav>


        {ventana==0 && <Videos  
        listaV={listaV}   setlistV={setlistV}  
        categoriaF={categoriaF} setCatF={setCatF}
        categorias={categorias} setcategorias={setcategorias}   />}

        
        {ventana==1 && <Usuarios  users={users} setusers={setusers}/>}

        
        {ventana==2 && <CategoriasC categorias={categorias}  setcategorias={ setcategorias} listaV={listaV} setlistV={setlistV} />}
            
            
        {ventana==3 && <Perfiles  categorias={categorias} perfilesA={perfiles} />}
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
    const perfiles = await (await fetch(process.env.URL+"/api/getPerfiles")).json();
    // Pass data to the page via props
    return { props: { u:users,c:categorias, videos,perfiles} }
  }