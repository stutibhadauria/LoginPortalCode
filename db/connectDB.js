const mongoose=require('mongoose')

const url="mongodb+srv://stutibhadauria28:stuti12345@cluster0.ydgl4yz.mongodb.net/?retryWrites=true&w=majority"
const connectDB =()=>{
    return mongoose.connect(url)
    .then(()=>{
        console.log('connection successfully !')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDB
