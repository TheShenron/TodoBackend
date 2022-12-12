
function tokenInHeader(req,res , next){

    console.log("Inside Herader")

    next()

}

module.exports = { tokenInHeader }