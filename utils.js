const fs = require('fs')

const getUsers =() => {
    try {
        const users = fs.readFileSync('./db/users.json');
        const userJSON = users.toString();
        return JSON.parse(userJSON)
    } catch (e) {
        return [];
    }
};

const saveUsers = (users)=> {
    const dataJson = JSON.stringify(users)
    fs.writeFileSync('./db/users.json',dataJson)
}

const stringToJson = (message,string)=> {
    return JSON.stringify({[message]: string})
}

const addUser = (body) =>{
        const users = getUsers();
         if(!validateInput('string',body.first))throw Error('Name input must be type of string ')
         if(!validateInput('string',body.last))throw Error('Name input must be type of string2 ')
         if(!validateInput('number',+body.cash))throw Error('cash input must be type of number ')
         if(!validateInput('number',+body.credit))throw Error('credit input must be type of number ')

    users.find(user => {
            if (user.id === body.id) {
                throw Error('user all ready exist')
            }
        });
        const newUser = {
            id:body.id,
            first:body.first,
            last:body.last,
            cash:body.cash,
            credit:body.credit
        }
        users.push(newUser)
        saveUsers(users)
        return newUser
}

const deleteUser= (id) => {
    const users = getUsers();
    const updatedUsers = users.filter(user => {
        return user.id!==id
    })
    if( users.length===updatedUsers.length ) {
        throw Error('user not found')
    }
    saveUsers(updatedUsers)
    return JSON.stringify(users)
}

const withdraw= (id, amount) => {
    const users = getUsers();
    if(+amount < 0) {
        throw Error('only a positive amount is  allowed')
    }
    const user= users.find(user=>{
        if(user.id===id){
            if((user.credit+user.cash) < amount) {
                throw Error('Not enough credits in the account')
            }
            user.cash>amount ?user.cash -= +amount: user.credit -= +amount
            return user
        }
    })
    if(!user){
        throw Error('User not found')
    }
    saveUsers(users)
    return JSON.stringify(user)
}

const deposit=(id, amount) => {
    const users = getUsers();
    if(+amount < 0){
        throw Error('only a positive amount is  allowed')
    }
    const user = users.find(user=>{
       if(user.id===id){
           user.cash += +amount
           return user
       }
    })
    if(!user){
        throw Error('User not found')
    }
    saveUsers(users)
    return JSON.stringify(user)
}

const addCredit = (id, credit) => {
    const users=getUsers();
    if( +credit <=0) {
        throw Error('Amount need to be higher than 0')
    }
   const user = users.find(user=>{
        if(user.id===id) {
            user.credit += +credit
            return user
        }
    })
    if(!user){
        throw Error('User not found')
    }
    saveUsers(users)
    return JSON.stringify(user)

}

const transfer = (idGiver, idReceiver , amount)=> {
    if(+amount <= 0 ) {
        throw Error(' Amount need to be higher than 0')
    }
    const users = getUsers();
    const giver = users.find(user=> {
        if(user.id===idGiver) {
            if((user.cash + user.credit) < amount) {
                throw Error('Not enough funds in the account')
            }
            user.cash>0 ?user.cash -= +amount: user.credit -= +amount
            return user
        }
    })
    if(!giver) {
        throw Error('The giver user not found');
    }
    const receiver = users.find(user=> {
        if(user.id===idReceiver) {
            user.cash += +amount
            return user
        }
    })
    if(!receiver) {
        throw Error('The receiver user not found');
    }
    saveUsers(users);
    return JSON.stringify({Giver: giver,receiver:receiver})
}

const getUserDetail=(id) => {
    const users =getUsers();
    const user = users.find(user => {
        if(user.id===id) {
            return user
        }
    })
    if(!user) {
        throw Error('User not found')
    }
    return user
}

const filterUsers = (type , amount) => {
    const users=getUsers();
    const filteredUsers = type==='above'? users.filter( user => {
        return user.cash > +amount
    }): users.filter(user=> {
        return user.cash < +amount
    })
    if(filteredUsers.length===0) {
        throw Error('No users found matching ')
    }
    return JSON.stringify(filteredUsers)
}

const validateInput= (type, input)=> {
    // console.log(typeof input,input)
    let isnum = /^\d+$/.test(input);
    // console.log('t',isnum)
    if(type==='number') return isnumif
    if(type==='string') return isnum
    return typeof input===type

}

module.exports ={
    getUsers,
    addUser,
    deleteUser,
    deposit,
    withdraw,
    addCredit,
    transfer,
    getUserDetail,
    filterUsers
};