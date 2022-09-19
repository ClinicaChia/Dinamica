const { MongoClient } = require("mongodb");


export default async function handler(req, res) {

  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const categorias = database.collection('categorias');
  //user:1,,servicio:0,password:0,servicio:0
  let query = await categorias.find().toArray();
    query=await query.map((val)=>{return val.categoria})

    setTimeout(() => {client.close()}, 1500);
res.status(200).json(query);
}