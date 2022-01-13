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
    console.log('dfgdfg',body)
        const users = getUsers();
        users.find(user => {
            if (user.id === body.id) {
                throw Error('user all ready exist')
            }
        });
        // const [id,name,cash,credit]=body
        const newUser = {
            id:body.id,
            first:body.first,
            last:body.last,
            cash:body.cash,
            credit:body.credit
        }
        users.push(newUser)
        saveUsers(users)
        return stringToJson("new-client", newUser)
    // }catch (e) {
    //    return e.message
    // }
}

//Delete

const deleteUser=(id)=> {
    const users = getUsers();
    const updatedUsers = users.filter(user=>{
        return user.id!==id
    })
    if( users.length===updatedUsers.length ) {
        throw Error('user not found')
    }
    saveUsers(updatedUsers)
    return JSON.stringify(users)
}
//withdraw

//deposit
const deposit=(id, amount) => {

    const users = getUsers();
    if(+amount < 0){
        throw Error('only a positive amount is  allowed')
    }

    users.find(user=>{
       if(user.id===id){
           user.cash += +amount
       }
    })
    saveUsers(users)
    return JSON.stringify(users)
}

//transfer


module.exports ={
    getUsers,
    addUser,
    deleteUser,
    deposit
};