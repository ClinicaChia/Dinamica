const { MongoClient } = require("mongodb");
//queda faltando cuando este los videos se eliminen los videos
//y los usuarios y obviamente las categorias
async function actualizarN(db,cat){

    const categorias=db.collection('categorias');

    await categorias.insertOne({categoria:cat});
    

}

async function actualizarE(db,cat){

    const categorias=db.collection('categorias');
    await categorias.deleteOne({categoria: cat});
    //eliminar los videos que tengan eso
    const videos=db.collection('videos');
    await videos.deleteMany({categoria:cat});
    const usuarios = db.collection('usuarios');
    await usuarios.updateMany({},
        {
          "$pull": {
            "puntajes": {
              "categoria": cat
            }
          }
        })
    //eliminar los puntajes de los usuarios

}

export default async function handler(req, res) {
  
    const action= req.body.acc;
  
    const client = new MongoClient(process.env.uri);
    await client.connect();
    const database = client.db('capacitaciones');
    
    await action==1?actualizarN(database,req.body.categoria):actualizarE(database,req.body.categoria);

    
    
  res.status(200).json("ok");

  setTimeout(() => {client.close()}, 1500);
  }