import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

async function login(email, password) {
    const result = await axios.post('http://192.168.1.53:8000/login', {
        email: email,
        password: password,
    });
    const { name, value } = result.data;
    console.log(name, value);
    const existingCookie = await SecureStore.getItemAsync('cookie');
    
    if (existingCookie) {
        await SecureStore.setItemAsync('cookie', `${name}=${value}`);
    }
    return { name, value };
}

export {
    login
}
