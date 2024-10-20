import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Tab() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950 pb-0" edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='w-full h-8 px-3 py-1 flex-row items-center'>
          <Pressable>
            <Entypo name="dots-three-horizontal" size={24} color="white"/>
          </Pressable>
          <View className='flex-row ml-auto'>
            <Pressable>
              <MaterialCommunityIcons name="pencil" size={24} color="white"/>
            </Pressable>
            <Pressable className='ml-2'> 
              <MaterialIcons name="people-alt" size={24} color="white"/>
            </Pressable>
            <Pressable className='ml-2'>
              <MaterialIcons name="inbox" size={24} color="white"/>
            </Pressable>
          </View>
        </View>

        <View className='flex-row p-4'>
          <View className='bg-white rounded-full w-20 h-20 mx-2'></View>
          <View className='flex-col mx-1'>
            <View className='flex-row'>
              <Text className='text-white text-lg font-bold p-2'>Username</Text>
              <Text className='text-neutral-500 text-lg font-bold p-2'>Lv. 1</Text>
            </View>
            <View className='bg-white rounded-full w-full h-2 mx-2'></View>
            <View className='bg-neutral-900 flex-row rounded-full w-full h-6 m-2 items-center'>
              <View className='flex-row p-4'>
                <View className='w-5 h-5 mx-1 justify-center'>
                  <FontAwesome6 name="coins" size={15} color="white" />
                </View>
                <Text className='text-neutral-500 text-sm font-bold'>0000</Text>
              </View>
              <View className='flex-row justify-center'>
                <View className=' w-5 h-5 mx-1 justify-center'>
                  <FontAwesome name="paper-plane" size={15} color="white" />
                </View>
                <Text className='text-neutral-500 text-sm font-bold'>0000</Text>
              </View>
            </View>
          </View>
        </View>
        <View className='px-8'>
          <Text className='text-neutral-500 text-sm font-bold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis et diam et consequat.</Text>
        </View>
        <View className='bg-neutral-900 w-50 h-25 rounded-xl mx-4 mt-2 justify-center'>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center'>
              <Text className='text-neutral-500 text-sm font-bold p-2'>Badges</Text>
              <Text className='text-white text-xl font-bold p-1'>0</Text>
            </View>
            <Pressable>
              <View className='px-4'>
                <MaterialIcons name="arrow-forward-ios" size={14} color="#737373"/>
              </View>
            </Pressable>
          </View>
          <View className='flex-row p-3 justify-between'>
            {Array(6).fill(null).map((_, index) => (
              <Pressable key={index} className='bg-white w-10 h-10 rounded-full mx-1'></Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
