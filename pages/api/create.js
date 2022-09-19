const { MongoClient } = require("mongodb");


export default async function handler(req, res) {
  
  
  
  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const usuarios = database.collection('usuarios');
  const videos = database.collection('videos');
  let query = await usuarios.findOne({user:req.body.data.user});
  //buscar si esta el usuario antes de insertar
  //query = await usuarios.insertOne(req.body.data);
  const msm= query? "...": "ok";

  if(!query) {
    
    const obj=req.body.data;
    const q2= await videos.find().toArray();
    obj.puntajes=q2.map( (val,index)=>{
        return({
          nombre:val.nombre,
          intentos:0,
          puntaje:0,
          categoria: val.categoria
        })
    })

    obj.puntajeG={};


    await usuarios.insertOne(obj);
  }
  else{
  
  }
  
setTimeout(() => {client.close()}, 1500);
res.status(200).json(msm);
}