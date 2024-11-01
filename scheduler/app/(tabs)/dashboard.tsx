import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchAllAssignments } from '../services/fetchassignments';
import AssignmentItem from '../../components/assignment';

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

interface AssignmentsState {
  upcoming: Record<string, Assignment>;
  overdue: Record<string, Assignment>;
}

export default function Tab() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue'>('upcoming');
  const [hoveredTab, setHoveredTab] = useState<'upcoming' | 'overdue' | null>(null);
  const [assignments, setAssignments] = useState<AssignmentsState>({ upcoming: {}, overdue: {} });

  useEffect(() => {
    const loadAssignments = async () => {
      const startTime = performance.now(); // Start time measurement

      try {
        const fetchedAssignments = await fetchAllAssignments();
        console.log('Fetched assignments:', fetchedAssignments);
        setAssignments(fetchedAssignments || { upcoming: {}, overdue: {} });
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }

      const endTime = performance.now(); // End time measurement
      const duration = ( endTime - startTime ) / 1000; // Calculate the duration
      console.log(`Time taken to fetch and parse assignments: ${duration} seconds`);
    };

    loadAssignments();
  }, []);

  const today = new Date();

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
        {activeTab === 'upcoming' ? (
          assignments.upcoming && Object.keys(assignments.upcoming).length > 0 ? (
            Object.entries(assignments.upcoming).map(([id, assignment]) => (
              <AssignmentItem
                key={id}
                assignment={{
                  title: assignment.title,
                  class: assignment.class,
                  type: assignment.type,
                  duedate: assignment.duedate,
                  overdue: assignment.overdue,
                  description: assignment.description,
                  files: assignment.files || []
                }}
              />
            ))
          ) : (
            <Text className='text-white'>No upcoming assignments available.</Text>
          )
        ) : (
          assignments.overdue && Object.keys(assignments.overdue).length > 0 ? (
            Object.entries(assignments.overdue).map(([id, assignment]) => (
              <AssignmentItem
                key={id}
                assignment={{
                  title: assignment.title,
                  class: assignment.class,
                  type: assignment.type,
                  duedate: assignment.duedate,
                  overdue: assignment.overdue,
                  description: assignment.description,
                  files: assignment.files || []
                }}
              />
            ))
          ) : (
            <Text className='text-white'>No overdue assignments available.</Text>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
