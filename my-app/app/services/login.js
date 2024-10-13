import * as WebBrowser from 'expo-web-browser';

async function login() {
    const result = await WebBrowser.openBrowserAsync("https://lms.lausd.net");
    return result;
}

export {
    login
}