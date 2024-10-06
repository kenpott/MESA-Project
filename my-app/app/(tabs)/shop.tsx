import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  const circularButtons = Array(7).fill({ name: 'item', price: '0000' });
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
        <View className='flex-row justify-between p-3'>
          <Text className='text-white text-4xl px-2 font-bold'>Shop</Text>
        <View className='bg-neutral-900 flex-row items-center rounded-full'>
          <View className='bg-white w-5 h-5 ml-3'></View>
          <Text className='text-white text-center w-20 py-1 text-lg font-semibold'>0000</Text>
        </View>
        </View>
        <View className='flex-row m-2'>
        <Pressable className='p-2 bg-purple-700 rounded-full text-center mr-2'>
          <Text className='text-white text-xs px-2 font-bold'>All</Text>
        </Pressable>
        <Pressable className='p-2 rounded-full text-center'>
          <Text className='text-neutral-500 text-xs font-bold'>Borders</Text>
        </Pressable>
        <Pressable className='p-2 rounded-full text-center'>
          <Text className='text-neutral-500 text-xs font-bold'>Backgrounds</Text>
        </Pressable>
      </View>
      <ScrollView className='p-4'>
      <View className='flex-row flex-wrap justify-center'>
        {circularButtons.map((button, index) => (
          <View
            key={index}
            className={`bg-neutral-900 p-4 m-2 w-40 h-40 flex-col items-center justify-center rounded-xl text-center`}>
            <View className='bg-white w-20 h-20 mb-2 flex items-center justify-center'>
            </View>
            <Text className='text-lg font-bold text-white text-center'>{button.name}</Text>
            <View className='bg-green-500 flex-row px-2 py-1 rounded-full items-center'>
              <View className='bg-white w-5 h-5 mx-1'></View>
            <Text className='text-md font-semibold text-white text-center'>{button.price}</Text>
            </View>
          </View>
        ))}
        {circularButtons.length % 2 !== 0 && <View className='w-40' />} 
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}