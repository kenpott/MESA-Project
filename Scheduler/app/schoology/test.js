import axios from 'axios';
import { Linking } from 'react-native';

const Key = 'efe5a543948026772946115c316323cd05e443b00';
const Secret = 'e9dc645bf33230645546a37fc9d80348';

async function getRequestToken(Key, Secret) {
  const oauthTimestamp = Math.floor(Date.now() / 1000);
  const array = new Uint8Array(8); 
  crypto.getRandomValues(array); 
  const oauthNonce = Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join(''); 
  

  const URL = `https://api.schoology.com/v1/oauth/request_token?oauth_consumer_key=${Key}&oauth_timestamp=${oauthTimestamp}&oauth_signature_method=PLAINTEXT&oauth_version=1.0&oauth_nonce=${oauthNonce}&oauth_signature=${encodeURIComponent(Secret + '%26')}`;

  try {
    const response = await axios.get(URL);
    const params = new URLSearchParams(response.data);
        return {
            oauth_token: params.get('oauth_token'),
            oauth_token_secret: params.get('oauth_token_secret')
        };
  } catch (error) {
    console.error('Error making request:', error.response ? error.response.data : error.message);
  }
}

export async function promptAuthorization() {
  const requestToken = await getRequestToken(Key, Secret);
  console.log("oauth_token: " + requestToken.oauth_token);
  console.log("oauth_token: " + requestToken.oauth_token_secret);
  if (requestToken) {
    const url = `https://lms.lausd.net/oauth/authorize?oauth_consumer_key=${Key}&oauth_token=${requestToken.oauth_token}&oauth_token_secret=${requestToken.oauth_token_secret}`;
    console.log(url);
    //Linking.openURL(url);
  }
}
