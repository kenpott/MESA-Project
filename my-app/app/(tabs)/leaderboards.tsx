import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const circularButtons = Array(7).fill({ name: 'Username', number: '0000' });

  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <View>
        <Text className="p-4 text-3xl font-bold text-white">Leaderboards</Text>
        <View className='m-2 items-center'>
          <View className='flex-row justify-center bg-neutral-900 rounded-full'>
            <Pressable className='p-2 bg-purple-700 rounded-full text-center mr-2'>
              <Text className='text-white text-sm font-semibold px-4'>School</Text>
            </Pressable>
            <Pressable className='p-2 rounded-full text-center'>
              <Text className='text-white text-sm font-semibold px-4'>Global</Text>
            </Pressable>
          </View>
        </View>
        <View className='flex-row m-2 px-2'>
          <Pressable className='p-2 bg-purple-700 rounded-full text-center mr-2'>
            <Text className='text-white text-xs font-bold'>Daily</Text>
          </Pressable>
          <Pressable className='p-2 rounded-full text-center'>
            <Text className='text-neutral-500 text-xs font-bold'>Weekly</Text>
          </Pressable>
          <Pressable className='p-2 rounded-full text-center'>
            <Text className='text-neutral-500 text-xs font-bold'>All Time</Text>
          </Pressable>
        </View>
        <View className='bg-neutral-900 m-4 p-1 rounded-3xl'>
          <View className={`p-2 m-1 flex-row items-center justify-between rounded-xl`}>
            <Text className='text-lg font-bold text-white'>#1</Text>
            <Text className='text-lg font-semibold text-white flex-1 ml-4'>Username</Text>
            <Text className='text-md font-semibold text-white'>0000</Text>
          </View>
        </View>
        <View className='bg-neutral-900 rounded-3xl flex-row m-4 justify-between'>
          <View className='bg-inherit w-1/3.75 p-5 items-center'>
            <View className='bg-white w-20 h-20 rounded-full'></View>
            <Text className='text-white font-bold pt-2'>Name</Text>
            <Text className='text-white font-bold py-1'>999</Text>
            <View className='bg-neutral-500 rounded-full p-1'><Text className='text-white px-4 font-bold'>#2</Text></View>
          </View>
          <View className='bg-inherit w-1/3.75 p-5 items-center'>
            <View className='bg-white w-20 h-20 rounded-full'></View>
            <Text className='text-white font-bold pt-2'>Name</Text>
            <Text className='text-white font-bold py-1'>999</Text>
            <View className='bg-yellow-500 rounded-full p-1'><Text className='text-white px-4 font-bold'>#1</Text></View>
          </View>
          <View className='bg-inherit w-1/3.75 p-5 items-center'>
            <View className='bg-white w-20 h-20 rounded-full'></View>
            <Text className='text-white font-bold pt-2'>Name</Text>
            <Text className='text-white font-bold py-1'>999</Text>
            <View className='bg-orange-700 rounded-full p-1'><Text className='text-white px-4 font-bold'>#3</Text></View>
          </View>
        </View>
      </View>
      <ScrollView>
        <View className='bg-neutral-900 m-4 p-1 rounded-3xl'>
          {circularButtons.map((button, index) => (
            <View
              key={index}
              className={`p-2 m-1 flex-row items-center justify-between rounded-xl`}
            >
              <Text className='text-lg font-bold text-white'>#{index + 4}</Text>
              <Text className='text-lg font-semibold text-white flex-1 ml-4'>{button.name}</Text>
              <Text className='text-md font-semibold text-white'>{button.number}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
