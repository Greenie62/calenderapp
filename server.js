const express=require('express');
const mongoose=require('mongoose');
const routes=require('./routes')

const app=express()
const PORT=process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
app.use(routes)

var MONGODDB_URI=process.env.MONGODDB_URI || "mongodb://justin:vincen72181@ds239858.mlab.com:39858/calenderdb"

mongoose.connect(MONGODDB_URI,
    { useNewUrlParser: true })



app.listen(PORT,()=>console.log(`Logged onto port ${PORT}`))