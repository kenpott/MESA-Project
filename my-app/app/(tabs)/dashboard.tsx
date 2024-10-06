import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function Tab() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue' | 'completed'>('upcoming');
  const [hoveredTab, setHoveredTab] = useState<'upcoming' | 'overdue' | 'completed' | null>(null);

  const circularButtons = Array(7).fill({ letter: 'M', number: '1' });
  const assignments = Array(20).fill({ title: 'Assignment', class: 'Class', due: '1/12 11:59pm' });

  return (
    <SafeAreaView className='flex-1 bg-neutral-950 p-0' edges={['top', 'left', 'right']}>
      <View className="p-4">
        <Text className="text-lg font-semibold text-neutral-500">Welcome!</Text>
        <Text className='text-2xl font-bold text-white'>Username</Text>
      </View>
      <View className='pl-7'>
        <Text className="text-lg font-bold text-neutral-500">May 11, 2024</Text>
      </View>
      <View className='container p-2 flex-row items-center justify-center'>
        {circularButtons.map((button, index) => (
          <View
            key={index}
            className={`p-2 m-1 w-10 flex-col items-center rounded-xl text-center ${
              index === 0 ? 'bg-purple-700' : 'bg-neutral-500'
            }`}
          >
            <Text className='text-lg font-bold text-white'>{button.letter}</Text>
            <Text className='text-md font-bold text-white'>{button.number}</Text>
          </View>
        ))}
      </View>
      <View className='container m-2'>
        <Text className='text-4xl font-bold text-white'>Dashboard</Text>
      </View>
      <View className='flex-row m-3 pb-2'>
        <Pressable 
          onPress={() => setActiveTab('upcoming')}
          onPressIn={() => setHoveredTab('upcoming')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center mr-2 ${
            activeTab === 'upcoming' ? 'bg-purple-700' : (hoveredTab === 'upcoming' ? 'bg-neutral-900' : 'bg-neutral-950')
          }`}
        >
          <Text className={`text-xs font-bold ${activeTab === 'upcoming' ? 'text-white' : 'text-neutral-500'}`}>
            Upcoming
          </Text>
        </Pressable>

        <Pressable 
          onPress={() => setActiveTab('overdue')}
          onPressIn={() => setHoveredTab('overdue')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center mr-2 ${
            activeTab === 'overdue' ? 'bg-purple-700' : (hoveredTab === 'overdue' ? 'bg-neutral-900' : 'bg-neutral-950')
          }`}
        >
          <Text className={`text-xs font-bold ${activeTab === 'overdue' ? 'text-white' : 'text-neutral-500'}`}>
            Overdue
          </Text>
        </Pressable>

        <Pressable 
          onPress={() => setActiveTab('completed')}
          onPressIn={() => setHoveredTab('completed')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center mr-2 ${
            activeTab === 'completed' ? 'bg-purple-700' : (hoveredTab === 'completed' ? 'bg-neutral-900' : 'bg-neutral-950')
          }`}
        >
          <Text className={`text-xs font-bold ${activeTab === 'completed' ? 'text-white' : 'text-neutral-500'}`}>
            Completed
          </Text>
        </Pressable>
      </View>

      <ScrollView className='bg-neutral-900 mx-2 p-4'>
        {assignments.map((assignment, index) => (
          <Pressable key={index} className='flex-row justify-between items-start mb-4'>
            <View className='flex-1'>
              <Text className='text-white text-sm font-bold'>{assignment.title}</Text>
              <Text className='text-neutral-500 text-xs font-bold'>{assignment.class}</Text>
            </View>
            <View className='flex-row items-center justify-between p-4'>
              <View className='flex-2 mr-3 bg-green-500 rounded-full w-2 h-2'></View>
              <View className='flex-2 mr-3 bg-red-500 rounded-full w-2 h-2'></View>
            </View>
            <View className='flex-3'>
              <Text className='text-white text-sm font-bold text-center'>Due</Text>
              <Text className='text-neutral-500 text-xs font-bold text-end'>{assignment.due}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
