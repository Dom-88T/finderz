/**
 * FINDERZ - Login Screen
 * 
 * Allows existing users to log in with their credentials.
 * Supports:
 * - Email/Phone login
 * - Password input
 * - Remember me option
 * - Links to sign up and forgot password
 * 
 * Note: This is a demo version with mock authentication.
 * In production, integrate with a real backend API.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  // State management for form inputs
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Styling object
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    safeArea: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    // Back button area
    header: {
      marginBottom: 30,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 8,
    },
    headerSubtitle: {
      fontSize: 13,
      color: '#7F8C8D',
    },
    // Form section
    formSection: {
      marginBottom: 30,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: 8,
    },
    // Input field styling
    input: {
      borderWidth: 1,
      borderColor: '#D5DBDB', // Light grey border
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 14,
      color: '#000000',
      marginBottom: 16,
      backgroundColor: '#FAFAFA',
    },
    // Row for checkbox and remember me text
    rememberRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#2C3E50',
      borderRadius: 4,
      marginRight: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: '#2C3E50',
    },
    checkboxtext: {
      fontSize: 13,
      color: '#555555',
    },
    // Forgot password link
    forgotPassword: {
      fontSize: 12,
      color: '#2C3E50',
      fontWeight: '500',
    },
    // Button styling
    loginButton: {
      backgroundColor: '#2C3E50',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    // Bottom section - sign up prompt
    signupSection: {
      marginTop: 40,
      alignItems: 'center',
    },
    signupText: {
      fontSize: 13,
      color: '#555555',
      marginBottom: 8,
    },
    signupLink: {
      fontSize: 13,
      color: '#2C3E50',
      fontWeight: '600',
    },
  });

  // Handle login press
  const handleLogin = async () => {
    // Validation
    if (!emailOrPhone.trim()) {
      Alert.alert('Error', 'Please enter email or phone number');
      return;
    }
    if (!password) {
      Alert.alert('Error', 'Please enter password');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call delay
      // In production, replace this with actual API call
      // Example: const response = await loginUser(emailOrPhone, password);
      
      setTimeout(() => {
        // Demo authentication - any email/password works
        // In production, validate against real credentials
        
        setLoading(false);
        
        // Navigate to dashboard on successful login
        router.push('/dashboard/index');
      }, 1500);
    } catch (error) {
      setLoading(false);
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Welcome Back</Text>
          <Text style={styles.headerSubtitle}>Log in to access your account and find services</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formSection}>
          {/* Email or Phone Input */}
          <Text style={styles.label}>Email or Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com or +2348012345678"
            placeholderTextColor="#95A5A6"
            value={emailOrPhone}
            onChangeText={setEmailOrPhone}
            editable={!loading}
            keyboardType="email-address"
          />

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#95A5A6"
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            secureTextEntry={true} // Hide password
          />

          {/* Remember Me Checkbox */}
          <View style={styles.rememberRow}>
            <TouchableOpacity
              style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe && <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxtext}>Remember me for next time</Text>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity onPress={() => Alert.alert('Help', 'Password reset feature coming soon')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging In...' : 'Log In'}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Prompt */}
        <View style={styles.signupSection}>
          <Text style={styles.signupText}>Don't have an account yet?</Text>
          <TouchableOpacity onPress={() => router.replace('/auth/signup')}>
            <Text style={styles.signupLink}>Create One Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
