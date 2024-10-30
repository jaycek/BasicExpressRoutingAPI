const express = require('express')
const router = express.Router()
const products = require('../products')

const myLogger = function (req, res, next) {
    console.log('LOGGED')
    console.log(req.body)
    next()
  }
router.get('/',myLogger,(req,res)=>{
    // res.send("Inside products")
    try {
        res.status(200).json(products)
        
    } catch (error) {
        res.status(404).json({error:"Products not available"})
    }
})

router.get('/:id',(req,res)=>{
       
    try {
        const productID = parseInt(req.params.id)
        console.log(productID)
        const product=products.find(prod=>prod.id===productID
        )
        console.log(product)
        if(!product){
            res.status(404).json({error:"Product not available"})
        } 
        res.status(200).json(product)
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

router.patch('/:id',(req,res)=>{
    try {
        const productID = parseInt(req.params.id)
        const product=products.find(prod=>prod.id===productID
        )
        if(!product){
            res.status(404).json({error:"Product not available"})
        } 
        product.price=200
        res.status(200).json(product)
        
    } catch (error) {
        res.status(404).json({error:"Products not available"})
    }
})

//Create product
router.post('/',myLogger,(req,res)=>{
    
    try {
        if(! req.body) res.status(400).json({message:"Name and price are required"})
        const {name,price} = req.body
        if(!name || !price) res.status(400).json({message:"Name and price are required"})

        const newProduct={
            id:products.length?products[products.length-1].id+1:1,
            name:name,
            price:price
        }
        products.push(newProduct)
        res.status(201).json({message:"Product added successfully",product:newProduct})
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

//Delete product
router.delete('/:id',(req,res)=>{
     
    try {
        const productID = parseInt(req.params.id)
        console.log(productID)
        const productIndex=products.findIndex(prod=>prod.id===productID
        )
        if(productIndex == -1){
            return res.status(404).json({error:"Product not found"})
        } 
       const deletedProduct= products.splice(productIndex,1)
        res.status(200).json({"message": "Deleted successfully",product:deletedProduct})
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})


module.exports = router

