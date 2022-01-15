
const deleteUser2= async (id)=>{
    alert(id)
    // const response =await fetch('http://127.0.0.1:3000/users?id='+id)

    // return deleteUser(id)
}
const selectUser=(id) =>{
    console.log(id)
    // fetch('http://127.0.0.1:3000/user',{body:JSON.stringify({"id":id})}).then(res=>{
    //     console.log(res)
    // })
    async function loadNames() {
        const response = await fetch('http://127.0.0.1:3000/user?id='+id);
        console.log(response);
        // logs [{ name: 'Joker'}, { name: 'Batman' }]
        return  response
    }
   const names =  loadNames();
    console.log('name',names)
    alert(names)
}

// const fs=require('fs')
// const axios = require('axios')
// const { getUsers,
//     addUser,
//     deleteUser,
//     deposit,
//     withdraw,
//     addCredit,
//     transfer,
//     filterUsers,
//     getUserDetail, } = require('../../utils')
// import axios from "axios";

// const fs = require('fs')
// alert('hh')
// const selectUser=  (id)=> {
//     console.log('id',id)
//     // const user = await axios.get(`http://127.0.0.1:3000/user?id=${id}`)
//     // console.log('user',user)
// }


//
// const getUsers =() => {
//     try {
//         const users = fs.readFileSync('../../db/users.json');
//         const userJSON = users.toString();
//         return JSON.parse(userJSON)
//     } catch (e) {
//         return [];
//     }
// };

// const deleteUser= (id) => {
//     const users = getUsers();
//     const updatedUsers = users.filter(user => {
//         return user.id!==id
//     })
//     if( users.length===updatedUsers.length ) {
//         throw Error('user not found')
//     }
//     saveUsers(updatedUsers)
//     return JSON.stringify(users)
// }
//
// const saveUsers = (users)=> {
//     const dataJson = JSON.stringify(users)
//     fs.writeFileSync('../../db/users.json',dataJson)
// }
