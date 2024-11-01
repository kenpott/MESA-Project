import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const domain = 'https://lms.lausd.net';

interface Assignment {
  title: string;
  description: string;
  class: string;
  type: string;
  duedate: number; 
  overdue: number;
  files?: string[];
  images?: string[];
}

interface AssignmentsData {
  upcoming: Record<string, Assignment>;
  overdue: Record<string, Assignment>;
}

export async function fetchAllAssignments(): Promise<AssignmentsData> {
  const cookie = await getCookie();

  const response = await axios.post('http://192.168.1.53:8000/getAssignments', { "cookie": cookie });

  return response.data;
}

async function getCookie(): Promise<string> {
  const cookie = await SecureStore.getItemAsync('cookie');
  if (!cookie) {
    throw new Error('Cookie not found in SecureStore.');
  }
  return cookie;
}
