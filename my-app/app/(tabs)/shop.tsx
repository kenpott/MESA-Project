import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react'; 
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function Tab() {
  const [activeTab, setActiveTab] = useState<'all' | 'borders' | 'backgrounds'>('all'); 
  const [hoveredTab, setHoveredTab] = useState<'all' | 'borders' | 'backgrounds' | null>(null); 
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const circularButtons = Array(7).fill({ name: 'item', price: '0000' });

  return (
    <SafeAreaView className="flex-1 bg-neutral-950" edges={['top', 'left', 'right']}>
      <View className='flex-row justify-between p-3'>
        <Text className='text-white text-4xl px-2 font-bold'>Shop</Text>
        <View className='bg-neutral-900 flex-row items-center rounded-full'>
          <View className='w-5 h-5 ml-3'><FontAwesome6 name="coins" size={20} color="white" /></View>
          <Text className='text-white text-center px-3 py-1 text-lg font-semibold'>0000</Text>
        </View>
      </View>
      <View className='flex-row m-2'>
        <Pressable 
          onPress={() => setActiveTab('all')}
          onPressIn={() => setHoveredTab('all')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center mr-2 ${
            activeTab === 'all' ? 'bg-purple-700' : (hoveredTab === 'all' ? 'bg-neutral-900' : 'bg-neutral-950')
          }`}
        >
          <Text className={`text-xs px-1 font-bold ${activeTab === 'all' ? 'text-white' : 'text-neutral-500'}`}>All</Text>
        </Pressable>
        <Pressable 
          onPress={() => setActiveTab('borders')}
          onPressIn={() => setHoveredTab('borders')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center mr-2 ${
            activeTab === 'borders' ? 'bg-purple-700' : (hoveredTab === 'borders' ? 'bg-neutral-900' : 'bg-neutral-950')
          }`}
        >
          <Text className={`text-xs font-bold ${activeTab === 'borders' ? 'text-white' : 'text-neutral-500'}`}>Borders</Text>
        </Pressable>
        <Pressable 
          onPress={() => setActiveTab('backgrounds')}
          onPressIn={() => setHoveredTab('backgrounds')}
          onPressOut={() => setHoveredTab(null)}
          className={`p-2 rounded-full text-center ${
            activeTab === 'backgrounds' ? 'bg-purple-700' : (hoveredTab === 'backgrounds' ? 'bg-neutral-900' : 'bg-neutral-950')
          }`}
        >
          <Text className={`text-xs font-bold ${activeTab === 'backgrounds' ? 'text-white' : 'text-neutral-500'}`}>Backgrounds</Text>
        </Pressable>
      </View>
      <ScrollView className='p-4'>
        <View className='flex-row flex-wrap justify-center'>
          {circularButtons.map((button, index) => (
            <Pressable 
              key={index}
              onPressIn={() => setHoveredItem(index)}
              onPressOut={() => setHoveredItem(null)} 
              className={`bg-neutral-900 p-4 m-2 w-40 h-40 flex-col items-center justify-center rounded-xl text-center ${
                hoveredItem === index ? 'bg-neutral-800' : ''
              }`}
            >
              <View className='bg-white w-20 h-20 mb-2 flex items-center justify-center'>
              </View>
              <Text className='text-lg font-bold text-white text-center'>{button.name}</Text>
              <View className='bg-purple-700 flex-row px-2 py-1 rounded-full items-center'>
                <View className='w-5 h-5 mx-1 justify-center'><FontAwesome6 name="coins" size={18} color="white" /></View>
                <Text className='text-md font-semibold text-white text-center'>{button.price}</Text>
              </View>
            </Pressable>
          ))}
          {circularButtons.length % 2 !== 0 && <View className='w-40' />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
