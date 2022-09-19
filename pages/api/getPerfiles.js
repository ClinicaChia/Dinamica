const { MongoClient } = require("mongodb");


export default async function handler(req, res) {
  
  
  
  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const usuarios = database.collection('perfiles');
  let query = await usuarios.find().toArray();

  setTimeout(() => {client.close()}, 1500);
  
res.status(200).json(query);
}