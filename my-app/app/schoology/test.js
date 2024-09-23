import axios from 'axios';
import { getRandomValues } from 'react-native-get-random-values';
import * as WebBrowser from 'expo-web-browser';
import * as Crypto from 'expo-crypto';

const Key = 'efe5a543948026772946115c316323cd05e443b00';
const Secret = 'e9dc645bf33230645546a37fc9d80348';
const baseUrl = 'https://api.schoology.com/v1/';
const domain = 'https://lms.lausd.net/';

async function getRequestToken(Key, Secret) {
  const oauthTimestamp = Math.floor(Date.now() / 1000);
  const array = new Uint8Array(8); 
  crypto.getRandomValues(array); 
  const oauthNonce = Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join(''); 

  const URL = `${baseUrl}oauth/request_token?oauth_consumer_key=${Key}&oauth_timestamp=${oauthTimestamp}&oauth_signature_method=PLAINTEXT&oauth_version=1.0&oauth_nonce=${oauthNonce}&oauth_signature=${Secret}%26`;

  const response = await axios.get(URL);
  console.log("request_token: " + response.data);
  const params = new URLSearchParams(response.data);
  return {
    oauth_token: params.get('oauth_token'),
    oauth_token_secret: params.get('oauth_token_secret')
  };
}

export async function promptAuthorization() {
  const requestToken = await getRequestToken(Key, Secret);
  console.log("oauth_token: " + requestToken.oauth_token);
  console.log("oauth_token_secret: " + requestToken.oauth_token_secret);

  if (requestToken) {
    const url = `${domain}oauth/authorize?oauth_consumer_key=${Key}&oauth_token=${requestToken.oauth_token}&oauth_token_secret=${requestToken.oauth_token_secret}`;
    console.log(url);
    const result = await WebBrowser.openAuthSessionAsync(url);
    
    if (result.type === "cancel") {
      const array = new Uint8Array(8); 
      crypto.getRandomValues(array); 
      const oauthNonce = Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join(''); 
      const oauthTimestamp = Math.floor(Date.now() / 1000);

      const studentUrl = `${baseUrl}courses/7354453829/assignments?oauth_consumer_key=${Key}&oauth_token=${requestToken.oauth_token}&oauth_signature_method=PLAINTEXT&oauth_version=1.0&oauth_nonce=${oauthNonce}&oauth_timestamp=${oauthTimestamp}&oauth_signature=${Secret}&${requestToken.oauth_token_secret}`;
      console.log("StudentUrl: " + studentUrl);
      const studentResult = await axios.get(studentUrl);
      console.log(studentResult.data);
    }
  }
}
