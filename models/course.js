const { text } = require('body-parser');
const mongoose=require('mongoose')

const CourseSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  gender:{
      type:String,
      require:true,
  },
  date:{
      type:String,
      require:true,
  },
  address:{
      type:String,
      require:true,
  },
  college:{
      type:String,
      require:true,
  },
  course:{
    type:String,
     required:true
  },
  branch:{
      type:String,
      require:true,
  },
  user_id:{
    type:String,
    required:true
  },
  Comment:{
    type:String,
    default:"pending"
  },
  status:{
    type:String,
    default:"pending"
  }
},
{timestamps:true}
);
const CourseModel=mongoose.model("courselogin",CourseSchema)

module.exports=CourseModel