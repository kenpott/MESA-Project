import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const circularButtons = Array(3).fill({ Name: 'Username', number: '0000' });


  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <View>
      <Text className="p-4 text-3xl font-bold text-white">Leaderboards</Text>
      <View className='flex-row m-2'>
        <Pressable className='p-2 bg-purple-700 rounded-full text-center mr-2'>
          <Text className='text-neutral-950 text-xs font-bold'>School</Text>
        </Pressable>
        <Pressable className='p-2 rounded-full text-center'>
          <Text className='text-neutral-500 text-xs font-bold'>Global</Text>
        </Pressable>
      </View>
      <View className='flex-row m-2'>
        <Pressable className='p-2 bg-purple-700 rounded-full text-center mr-2'>
          <Text className='text-neutral-950 text-xs font-bold'>Daily</Text>
        </Pressable>
        <Pressable className='p-2 rounded-full text-center'>
          <Text className='text-neutral-500 text-xs font-bold'>Weekly</Text>
        </Pressable>
        <Pressable className='p-2 rounded-full text-center'>
          <Text className='text-neutral-500 text-xs font-bold'>All Time</Text>
        </Pressable>
      </View>
      </View>
    </SafeAreaView>
  );
}
