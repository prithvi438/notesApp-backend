//importing of the packages..
const mongoose = require('mongoose')

//connection string
const DB = 'mongodb+srv://rajsinghp87:password8210576957@cluster0.dyosgnt.mongodb.net/firstMERNproject?retryWrites=true&w=majority'


//Function for connecting the Mongo Db Atlas.

const connectToMongo = ()=>{
    mongoose.connect(DB).then(() =>{
        console.log('Connection sucessful.')
      }).catch((err)=>{    
        console.log(err)
      })
}


//Exporting of the function 
module.exports = connectToMongo;