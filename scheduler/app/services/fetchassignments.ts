import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as cheerio from 'cheerio';

interface Assignment {
  title: string;
  duedate: string;
  class: string;
  overdue: number;
}

interface AssignmentsData {
  upcoming: Record<string, Assignment>;
  overdue: Record<string, Assignment>;  
}

export async function fetchAssignments(): Promise<AssignmentsData> {
  const cookie = await SecureStore.getItemAsync('cookie');
  if (!cookie) {
    throw new Error('Cookie not found in SecureStore.');
  }

  const assignments: AssignmentsData = {
    upcoming: {},
    overdue: {},
  };

  const upcomingResponse = await axios.get('https://lms.lausd.net/home/upcoming_submissions_ajax', {
    headers: {
      "Cookie": cookie,
    },
  });

  const overdueResponse = await axios.get('https://lms.lausd.net/home/overdue_submissions_ajax', {
    headers: {
      "Cookie": cookie,
    },
  });

  assignments.upcoming = await sendToParseServer(upcomingResponse.data.html, false);
  assignments.overdue = await sendToParseServer(overdueResponse.data.html, true);

  return assignments; 
}

async function sendToParseServer(html: string, isOverdue: boolean): Promise<Record<string, Assignment>> {
  const response = await axios.post('http://192.168.1.95:8000/parse', {
    "html": html,
    "isOverdue": isOverdue
  });
  return response.data;
}

