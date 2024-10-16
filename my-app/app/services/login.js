import axios from 'axios';

async function login() {
    const { name, value } = await axios.post('http://localhost:8080/login', {
        email: 'ksalas0022@mymail.lausd.net',
        password: 'Thisismynewpassword',
    }).data;

    console.log(name, value);
    return {name, value};
}

export {
    login
}