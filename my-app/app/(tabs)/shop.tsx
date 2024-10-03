import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-neutral-950">
      <Text className="text-lg text-white">
        Shop
      </Text>
    </SafeAreaView>
  );
}
