import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { login } from './services/login.js';

export default function Tab() {
    const [hovered, setHovered] = useState(false);
    const [submitHovered, setSubmitHovered] = useState(false);
    const [isLoginFormVisible, setLoginFormVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        // login(email, password);
        router.push('/dashboard');
    };

    return (
        <KeyboardAvoidingView
            className="flex-1"
            behavior='padding'>
            <SafeAreaView className="bg-neutral-950 flex-1 justify-between">
                <View className='flex-1'/>
                <View className='pb-10 items-center'>
                    <Text className="text-white text-3xl font-bold text-center px-4 mx-4 mb-2">
                        Welcome to Scheduler<Text className='text-purple-700'>++</Text>
                    </Text>
                    <Text className="text-neutral-500 text-xs font-bold text-center px-4 mx-10">
                        An easy to use app to track your assignments with a little twist.
                    </Text>
                </View>
                {isLoginFormVisible ? (
                    <View className='mx-10 mb-20'>
                        <TextInput 
                            className='bg-neutral-800 text-white p-4 rounded-lg mb-3'
                            placeholder="Email"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <TextInput 
                            className='bg-neutral-800 text-white p-4 rounded-lg mb-3'
                            placeholder="Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Pressable
                            className={`p-4 rounded-lg flex-row items-center justify-center ${
                                submitHovered ? 'bg-purple-800' : 'bg-purple-700'
                            }`}
                            onPress={handleLogin}
                            onPressIn={() => setSubmitHovered(true)} 
                            onPressOut={() => setSubmitHovered(false)}
                        >
                            <Text className="text-neutral-900 text-lg font-bold px-3">Login in</Text>
                        </Pressable>
                    </View>
                ) : (
                    <Pressable
                        className={`p-4 rounded-lg flex-row items-center justify-center mx-10 mb-20 ${
                            hovered ? 'bg-purple-800' : 'bg-purple-700'
                        }`}
                        onPress={() => setLoginFormVisible(true)} 
                        onPressIn={() => setHovered(true)} 
                        onPressOut={() => setHovered(false)} 
                    >
                        <Image source={require('../assets/images/schoology-logo.png')} className='w-10 h-10'/>
                        <Text className="text-neutral-900 text-lg font-bold px-3">Login with Schoology</Text>
                    </Pressable>
                )}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}
