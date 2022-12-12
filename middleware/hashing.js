const bcrypt = require('bcrypt');


function hashing(str){

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(str, salt);
    return hash

}

function dehashing(str1, str2){

    const resp = bcrypt.compareSync(str1, str2);
    return resp

}

module.exports = { hashing ,  dehashing }