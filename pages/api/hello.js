// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const ldap = require('ldapjs');


export default async function handler(req, ress) {

  var name="qwewq";
  const opts = {
    filter: 'sAMAccountName=juansc',
    scope: 'sub',
    attributes: ['sn', 'cn','sAMAccountName','password']
  };


const client = await ldap.createClient({
  url: 'ldap://173.16.10.105',
  reconnect: true
});

//"CN=Ing. Juan Camilo Sandoval Cabrera,OU=Sistemas,OU=Usuarios,OU=PfSenseOU,DC=clinicachia,DC=loc
//
   client.bind("  cn=administrador,cn=users,dc=clinicachia,dc=loc", "Vu3-brEt", (err) => {

    name="";
    
    if (!err) {

      

      client.search('OU=Usuarios,OU=PfSenseOU,DC=clinicachia,DC=loc', opts, (err, res) => {

        res.on('searchEntry', (entry) => {

          const Obj = JSON.stringify(entry.object);

          ('aqui estamos haciendo una prueba');

          name = entry.object.cn;

        });


        res.on('end', (result) => {
          ('status: ' + result.status);
          ress.status(200).json(name);
          
        });

      });

    }
  })




}




