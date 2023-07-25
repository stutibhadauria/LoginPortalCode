const express = require('express')
const app =express()
const port =3100
const connectDB=require('./db/connectDB')
const bodyparser=require('body-parser')
const fileUpload=require('express-fileupload')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
var session =require('express-session')

var flash=require('connect-flash')
app.use(fileUpload({useTempFiles:true}))
const router=require('./routes/web')



app.use(session({
    secret:'secret',
    cookie:{maxAge:60000},
    resave:false,
    saveUninitialized:false,
}))

app.use(flash());

//body-parser
app.use(express.urlencoded({extended:false}))

//setup ejs
app.set('view engine','ejs')

//link public folder
app.use(express.static('public'))

//db connection
connectDB();

//web routing link
const web=require('./routes/web.js')

//router load
app.use('/',web)

//server create
app.listen(port,()=>{
    console.log(`server started on localhost:${port}`)
})