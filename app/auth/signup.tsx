/**
 * FINDERZ - Sign Up Screen
 * 
 * Allows new users to create an account.
 * Collects:
 * - Full Name
 * - Email
 * - Phone Number
 * - Password
 * - Account type (Service Seeker or Service Provider)
 * 
 * Note: This is a demo version. In production, validate and store in backend.
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

export default function SignUpScreen() {
  const router = useRouter();

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountType, setAccountType] = useState('seeker'); // 'seeker' or 'provider'
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    // Header
    header: {
      marginBottom: 25,
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
      marginBottom: 20,
    },
    label: {
      fontSize: 13,
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: '#D5DBDB',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 12,
      fontSize: 14,
      color: '#000000',
      marginBottom: 14,
      backgroundColor: '#FAFAFA',
    },
    // Account type selector
    accountTypeContainer: {
      marginBottom: 20,
    },
    accountTypeLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: 10,
    },
    accountTypeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
    },
    accountTypeButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#D5DBDB',
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: 'center',
      backgroundColor: '#FAFAFA',
    },
    accountTypeButtonActive: {
      borderColor: '#2C3E50',
      backgroundColor: '#2C3E50',
    },
    accountTypeButtonText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#555555',
    },
    accountTypeButtonTextActive: {
      color: '#FFFFFF',
    },
    // Checkbox for terms
    termsRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
    },
    checkbox: {
      width: 18,
      height: 18,
      borderWidth: 1,
      borderColor: '#2C3E50',
      borderRadius: 3,
      marginRight: 10,
      marginTop: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkboxChecked: {
      backgroundColor: '#2C3E50',
    },
    termsText: {
      flex: 1,
      fontSize: 12,
      color: '#555555',
      lineHeight: 18,
    },
    // Sign up button
    signupButton: {
      backgroundColor: '#2C3E50',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    signupButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    // Login link
    loginSection: {
      alignItems: 'center',
      marginBottom: 30,
    },
    loginText: {
      fontSize: 13,
      color: '#555555',
      marginBottom: 8,
    },
    loginLink: {
      fontSize: 13,
      color: '#2C3E50',
      fontWeight: '600',
    },
  });

  // Handle sign up
  const handleSignUp = () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }
    if (!password || password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Error', 'Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      // In production: const response = await registerUser({fullName, email, phone, password, accountType});
      
      setTimeout(() => {
        setLoading(false);
        
        // Show success message
        Alert.alert(
          'Account Created!',
          `Welcome ${fullName}! Your account has been created.\n\nYou are set up as a ${accountType === 'seeker' ? 'Service Seeker' : 'Service Provider'}.`,
          [
            {
              text: 'Continue',
              onPress: () => router.push('/dashboard'),
            },
          ]
        );
      }, 1500);
    } catch (error) {
      setLoading(false);
      Alert.alert('Sign Up Failed', 'Please check your information and try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>Join Finderz to find or offer services in your community</Text>
        </View>

        {/* Sign Up Form */}
        <View style={styles.formSection}>
          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#95A5A6"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
          />

          {/* Email */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            placeholderTextColor="#95A5A6"
            value={email}
            onChangeText={setEmail}
            editable={!loading}
            keyboardType="email-address"
          />

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+2348012345678"
            placeholderTextColor="#95A5A6"
            value={phone}
            onChangeText={setPhone}
            editable={!loading}
            keyboardType="phone-pad"
          />

          {/* Password */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a strong password"
            placeholderTextColor="#95A5A6"
            value={password}
            onChangeText={setPassword}
            editable={!loading}
            secureTextEntry={true}
          />

          {/* Confirm Password */}
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            placeholderTextColor="#95A5A6"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
            secureTextEntry={true}
          />
        </View>

        {/* Account Type Selection */}
        <View style={styles.accountTypeContainer}>
          <Text style={styles.accountTypeLabel}>I am a:</Text>
          <View style={styles.accountTypeRow}>
            {/* Service Seeker Option */}
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                accountType === 'seeker' && styles.accountTypeButtonActive,
              ]}
              onPress={() => setAccountType('seeker')}
            >
              <Text 
                style={[
                  styles.accountTypeButtonText,
                  accountType === 'seeker' && styles.accountTypeButtonTextActive,
                ]}
              >
                Service Seeker
              </Text>
            </TouchableOpacity>

            {/* Service Provider Option */}
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                accountType === 'provider' && styles.accountTypeButtonActive,
              ]}
              onPress={() => setAccountType('provider')}
            >
              <Text 
                style={[
                  styles.accountTypeButtonText,
                  accountType === 'provider' && styles.accountTypeButtonTextActive,
                ]}
              >
                Service Provider
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms Checkbox */}
        <View style={styles.termsRow}>
          <TouchableOpacity
            style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}
            onPress={() => setAgreeTerms(!agreeTerms)}
          >
            {agreeTerms && <Text style={{ color: '#FFFFFF', fontWeight: 'bold' }}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the Terms of Service and Privacy Policy
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signupButton}
          onPress={handleSignUp}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.signupButtonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginSection}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.replace('/auth/login')}>
            <Text style={styles.loginLink}>Log In Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
