const { MongoClient } = require("mongodb");


export default async function handler(req, res) {
  
  const {data}=req.body;
  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const perfil = database.collection('perfiles');
  //user:1,,servicio:0,password:0,servicio:0
  await perfil.insertOne(data);

  setTimeout(() => {client.close()}, 1500);
res.status(200).json("ok");
}