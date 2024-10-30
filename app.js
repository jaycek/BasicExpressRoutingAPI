const express = require('express')
const path = require('path')
const productRouter = require('./routes/productRoutes')

const app= express()

app.use(express.json())
app.use('/products',productRouter)

app.get('/',(req,res)=>{
    // res.send("Hello from server")
    res.sendFile(path.join(__dirname,"/index.html"))
})


app.listen(3000,()=>{
    console.log(`Server started..`)
})