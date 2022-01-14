const express = require('express');
const app =express();
const { getUsers,
        addUser,
        deleteUser,
        deposit,
        withdraw,
        addCredit,
        transfer,
        filterUsers,
        getUserDetail, } = require('./utils')

app.set('view engine', 'hbs')
// import * as path from "path";
const path = require('path')

app.use(express.static(path.join(__dirname, '/public')));


app.use(express.json());

app.get('/',(req, res) => {
    try {
        res.status(200).render('index',{users:getUsers()});
        // res.status(200).send(getUsers()).setHeader({ headers: {
        //         'Content-Type': 'application/json'
        //     }});
    } catch (e) {
        res.status(400).send({ error: e.message })
    }

});



app.get('/users',(req, res) => {
    try {
        res.status(200).render('index',{users:getUsers()});
        // res.status(200).send(getUsers()).setHeader({ headers: {
        //         'Content-Type': 'application/json'
        //     }});
    } catch (e) {
        res.status(400).send({ error: e.message })
    }

});

app.get('/user',(req, res) => {
    try {
        res.status(200).render('userDetail',{user:getUserDetail(req.query.id)});
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

app.put('/users/transfer',(req, res) => {
    try {

        res.status(200).send(transfer(req.query.idGiver,req.query.idReceiver, req.query.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.get('/users/filter',(req, res) => {
    try {
        res.status(200).send(filterUsers(req.query.type, req.query.amount))
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
});