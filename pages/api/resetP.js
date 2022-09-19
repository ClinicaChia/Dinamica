const { MongoClient } = require("mongodb");


export default async function handler(req, res) {
  
  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const usuarios = database.collection('usuarios');
  let query=await usuarios.updateOne({user:req.body.user},
    { $set: { password : "Clinica2030*" } }
    );
   await  client.close();
res.status(200).json("ok");
}