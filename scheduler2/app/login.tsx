import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Image, TextInput, KeyboardAvoidingView, Platform, StyleSheet, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import axios from 'axios'; 
import * as SecureStore from 'expo-secure-store';
import Checkbox from 'expo-checkbox';

const ip = '192.168.1.95:8000';

export default function Login() {
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 
  const [isAutoLoginEnabled, setIsAutoLoginEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAutoLoginEnabled) {
      checkAndLoginAutomatically();
    } else {
      setLoginFormVisible(true);
    }
  }, [isAutoLoginEnabled, router]);

  const checkAndLoginAutomatically = async () => {
    const cookie = await SecureStore.getItemAsync('cookie');
    if (cookie) {
      const isCookieValid = await verifyCookie(cookie);
      if (isCookieValid) {
        router.push('/(tabs)/dashboard');
      } else {
        await SecureStore.deleteItemAsync('cookie');
        attemptSavedLogin();
      }
    } else {
      attemptSavedLogin();
    }
  };

  const verifyCookie = async (cookie: string) => {
    try {
      const response = await axios.get(`http://${ip}/verify-cookie`, {
        headers: {
          Cookie: cookie,
        },
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  const handleLogin = async (emailToLogin = email, passwordToLogin = password) => {
    Keyboard.dismiss();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://${ip}/login`, {
        email: emailToLogin,
        password: passwordToLogin,
      });
      const { name, value } = response.data;
      
      if (name && value) {
        await SecureStore.setItemAsync('cookie', `${name}=${value}`);
        console.log(`Cookie Name: ${name}, Value: ${value}`);

        if (isChecked) {
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

  const attemptSavedLogin = async () => {
    const savedEmail = await SecureStore.getItemAsync('email');
    const savedPassword = await SecureStore.getItemAsync('password');
    if (savedEmail && savedPassword) {
      handleLogin(savedEmail, savedPassword);
    } else {
      setLoginFormVisible(true); 
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
