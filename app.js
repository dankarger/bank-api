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
//
// const rootRouter = require("./routes");
// const path = require("path");
// const userRouter = require("./routes/user.routers");


app.set('view engine', 'hbs')
// import * as path from "path";
const path = require('path')
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.get('',(req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
       return  res.status(200).send(JSON.stringify(getUsers()));
        // res.status(200).send(getUsers()).setHeader({ headers: {
        //         'Content-Type': 'application/json'
        //     }});
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
});

app.get('/users',(req, res) => {
    try {
        res.status(200).render('index',{users:getUsers(),title:"Bank:All Users"});
    } catch (e) {
        res.status(400).send({ error: e.message })
    }
});

app.get('/user',(req, res) => {

    try {
        res.status(200).render('userDetail',{user:getUserDetail(req.query.id),title:"User Detail"});
    } catch (e) {
        res.status(400).send({ error: e.message })
    }

});

app.post('/users',(req, res) => {
    console.log(req.query)
    try{
        console.log(req.body)
        res.status(201).render('userDetail',{user:addUser(req.body),title:"Added User:"})
    }catch(e){
        res.status(400).send({ error: e.message })
    }
})

app.delete('/users',(req, res) => {
    try {
        res.status(200).render('index',{users:deleteUser(req.query.id),title:"Users"})
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/deposit',(req, res) => {
    try {
        // const[{id, amount}] = req.query
        res.status(200).render('userDetail',{user:deposit(req.query.id, req.query.amount),title:`Deposit ${req.query.amount} to`})
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/withdraw',(req, res) => {
    try {
        // const[{id, amount}] = req.query
        res.status(200).render('userDetail',{user:withdraw(req.query.id, req.query.amount),title:`Withdraw ${req.query.amount} from user:`})
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/add-credit',(req, res) => {
    try {
        // const[{id, amount}] = req.query
        res.status(200).render('userDetail',{user:addCredit(req.query.id, req.query.amount),title:`Add ${req.query.amount} credit to user:`})
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.put('/users/transfer',(req, res) => {
    try {

        res.status(200).render('index',{users:transfer(req.query.idGiver,req.query.idReceiver, req.query.amount),title:`Transfer ${req.query.amount} from${req.query.idGiver} to ${req.query.idReceiver}`})
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

app.get('/users/filter',(req, res) => {
    try {
        res.status(200).render('index',{users:filterUsers(req.query.type, req.query.amount),title:`Filtered users: ${req.query.type} ${req.query.amount}`})
    }catch (e) {
        res.status(400).send({ error: e.message })
    }
})

const PORT = 3000;

app.listen(PORT,() => {
    console.log(`listening on port ${PORT}`)
});