import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView, Platform, StyleSheet, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import axios from 'axios'; 
import * as SecureStore from 'expo-secure-store';
import Checkbox from 'expo-checkbox';

export default function Login() {
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 
  const [testingMode, setTestingMode] = useState(true);  // <-- Add testingMode state
  const router = useRouter();

  // Check for the cookie when the component mounts
  useEffect(() => {
    const checkCookie = async () => {
      if (testingMode) {
        // If in testing mode, skip login logic and go to dashboard directly
        router.push('/(tabs)/dashboard');
        return;
      }

      const cookie = await SecureStore.getItemAsync('cookie');
      if (cookie) {
        // Verify if the cookie is valid by making a request
        const isCookieValid = await verifyCookie(cookie);
        if (isCookieValid) {
          router.push('/(tabs)/dashboard');
        } else {
          // If cookie is invalid, clear it and try logging in using saved credentials
          await SecureStore.deleteItemAsync('cookie');
          attemptSavedLogin();
        }
      } else {
        // No cookie, attempt to login using saved credentials if available
        attemptSavedLogin();
      }
    };

    checkCookie(); // Call the function to check if the user is already logged in
  }, [router, testingMode]);  // <-- Include testingMode in dependencies

  // Function to verify if the cookie is still valid
  const verifyCookie = async (cookie: string) => {
    try {
      const response = await axios.get('http://192.168.1.95:8000/verify-cookie', {
        headers: {
          Cookie: cookie,
        },
      });
      return response.status === 200; // Cookie is valid if server responds correctly
    } catch (error) {
      return false; // If there's an error or the server responds incorrectly, cookie is invalid
    }
  };

  const handleLogin = async (emailToLogin = email, passwordToLogin = password) => {
    Keyboard.dismiss();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://192.168.1.95:8000/login', {
        email: emailToLogin,
        password: passwordToLogin,
      });
      const { name, value } = response.data;
      
      if (name && value) {
        // Save cookie value
        await SecureStore.setItemAsync('cookie', `${name}=${value}`);
        console.log(`Cookie Name: ${name}, Value: ${value}`);

        if (isChecked) {
          // Save email and password if "Remember Me" is checked
          await SecureStore.setItemAsync('email', emailToLogin);
          await SecureStore.setItemAsync('password', passwordToLogin);
        }

        router.push('/(tabs)/dashboard');
      } else {
        setError('Login failed. Invalid credentials.');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Attempt to log in using saved credentials if cookie doesn't work
  const attemptSavedLogin = async () => {
    const savedEmail = await SecureStore.getItemAsync('email');
    const savedPassword = await SecureStore.getItemAsync('password');
    if (savedEmail && savedPassword) {
      handleLogin(savedEmail, savedPassword); // Automatically try login with saved credentials
    } else {
      setLoginFormVisible(true); // Show login form if no saved credentials
    }
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
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={isChecked}
                onValueChange={setIsChecked}
              />
              <Text style={styles.checkboxLabel}>Remember me</Text>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Pressable
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              onPress={() => handleLogin()}
              disabled={isSubmitting} 
            >
              <Text style={styles.buttonText}>{isSubmitting ? 'Logging In...' : 'Login'}</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={styles.button}
            onPress={() => setLoginFormVisible(true)}
          >
            <Image
              source={require('../assets/images/schoology-logo.png')}
              style={styles.logoImage}
            />
            <Text style={styles.buttonText}>Login with Schoology</Text>
          </Pressable>
        )}

        {/* Debugging - toggle testing mode */}
        <Pressable
          style={styles.button}
          onPress={() => setTestingMode(!testingMode)}
        >
          <Text style={styles.buttonText}>
            {testingMode ? 'Disable Testing Mode' : 'Enable Testing Mode'}
          </Text>
        </Pressable>
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
  buttonDisabled: {
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
  errorText: {
    color: '#fca5a5',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
});
