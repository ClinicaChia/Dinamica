import React,{useState,useEffect} from 'react';
import styles from '../styles/tablaU.module.css';
const axios = require('axios');

export default function TablaU({users,setusers}){


    const handleClick2 = async (e) => {
        const rutas=["api/del","/api/resetP"]
        const id=parseInt(e.target.id);
        const ac= id>0? 1: 0;
        id=Math.abs(id);
        const res=await axios.post(rutas[ac],{user:users[id-1].user});

        if(res.data=="ok"){
            if(ac){
                
                alert("Contraseña restablecida: Clinica2030*");

            }

            else{
                alert("Usuario eliminado con exito")
                const temp=[];
            users.forEach( (val,index)=>{
                if(id-1!=index){
                    temp.push(val);
                }
            })
            setusers(temp);
            }
      
      
        }
    }

    return(
        <div className={styles.container}>

                <table className={styles.tabla}>
                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Perfiles</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map( (user,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{user.user}</td>
                                        <td>{user.perfiles.map((val)=>{return <p>{val}</p> })}</td>
                                        <td className={styles.botones}>
                                            <button id={-(index+1)} className={styles.eliminar} onClick={handleClick2}>eliminar</button>
                                            <button id={index+1}  className={styles.reiniciar}  onClick={handleClick2}>reinicar clave</button>

                                        </td>
                                    </tr>
                                )
                            } )}
                        </tbody>
                </table>

            </div>
    )

}