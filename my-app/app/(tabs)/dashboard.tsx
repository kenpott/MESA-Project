import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const circularButtons = Array(7).fill({ letter: 'M', number: '1' });
  const assignments = Array(20).fill({ title: 'Assignment', class: 'Class', due: '1/12 11:59pm' });

  return (
    <SafeAreaView className='flex-1 bg-neutral-950'>
      <View className="container m-2">
        <Text className="text-lg font-semibold text-neutral-500">Hello!</Text>
        <Text className='text-2xl font-bold text-white'>Username</Text>
      </View>
      <View className='pl-7'>
        <Text className="text-lg font-bold text-white">May 11, 2024</Text>
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
      <View className='flex-row m-2'>
        <Pressable className='p-2 bg-purple-700 rounded-full text-center mr-2'>
          <Text className='text-white text-xs font-bold'>Upcoming</Text>
        </Pressable>
        <Pressable className='p-2 rounded-full text-center'>
          <Text className='text-neutral-500 text-xs font-bold'>Overdue</Text>
        </Pressable>
        <Pressable className='p-2 rounded-full text-center'>
          <Text className='text-neutral-500 text-xs font-bold'>Completed</Text>
        </Pressable>
      </View>

      <ScrollView className='container p-4'>
        {assignments.map((assignment, index) => (
          <Pressable key={index} className='flex-row justify-between items-start mb-4'>
            <View className='flex-1'>
              <Text className='text-white text-sm font-bold'>{assignment.title}</Text>
              <Text className='text-neutral-500 text-xs font-bold'>{assignment.class}</Text>
            </View>
            <View className='flex-2 mr-3 bg-green-500 rounded-full px-2 py-1'>
          <Text className='text-xs text-white font-semibold'>Completed</Text>
        </View>
        <View className='flex-2 mr-3 bg-red-500 rounded-full px-1 py-1'>
          <Text className='text-xs text-white font-semibold'>Overdue</Text>
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
