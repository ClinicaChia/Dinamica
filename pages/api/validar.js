const { MongoClient } = require("mongodb");


export default async function handler(req, res) {
  
  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const usuarios = database.collection('usuarios');
  let query = await usuarios.findOne({
    user:req.body.data.user,
    password:req.body.data.password
  });

  


 await  client.close();
res.status(200).json(query);
}