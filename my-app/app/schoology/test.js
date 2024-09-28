import axios from 'axios';
import { getRandomValues } from 'react-native-get-random-values';
import { openAuthSessionAsync } from 'expo-web-browser';
import * as Crypto from 'expo-crypto';

const Key = 'efe5a543948026772946115c316323cd05e443b00';
const Secret = 'e9dc645bf33230645546a37fc9d80348';
const baseUrl = 'https://api.schoology.com/v1/';
const domain = 'https://lms.lausd.net/';

export async function promptAuthorization() {
  const array = new Uint8Array(8); 
  crypto.getRandomValues(array); 
  const oauthNonce = Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join(''); 
  const URL = `${baseUrl}oauth/request_token?oauth_consumer_key=${Key}&oauth_timestamp=${Math.floor(Date.now() / 1000)}&oauth_signature_method=PLAINTEXT&oauth_version=1.0&oauth_nonce=${oauthNonce}&oauth_signature=${Secret}%26`;
  const response = await axios.get(URL);
  let data = response.data.match(/oauth_token=([^&]+)&oauth_token_secret=([^&]+)&xoauth_token_ttl=(\d+)/);
  const Token = data[1];
  const TokenSecret = data[2];
  console.log(`Token: ${Token}`);
  console.log(`Token Secret: ${TokenSecret}`);

  const url = `${domain}oauth/authorize?oauth_consumer_key=${Key}&oauth_token=${Token}&oauth_token_secret=${TokenSecret}`;
  console.log(`Authorization Url: ${url}`);
  
  const result = await openAuthSessionAsync(url);
  if (result.type === "cancel") {
    const studentUrl = `${baseUrl}sections/7354453829/assignments?oauth_consumer_key=${Key}&oauth_nonce=${oauthNonce}&oauth_signature=${Secret}%26&oauth_signature_method=PLAINTEXT&oauth_timestamp=${Math.floor(Date.now() / 1000)}&oauth_version=1.0`;
    console.log("Student Url: " + studentUrl);
    /*
    const studentResult = await axios.get(studentUrl).then((response) => {
      console.log(response.data);
    });
    */
  }
}

