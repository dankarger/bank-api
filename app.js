const express = require('express');
const app =express();
const {getUsers,addUser } = require('./utils')

app.use(express.json());

app.get('/users',(req,res)=>{
    try {
        res.status(200).send(getUsers());
    } catch (e) {
        res.status(400).send({ error: e.message })
    }

});

app.post('/users',(req,res)=>{
    try{
        console.log(req)
        res.status(201).send(addUser(req.body))
    }catch(e){
        res.status(400).send({ error: e.message })
    }
})




const PORT = 3000;

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
});