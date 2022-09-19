
const { MongoClient } = require("mongodb");


const Procesador = (data,perfiles,perfilesG)=>{

  const obj= {}
  let puntajeG=0;
  let c = 0;
  let i= 0;
  let ac=0;

  perfiles.forEach((perfil)=>{

    let categorias = perfilesG.filter( val => val.nombre==perfil)[0].categorias ;

    data.forEach((videos,val)=>{

      if(categorias.find(el=>el==videos.categoria)){
        ac+=videos.puntaje/videos.intentos;
        c++;
      }
      
    })
    obj[perfil]=parseFloat((ac/c).toPrecision(2));
    puntajeG+=obj[perfil] ;
    ac=0;
    i++;
  })
  obj.global = parseFloat((puntajeG/i).toPrecision(2));

 //(puntajeG /c) .toFixed(2)(puntajeG /c) .toFixed(2)
  return  obj; 


}

export default async function handler(req, res) {

  const {user,video}={user:"camilin",video:"pruebaCV22"};
  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const usuarios = database.collection('usuarios');
  const perfiles = database.collection("perfiles");


  let query = await usuarios.findOne({user:user});

  let data= query.puntajes;

  const perU= query.perfiles;

  query = await perfiles.find({}).toArray();
 

  //hacer el fetch para que se actualize la base de datos con el nuevo intento y despues lo que tengo


  const NewPG=Procesador(data,perU,query);

  console.log(NewPG);

    await usuarios.updateOne({user:user},
          
    {
      $set:{ "puntajeG": NewPG
      }
    }
  )

  res.status(200).json("ok");
}




