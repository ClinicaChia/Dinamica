import React,{useState,useEffect} from 'react';
import Nav from '../../components/navbar';
import styles from '../../styles/dash.module.css';


export default function Dashboard({users}){
  
    const [nombre, setNombre] = useState("");
    const [perfiles, setperfiles] = useState([]);
    const [Umostrar, setUmostrar] = useState([]);
    const [perfilA, setperfilA] = useState(null); 

    useEffect(
        ()=>{
            let fill = users.filter(user => user.perfiles.find(perf => perf==perfilA)  );
            console.log(fill);
            fill = fill.sort(((a, b) => b.puntajeG[perfilA] - a.puntajeG[perfilA]));

            fill = fill.map((u,index)=>{
                u.puesto = index+1;
                return u;
            })
            setUmostrar(fill);
        }
    ,[perfilA])

    useEffect(() => {
        
        const dat=localStorage.getItem('nombre');
        const dat2=localStorage.getItem('user');
        setNombre(dat);
        const UA= users.find(user => user.user==dat2);
        console.log(UA);
        setperfiles(UA.perfiles);

    }, []);


    return(
       <>
            <Nav nombre={nombre}/>
            <div className={styles.container}>

                <h3>En el dado caso que usted cuente con mas de un perfil, se comparara su puntaje acumulado como puntaje global mas no el puntaje parcial</h3>
                <input type="text" placeholder='buscar...'/>

                <select value={perfilA} onChange={(e)=>{setperfilA(e.target.value)}}>
                <option value={null}>-</option>
                    {perfiles.map(
                        (perfil,index)=>{
                            return( <option value={perfil}>{perfil}</option> )
                        }
                        )}


                </select>

                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Usuario</th>
                            <th>Servicio</th>
                            <th>puntuación</th>
                            <th>Puesto</th>
                        </tr>
                    </thead>

                    <tbody>

                        {Umostrar.map((user,index)=>{

                            return(
                                <tr key={index}>
                                    <td>{user.nombre}</td>
                                    <td className={styles.puntuacion}>{user.user}</td>
                                    <td className={styles.puesto}>{user.servicio}</td>
                                    <td className={styles.puesto}>{user.puntajeG[perfilA]}</td>
                                    <td className={styles.puesto}>{user.puesto}</td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

       </>
        


    )
}


export async function getServerSideProps() {
    // Fetch data from external API
   let res = await fetch(process.env.URL+"/api/getUsersData");
   const users = await res.json();
   
  
    // Pass data to the page via props
    return { props: { users } }
  }