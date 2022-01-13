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
    fs.writeFileSync('./sb/users.json',dataJson)
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
            first:body.name.first,
            last:body.name.last,
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

//withdraw

//deposit

//transfer


module.exports ={
    getUsers,addUser
};