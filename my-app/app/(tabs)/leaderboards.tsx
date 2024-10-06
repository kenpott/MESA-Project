import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function Tab() {
  const [activeTab, setActiveTab] = useState<'friends' | 'school' | 'global'>('friends');
  const [hoveredTab, setHoveredTab] = useState<'friends' | 'school' | 'global' | null>(null);
  
  const [activeTimeTab, setActiveTimeTab] = useState<'daily' | 'weekly' | 'allTime'>('daily');
  const [hoveredTimeTab, setHoveredTimeTab] = useState<'daily' | 'weekly' | 'allTime' | null>(null);

  const circularButtons = Array(7).fill({ name: 'Username', number: '0000' });

  const tabs: Array<'friends' | 'school' | 'global'> = ['friends', 'school', 'global'];
  const timeTabs: Array<'daily' | 'weekly' | 'allTime'> = ['daily', 'weekly', 'allTime'];

  return (
    <SafeAreaView className="flex-1 bg-neutral-950" edges={['top', 'left', 'right']}>
      <View>
        <Text className="p-4 text-3xl font-bold text-white">Leaderboards</Text>
        
        <View className='m-2 items-center'>
          <View className='flex-row justify-center bg-neutral-900 rounded-full'>
            {tabs.map((tab, index) => (
              <Pressable 
                key={tab}
                onPress={() => setActiveTab(tab)}
                onPressIn={() => setHoveredTab(tab)}
                onPressOut={() => setHoveredTab(null)}
                className={`p-2 rounded-full text-center ${index < 2 ? 'mr-2' : ''} ${
                  activeTab === tab ? 'bg-purple-700' : (hoveredTab === tab ? 'bg-neutral-800' : 'bg-neutral-900')
                }`}
              >
                <Text className={`text-white text-sm font-semibold px-4 ${activeTab === tab ? 'text-white' : 'text-neutral-500'}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View className='flex-row m-2 px-2'>
          {timeTabs.map((timeTab) => (
            <Pressable 
              key={timeTab}
              onPress={() => setActiveTimeTab(timeTab)}
              onPressIn={() => setHoveredTimeTab(timeTab)}
              onPressOut={() => setHoveredTimeTab(null)}
              className={`p-2 rounded-full text-center mr-2 ${
                activeTimeTab === timeTab ? 'bg-purple-700' : (hoveredTimeTab === timeTab ? 'bg-neutral-900' : 'bg-neutral-950')
              }`}
            >
              <Text className={`text-white text-xs font-bold ${activeTimeTab === timeTab ? 'text-white' : 'text-neutral-500'}`}>
                {timeTab.charAt(0).toUpperCase() + timeTab.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className='bg-neutral-900 m-4 p-1 rounded-3xl'>
          <View className={`p-2 m-1 flex-row items-center justify-between rounded-xl`}>
            <Text className='text-lg font-bold text-white'>#1</Text>
            <Text className='text-lg font-semibold text-neutral-500 flex-1 ml-4'>Username</Text>
            <Text className='text-md font-semibold text-neutral-500'>0000</Text>
          </View>
        </View>
        <View className='bg-neutral-900 rounded-3xl flex-row m-4 justify-between'>
          {['#2', '#1', '#3'].map((rank, index) => (
            <View key={rank} className='bg-inherit w-1/3.75 p-5 items-center'>
              <View className='bg-white w-20 h-20 rounded-full'></View>
              <Text className='text-white font-bold pt-2'>Name</Text>
              <Text className='text-white font-bold py-1'>999</Text>
              <View className={`rounded-full p-1 ${index === 0 ? 'bg-neutral-500' : index === 1 ? 'bg-yellow-500' : 'bg-orange-700'}`}>
                <Text className='text-white px-4 font-bold'>{rank}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <ScrollView>
        <View className='bg-neutral-900 m-4 p-1 rounded-3xl'>
          {circularButtons.map((button, index) => (
            <View key={index} className={`p-2 m-1 flex-row items-center justify-between rounded-xl`}>
              <Text className='text-lg font-bold text-white'>#{index + 4}</Text>
              <Text className='text-lg font-semibold text-neutral-500 flex-1 ml-4'>{button.name}</Text>
              <Text className='text-md font-semibold text-neutral-500'>{button.number}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
