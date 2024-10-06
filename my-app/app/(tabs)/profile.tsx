import { View, ScrollView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950 pb-0">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className='p-4'>
          <View className='bg-white w-20 h-20'></View>
        <Text className='text-white text-lg font-bold'>Username</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
