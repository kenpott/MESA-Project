import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Assignment {
  title: string;
  dueDate: string; 
  courseTitle: string;
}

interface Cookie {
  name: string;
  value: string;
}

const fetchOverdueAssignments = async (cookie: Cookie): Promise<{ [key: string]: Assignment }> => {
  const overdueAssignments: { [key: string]: Assignment } = {}; 
  const overdueReq = await axios.get('https://lms.lausd.net/home/overdue_submissions_ajax', {
    headers: {
      "Cookie": `${cookie.name}=${cookie.value}`
    }
  });

  const $ = cheerio.load(overdueReq.data.html);

  $('.upcoming-event').each((index: number, element) => {
    const id = $(element).find('.event-title a').attr('href')?.split('/').pop()?.trim();
    const title = $(element).find('.event-title a').text().trim();
    const overdueDaysText = $(element).find('.readonly-title.event-subtitle').first().text().trim();
    const overdueDays = overdueDaysText.match(/\d+/)?.[0] || '0';
    const courseTitle = $(element).find('.readonly-title.event-subtitle').last().text().trim();
    const dueDateAlt = $(element).find('.infotip.submission-infotip img').attr('alt');
    const dueDate = dueDateAlt ? dueDateAlt.match(/(?:\w+, )?(\w+ \d{1,2}, \d{4})/)?.[1] || '' : '';

    if (id) {
      overdueAssignments[id] = {
        title,
        courseTitle,
        dueDate
      };
    } else {
      console.log("No ID found for element:", { title, overdueDays, courseTitle, dueDate });
    }
  });

  return overdueAssignments; 
};

const fetchUpcomingAssignments = async (cookie: Cookie): Promise<{ [key: string]: Assignment }> => {
  const upcomingAssignments: { [key: string]: Assignment } = {};
  const upcomingReq = await axios.get('https://lms.lausd.net/home/upcoming_submissions_ajax', {
    headers: {
      "Cookie": `${cookie.name}=${cookie.value}`
    }
  });

  const upcoming$ = cheerio.load(upcomingReq.data.html);

  upcoming$('.upcoming-event').each((index: number, element) => {
    const id = upcoming$(element).find('.event-title a').attr('href')?.split('/').pop()?.trim();
    const title = upcoming$(element).find('.event-title a').text().trim();
    const dueDateText = upcoming$(element).find('.readonly-title.event-subtitle').first().text().trim();
    const dueDate = dueDateText ? dueDateText.match(/(?:\w+, )?(\w+ \d{1,2}, \d{4})/)?.[1] || '' : '';
    const courseTitle = upcoming$(element).find('.readonly-title.event-subtitle').last().text().trim();

    if (id) {
      upcomingAssignments[id] = {
        title,
        courseTitle,
        dueDate,
      };
    } else {
      console.log("No ID found for upcoming assignment:", { title, dueDate, courseTitle });
    }
  });

  return upcomingAssignments; 
};

export default function Tab() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue'>('upcoming');
  const [hoveredTab, setHoveredTab] = useState<'upcoming' | 'overdue' | null>(null);
  const [overdueAssignments, setOverdueAssignments] = useState<Assignment[]>([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[]>([]);

  const today = new Date();

  function formatDate(dateString: string): string {
    const parts = dateString.split(" ");
    const monthStr = parts[0]; 
    const dayStr = parts[1]; 

    const monthNames: { [key: string]: number } = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12
    };
    const month = monthNames[monthStr];
    const day = parseInt(dayStr, 10); 
    return `${month}/${day}`;
  }

  useEffect(() => {
    const cookie: Cookie = { name: 'SESSb9665c0d9ab149f2bb38695f558551ea', value: '302bf307c6b6844788c3fb2da1f3a25d' };

    async function fetchAssignments() {
      try {
        const overdue = await fetchOverdueAssignments(cookie);
        const upcoming = await fetchUpcomingAssignments(cookie);
        setOverdueAssignments(Object.values(overdue));
        setUpcomingAssignments(Object.values(upcoming));
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    }

    fetchAssignments();
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-neutral-950 p-0' edges={['top', 'left', 'right']}>
      <View className='flex-col p-4'>
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold text-neutral-500">Welcome!</Text>
          <Pressable className='px-3'>
            <MaterialCommunityIcons name="bell-badge" size={24} color="white" />
          </Pressable>
        </View>
        <Text className='text-2xl font-bold text-white'>Username</Text>
      </View>
      <View className='pl-2 justify-center'>
        <Text className="text-md font-bold text-neutral-500">
          Today is {today.toLocaleString('en-us', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
      </View>
      <View className='container m-2'>
        <Text className='text-4xl font-bold text-white'>Dashboard</Text>
      </View>
      <View className='flex-row m-3 pb-2'>
        <Pressable
          onPress={() => setActiveTab('upcoming')}
          onPressIn={() => setHoveredTab('upcoming')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center mr-2 ${activeTab === 'upcoming' ? 'bg-purple-700' : hoveredTab === 'upcoming' ? 'bg-neutral-900' : 'bg-neutral-950'}`}
        >
          <Text className={`text-xs font-bold ${activeTab === 'upcoming' ? 'text-white' : 'text-neutral-500'}`}>Upcoming</Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('overdue')}
          onPressIn={() => setHoveredTab('overdue')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center mr-2 ${activeTab === 'overdue' ? 'bg-purple-700' : hoveredTab === 'overdue' ? 'bg-neutral-900' : 'bg-neutral-950'}`}
        >
          <Text className={`text-xs font-bold ${activeTab === 'overdue' ? 'text-white' : 'text-neutral-500'}`}>Overdue</Text>
        </Pressable>
      </View>

      <ScrollView className='bg-neutral-900 mx-2 p-4'>
        {(activeTab === 'upcoming' ? upcomingAssignments : overdueAssignments).map((assignment, index) => (
          <Pressable key={index} className='flex-row justify-between items-start mb-4'>
            <View className='flex-1'>
              <Text className='text-white text-sm font-bold'>{assignment.title}</Text>
              <Text className='text-neutral-500 text-xs font-bold'>{assignment.courseTitle}</Text>
            </View>
            <View className='flex-3 px-2'>
              <Text className='text-white text-sm font-bold text-center'>Due</Text>
              <Text className='text-neutral-500 text-xs font-bold text-end'>{formatDate(assignment.dueDate)}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
