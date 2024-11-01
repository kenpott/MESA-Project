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

  const [upcomingResponse, overdueResponse] = await Promise.all([
    axios.get(`${domain}/home/upcoming_submissions_ajax`, { headers: { "Cookie": cookie } }),
    axios.get(`${domain}/home/overdue_submissions_ajax`, { headers: { "Cookie": cookie } }),
  ]);

  const upcomingIds = await getAssignmentIds(upcomingResponse.data.html);
  const overdueIds = await getAssignmentIds(overdueResponse.data.html);

  const upcomingDetails = await fetchDetails(upcomingIds);
  const overdueDetails = await fetchDetails(overdueIds);

  const assignmentsData: AssignmentsData = {
    upcoming: {},
    overdue: {},
  };

  upcomingIds.forEach((id, index) => {
    assignmentsData.upcoming[id] = upcomingDetails[index];
  });

  overdueIds.forEach((id, index) => {
    assignmentsData.overdue[id] = overdueDetails[index];
  });

  return assignmentsData;
}

async function fetchDetails(ids: string[]): Promise<Assignment[]> {
  const details: Assignment[] = [];
  for (const id of ids) {
    const detail = await fetchAssignmentDetails(id);
    details.push(detail);
  }
  return details;
}

async function getAssignmentIds(html: string): Promise<string[]> {
  const response = await axios.post('http://192.168.1.95:8000/getAssignmentIds', { html });
  return response.data;
}

async function fetchAssignmentDetails(id: string): Promise<Assignment> {
  const cookie = await getCookie();

  const assignmentDetailsResponse = await axios.get(`${domain}/assignment/${id}`, {
    headers: { "Cookie": cookie },
  });

  const parsedAssignmentDetails = await axios.post('http://192.168.1.95:8000/parseAssignment', {
    html: assignmentDetailsResponse.data,
  });

  return parsedAssignmentDetails.data;
}

async function getCookie(): Promise<string> {
  const cookie = await SecureStore.getItemAsync('cookie');
  if (!cookie) {
    throw new Error('Cookie not found in SecureStore.');
  }
  return cookie;
}
