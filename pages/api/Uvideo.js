
import busboy from 'busboy';
import fs from 'fs';

export const config = {
  api:{
    bodyParser: false,
  }
}

export default async function handler(req, res) {


 const bb= busboy({headers: req.headers});


 bb.on('file',(_, file, info)=>{
    const fileName=info.filename;
    const filePath= `public/videos/${fileName}`;


    const stream= fs.createWriteStream(filePath);

    file.pipe(stream);
 })



 await req.pipe(bb);




 res.status(200).json("ok");
}




