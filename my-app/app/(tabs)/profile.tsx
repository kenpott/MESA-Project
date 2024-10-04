import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  return (
    <SafeAreaView className="flex-1 bg-neutral-950">
      <View className="container m-4">
      <Image source={require('../../assets/images/profile-placeholder.jpg')}/>
        <Text className='text-2xl font-bold text-white'>Username</Text>
      </View>
    </SafeAreaView>
  );
}
