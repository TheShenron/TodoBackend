var jwt = require('jsonwebtoken');
require('dotenv').config()



function genToken(obj){

    var token = jwt.sign( obj , process.env.TOKEN);
    return token

}


function copmToken(token ){

    const resp = jwt.verify(token , process.env.TOKEN)
    return resp

}


module.exports = { genToken , copmToken }