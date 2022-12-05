const express = require ('express')

const app= express()
const cors = require('cors')
const router=require('../service/router/router')
const bodyParser = require('body-parser')
require('dotenv').config()
const fs = require('fs')

app.use(cors())
app.use(bodyParser.json())
app.use((bodyParser.urlencoded({extended:true})))


function run(req,res){
    app.use('/',router)
        app.listen(process.env.port,()=>{
            console.log(`port runnig on server ${process.env.port}`)
        })
}
run()