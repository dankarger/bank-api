const express = require('express');
const app =express();
const {getUsers, addUser, deleteUser, deposit, withdraw, addCredit } = require('./utils')

app.use(express.json());

app.get('/users',(req, res) => {
    try {
        res.status(200).send(getUsers());
    } catch (e) {
        res.status(400).send({ error: e.message })
    }

});

app.post('/users',(req, res) => {
    try{
        console.log('params', req.query)
        console.log('params', req.body)
        res.status(201).send(addUser(req.query))
    }catch(e){
        res.status(400).send({ error: e.message })
    }
})

app.delete('/users',(req, res) => {
    try {
        res.status(200).send(deleteUser(req.query.id))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/deposit',(req, res) => {
    try {
        // const[{id, amount}] = req.query
        res.status(200).send(deposit(req.query.id, req.query.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/withdraw',(req, res) => {
    try {
        // const[{id, amount}] = req.query
        res.status(200).send(withdraw(req.query.id, req.query.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/add-credit',(req, res) => {
    try {
        // const[{id, amount}] = req.query
        res.status(200).send(addCredit(req.query.id, req.query.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})
const PORT = 3000;

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
});