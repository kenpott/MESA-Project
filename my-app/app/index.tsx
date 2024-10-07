import { View, Text, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Tab() {
    const [hovered, setHovered] = useState(false);
    const router = useRouter(); 

    return (
        <SafeAreaView className="bg-neutral-950 flex-1 justify-between">
            <View className='flex-1' />
            <View className='pb-10 items-center'>
                <Text className="text-white text-3xl font-bold text-center px-4 mx-4 mb-2">Welcome to Scheduler<Text className='text-purple-700'>++</Text></Text>
                <Text className="text-neutral-500 text-xs font-bold text-center px-4 mx-10">An easy to use app to track your assignments with a little twist.</Text>
            </View>
            <Pressable
                className={`p-4 rounded-lg flex-row items-center justify-center mx-10 mb-20 ${
                    hovered ? 'bg-purple-800' : 'bg-purple-700'
                }`}
                onPress={() => router.push('/dashboard')} 
                onPressIn={() => setHovered(true)} 
                onPressOut={() => setHovered(false)} 
            >
                <Image source={require('../assets/images/schoology-logo.png')} className='w-10 h-10'/>
                <Text className="text-neutral-900 text-lg font-bold px-3">Login in with Schoology</Text>
            </Pressable>
        </SafeAreaView>
    );
}
