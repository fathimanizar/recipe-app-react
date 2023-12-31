const express = require('express');
const cors = require('cors');
const cuisineModel = require('./models/cuisineDb');
const recipeModel = require('./models/recipeDb');

const app = new express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

//....................... TO ADD CUISINE..........................
app.post('/addcuisine',async(req,res)=>{
    var data = await new cuisineModel(req.body);
    data.save();
    res.send({status:"Cuisine is added"});
})

//....................... TO VIEW CUISINES..........................
app.get('/viewcuisines',async(req,res)=>{
    var data = await cuisineModel.find();
    res.json(data);
})

// ..................TO DELETE A CUISINE.............................
app.delete('/deletecuisine/:name',async(req,res)=>{
    let name = req.params.name;
    await cuisineModel.deleteOne({"cuisine_name":name})
    res.send({status:"Cuisine is deleted"});
})

// ................TO UPDATE A CUISINE................................
app.put('/updatecuisine/:name',async(req,res)=>{
    let name = req.params.name;
    await cuisineModel.updateOne({"cuisine_name":name},req.body);
    res.send({status:"Movie is updated"});    
})

//..................TO ADD A NEW RECIPE.............................. 
app.post('/addrecipe',async(req,res)=>{
    var data = await new recipeModel(req.body);
    data.save();
    res.send({status:"Recipe is added"});
})

// ..................TO VIEW RECIPES BY CUISINE NAME.............
app.get('/viewrecipes/:name',async(req,res)=>{
    let name = req.params.name;
    var data =  await recipeModel.find({"cuisine_name":name});
    res.json(data); 
}) 

// ...............TO DELETE A RECIPE.......................
app.delete('/deleterecipe/:id',async(req,res)=>{
    let id = req.params.id;
    await recipeModel.findByIdAndDelete(id);
    res.send({status:"Recipe is deleted"});
})

// .............TO UPDATE A RECIPE.......................
app.put('/updaterecipe/:id',async(req,res)=>{
    let id = req.params.id;
    await recipeModel.findByIdAndUpdate(id,req.body);
    res.json({status:"Recipe is updated"});
})

app.listen(3003,()=>{
    console.log("Server is up and running at 3003!!!");
})