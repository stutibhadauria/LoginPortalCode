const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
       type:String,
       default:'user'   
    },
    image:    
    {
      public_id: {
        type: String,
        
    },
    url:{
      type:String
    }
  }
},{timestamps:true})

const adminModel=mongoose.model('admin',adminSchema)
module.exports=adminModel