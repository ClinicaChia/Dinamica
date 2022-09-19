const { MongoClient } = require("mongodb");

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

export default async function handler(req, res) {

  const {data}=req.body;
  let temp=data.nombre;
  temp=temp.slice(0,temp.length-4);
  data.nombre=temp;

  const client = new MongoClient(process.env.uri);

  await client.connect();

  const database = client.db('capacitaciones');

  const usuarios = database.collection('usuarios');

  const perfiles = database.collection('perfiles');


  let query = await perfiles.find({categorias: data.categoria}).toArray();

  const perf = await query.map( (val,index)=> { return({ perfiles: val.nombre} ) } );

  usuarios.updateMany({ $or: perf},
    
    {$push: {puntajes:{ 
      
        nombre: data.nombre,
        categoria: data.categoria,
        puntaje: 0,
        intentos:  0
      }}}

    )

  const videos = database.collection('videos');
  await videos.insertOne({nombre: data.nombre, categoria: data.categoria,preguntas:data.preguntas});
  


  setTimeout(() => {client.close()}, 1500);
 res.status(200).json("ok");

}