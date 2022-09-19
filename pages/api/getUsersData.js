const { MongoClient } = require("mongodb");


export default async function handler(req, res) {
  
  
  
  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const usuarios = database.collection('usuarios');
  //user:1,,servicio:0,password:0,servicio:0
  let query = await usuarios.find().sort({puntajeG:-1}).toArray();


  setTimeout(() => {client.close()}, 1500);
res.status(200).json(query);
}