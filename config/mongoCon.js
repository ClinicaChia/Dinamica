const { MongoClient } = require("mongodb");




 async function con(){

    const client = new MongoClient(process.env.uri);
    await client.connect();
    const database = client.db('capacitaciones');
    const usuarios = database.collection('usuarios');
    const videos = database.collection('videos');

    return {usuarios, videos};
}



export default con();


