const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
    const nombre=req.body.nombre;
    const client = new MongoClient(process.env.uri);
    await client.connect();
    const database = client.db('capacitaciones');
    const videos = database.collection('videos');
    const usuarios = database.collection('usuarios');

    await videos.deleteOne({nombre: nombre});
    
    await usuarios.updateMany({},
        {
          "$pull": {
            "puntajes": {
              "nombre": nombre
            }
          }
        })
        setTimeout(() => {client.close()}, 1500);
  res.status(200).json("holi");
  }