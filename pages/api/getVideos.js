const { MongoClient } = require("mongodb");


export default async function handler(req, res) {

  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');

  const videos = database.collection('videos');

  const query= await videos.find().toArray();

  const data= await query.map((val)=>{return {nombre: val.nombre,categoria:val.categoria}});
  
 await  client.close();
res.status(200).json(data);
}