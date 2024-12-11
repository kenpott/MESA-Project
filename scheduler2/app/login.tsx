import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Pressable, 
  Image, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Login() {
  const [hovered, setHovered] = useState(false);
  const [submitHovered, setSubmitHovered] = useState(false);
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    console.log('Pressed');
    router.push('/(tabs)/dashboard');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={[styles.flex1, styles.container]}>
        <View style={styles.flex1} />
        <View style={styles.welcomeContainer}>
          <Text style={styles.titleText}>
            Welcome to Scheduler<Text style={styles.purpleText}>++</Text>
          </Text>
          <Text style={styles.subtitleText}>
            An easy-to-use app to track your assignments with a little twist.
          </Text>
        </View>

        {isLoginFormVisible ? (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              style={[
                styles.button, 
                submitHovered && styles.buttonHovered
              ]}
              onPress={handleLogin}
              onPressIn={() => setSubmitHovered(true)}
              onPressOut={() => setSubmitHovered(false)}
            >
              <Text style={styles.buttonText}>Login</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={[
              styles.button, 
              styles.schoologyButton, 
              hovered && styles.buttonHovered
            ]}
            onPress={() => setLoginFormVisible(true)}
            onPressIn={() => setHovered(true)}
            onPressOut={() => setHovered(false)}
          >
            <Image 
              source={require('../assets/images/schoology-logo.png')} 
              style={styles.logoImage} 
            />
            <Text style={styles.buttonText}>Login with Schoology</Text>
          </Pressable>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    backgroundColor: '#0a0a0a',
    justifyContent: 'space-between',
  },
  welcomeContainer: {
    paddingBottom: 40,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  purpleText: {
    color: '#7e22ce',
  },
  subtitleText: {
    color: '#737373', 
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 40,
  },
  formContainer: {
    marginHorizontal: 40,
    marginBottom: 80,
  },
  input: {
    backgroundColor: '#262626',
    color: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7e22ce',
    marginHorizontal: 40,
    marginBottom: 80,
  },
  buttonHovered: {
    backgroundColor: '#6b21a8',
  },
  schoologyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#171717',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  logoImage: {
    width: 40,
    height: 40,
  },
});
