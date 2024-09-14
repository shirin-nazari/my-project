const userList = document.querySelector('#user-list');
const form = document.querySelector('#form-data');

// class add user
class User {
    constructor(name, email, file, id) {
        this.name = name;
        this.email = email;
        this.file = file;
        // this.id = id
    }
}
// get element user
const renderUser = async () => {
    const res = await fetch('http://localhost:3000/user/');
    const rowUsers = await res.json()
    console.log(rowUsers);
    rowUsers.map((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td scope="row">${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.email}</td>
        <td>${item.file}</td>
        <td><button href="#" class="btn btn-danger btn-sm delete" id=${item.id} >Delete</button></td>
        `
        userList.appendChild(row)
    })
    const deleteB = document.querySelectorAll('.delete');
    deleteB.forEach(btn => btn.addEventListener('click', (e) => {
        // e.target.parentElement.parentElement.remove()
        e.preventDefault();
        deleteBtn(e)
    }))
}


// get element from form 
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = new User(form.nameUser.value, form.email.value, form.file.files[0].name);
    await fetch('http://localhost:3000/user/', {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': "application/json"
        }
    });
    // empty input
    form.nameUser.value = '';
    form.email.value = '';
    form.file = ''
})

window.addEventListener('DOMContentLoaded', renderUser())

// delete btn
const deleteBtn = async (e) => {
    const id = e.target.id;
    const res = await fetch(`http://localhost:3000/user/${id}`, {
        method: "DELETE"
    })
}