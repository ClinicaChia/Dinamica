import lap from 'ldapjs';
import { createClient } from 'ldapjs';
import LDAPMessage from 'ldapjs/lib/messages/message';

const client = createClient ( {
    url:'ldap//173.16.10.105:10389'
})

client.bind( "cn=administrador,cn=users,dc=clinicachia,dc=loc","Vu3-brEt", (err)=>{

    err ? ("error:"+err) : ("Lo logramos");
   
})

