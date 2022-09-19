import React,{useState,useEffect} from 'react'
import Nav from '../../components/navbar';
import Summary from '../../components/summary';
import Category from '../../components/category';
import axios from 'axios';
import Link from 'next/link';



export default function Main(){

    const [nombre, setNombre] = useState("");
    const [Udata, setUdata] = useState({});
    const [Stadistic,setStadistic] = useState({});
    const [categorias, setcategorias] = useState([]);


    const fill= (userD,categorias)=>{

        const obj={};
        const videos=userD.puntajes;
        let ac=0;
        let temp=0;
        let n=0;
        let catM="";
        let max=0;

        categorias.forEach( (val,index)=>{
            ac=0;
            temp=videos.filter(el=>el.categoria==val);

            temp.forEach( (val)=>{
                ac+=  val.puntaje/val.intentos;
                n+=1;
            })
            obj[val]=parseFloat((ac/n).toFixed(2));
            n=0;
            if(obj[val]>max){
                catM=val;
                max=obj[val];
            }
            
        })
  
        setStadistic({data:obj,mejor:catM});
        
    }

    useEffect( () => {

      
        const GetUser= async (user) =>{
            const res= await axios.post('/api/getDataUser', {user});
            setUdata(res.data.data);
            let temp= res.data.data;
            console.log(temp.puntajeG.global);
            setcategorias(res.data.categorias);
            fill(res.data.data,res.data.categorias);
            
        }

        const dat=localStorage.getItem('nombre');
        const user=localStorage.getItem('user');
        
        setNombre(dat);
        GetUser(user);
    
    }, []);

 

    return(

    <div>
        
        <Nav nombre={nombre}/>

        <Summary pt1={ Udata.puntajeG && Udata.puntajeG.global} pt2={Stadistic.mejor} pt3={Udata.puesto} />

        {categorias && categorias.map((cat,index)=>{
            if(Stadistic.data){
                return(
                    <Category cat={cat} data={Udata.puntajes} puntuacion={ Stadistic.data[cat] }/>
                )
            }
            
            

        })}
        

        

        
    </div>
    )
}



