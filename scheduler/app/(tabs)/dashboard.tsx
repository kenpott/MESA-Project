import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAssignments } from '../services/fetchassignments'; 
import AssignmentItem from '../../components/assignment';

export default function Tab() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue'>('upcoming');
  const [hoveredTab, setHoveredTab] = useState<'upcoming' | 'overdue' | null>(null);
  const [assignments, setAssignments] = useState<{ upcoming: Record<string, any>; overdue: Record<string, any> }>({ upcoming: {}, overdue: {} });

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const fetchedAssignments = await fetchAssignments();
        setAssignments(fetchedAssignments);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    loadAssignments();
  }, []);

  const today = new Date();

  // Function to format due date
  const formatDueDate = (duedate: string) => {
    const [month, day] = duedate.split('/'); // Assuming duedate is in MM/DD/YYYY format
    return `${month}/${day}`;
  };

  return (
    <SafeAreaView className='flex-1 bg-neutral-950 p-0' edges={['top', 'left', 'right']}>
      <View className="p-4">
        <Text className="text-lg font-semibold text-neutral-500">Welcome!</Text>
        <Text className='text-2xl font-bold text-white'>Username</Text>
      </View>
      <View className='pl-3'>
        <Text className="text-lg font-bold text-neutral-500">
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
          <Text className={`text-xs font-bold ${activeTab === 'upcoming' ? 'text-white' : 'text-neutral-500'}`}>
            Upcoming
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('overdue')}
          onPressIn={() => setHoveredTab('overdue')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center mr-2 ${activeTab === 'overdue' ? 'bg-purple-700' : hoveredTab === 'overdue' ? 'bg-neutral-900' : 'bg-neutral-950'}`}
        >
          <Text className={`text-xs font-bold ${activeTab === 'overdue' ? 'text-white' : 'text-neutral-500'}`}>
            Overdue
          </Text>
        </Pressable>
      </View>

      <ScrollView className='bg-neutral-900 mx-2 p-4'>
        {(activeTab === 'upcoming' ? Object.values(assignments.upcoming) : Object.values(assignments.overdue)).map((assignment, index) => (
          <AssignmentItem 
            key={index} 
            assignment={{
              title: assignment.title,
              class: assignment.class,
              due: formatDueDate(assignment.duedate), // Format the due date
              overdue: assignment.overdue
            }} 
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
