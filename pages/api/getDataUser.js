const { MongoClient } = require("mongodb");


export default async function handler(req, res) {
  
  
  const user=req.body.user;
  const client = new MongoClient(process.env.uri);
  await client.connect();
  const database = client.db('capacitaciones');
  const usuarios = database.collection('usuarios');
  const perfiles = database.collection('perfiles');

 let query= await usuarios.find({}).sort({"puntajeG":-1}).toArray();

  let puesto=0;
  let u={};

  query.forEach( (el,index)=>{
    if(el.user==user){
        u=el;
        puesto=index+1;
    }
  })

u.puesto=puesto;
console.log(user);
let temp = u.perfiles.map((val)=>{return {nombre:val}});

query = await perfiles.find({$or: temp}).toArray();

temp=[]

query.forEach( (el,index)=>{

  temp=temp.concat(el.categorias);

})


temp = [...new Set(temp)];



client.close();


res.status(200).json({data:u,categorias:temp});
}