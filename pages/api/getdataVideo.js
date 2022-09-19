const { MongoClient } = require("mongodb");

export default async function handler(req, res) {

    const videoN=req.body.name;
    const client = new MongoClient(process.env.uri);
    await client.connect();
    const database = client.db('capacitaciones');
    const videos = database.collection('videos');
    let query = await videos.findOne({nombre: videoN});

    setTimeout(() => {client.close()}, 1500);

    res.status(200).json(query);
}