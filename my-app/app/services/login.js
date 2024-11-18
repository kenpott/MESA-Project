import axios from 'axios';

async function login(email, password) {
    const result = await axios.post('http://192.168.1.95:8000/login', {
        email: email,
        password: password,
    });
    const {name, value} = result.data
    console.log(name, value);
    return {name, value};
}

export {
    login
}