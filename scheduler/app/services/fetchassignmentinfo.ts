import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface AssignmentInfo {
  description: string;
  files?: string[];
  duedate: string;
  type: string;
}

export async function fetchAssignmentInfo(assignmentId: string): Promise<AssignmentInfo> {
  const cookie = await SecureStore.getItemAsync('cookie');
  if (!cookie) {
    throw new Error('Cookie not found in SecureStore.');
  }

  const response = await axios.get(`https://lms.lausd.net/assignment/${assignmentId}`, {
    headers: {
      "Cookie": cookie,
    },
  });

  const assignmentInfo = await sendToParseAssignmentServer(response.data.html);
  
  return assignmentInfo;
}

async function sendToParseAssignmentServer(html: string): Promise<AssignmentInfo> {
  const response = await axios.post('http://192.168.1.95:8000/parseAssignment', {
    html,
  });

  return response.data['assignment']; 
}
