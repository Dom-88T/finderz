/**
 * FINDERZ - Welcome & Demo Screen
 * 
 * This is the first screen users see when they open the app.
 * It provides options to:
 * 1. Log in if they already have an account
 * 2. Sign up to create a new account
 * 3. Try demo mode to explore the app without logging in
 * 
 * The demo mode lets users browse available services and profiles
 * without committing to registration.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  // Router hook for navigation
  const router = useRouter();

  // Styles object - all styling in one place for easy customization
  const styles = StyleSheet.create({
    // Main container - full screen with white background
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF', // Pure white
    },
    
    // Safe area for accounting notches and bottom bars
    safeArea: {
      flex: 1,
    },
    
    // Scroll view for content
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },

    // Header section with app name and description
    headerSection: {
      alignItems: 'center',
      marginBottom: 40,
      marginTop: 20,
    },

    // App name/logo
    appName: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#000000', // Black
      marginBottom: 10,
    },

    // Tagline text
    tagline: {
      fontSize: 14,
      color: '#7F8C8D', // Grey
      textAlign: 'center',
      lineHeight: 20,
    },

    // Feature description section
    featureSection: {
      marginBottom: 40,
      backgroundColor: '#F5F5F5', // Light grey background
      borderRadius: 12,
      padding: 20,
      borderLeftWidth: 4,
      borderLeftColor: '#2C3E50', // Navy grey
    },

    // Feature title
    featureTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2C3E50', // Navy grey
      marginBottom: 10,
    },

    // Feature description text
    featureText: {
      fontSize: 13,
      color: '#555555',
      lineHeight: 20,
    },

    // Features list
    featureList: {
      marginBottom: 40,
    },

    // Individual feature item
    featureItem: {
      flexDirection: 'row',
      marginBottom: 15,
      alignItems: 'flex-start',
    },

    // Feature bullet point
    featureBullet: {
      fontSize: 20,
      color: '#2C3E50',
      marginRight: 12,
      fontWeight: 'bold',
    },

    // Feature item text
    featureItemText: {
      flex: 1,
      fontSize: 13,
      color: '#555555',
      lineHeight: 18,
    },

    // Button container - holds all action buttons
    buttonContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 20,
    },

    // Primary button - Sign up (highlighted)
    primaryButton: {
      backgroundColor: '#2C3E50', // Navy grey
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 12,
    },

    // Primary button text
    primaryButtonText: {
      color: '#FFFFFF', // White text
      fontSize: 16,
      fontWeight: '600',
    },

    // Secondary button - Log in (outlined)
    secondaryButton: {
      backgroundColor: '#FFFFFF',
      borderWidth: 2,
      borderColor: '#2C3E50', // Navy grey border
      paddingVertical: 13,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 12,
    },

    // Secondary button text
    secondaryButtonText: {
      color: '#2C3E50', // Navy grey text
      fontSize: 16,
      fontWeight: '600',
    },

    // Demo button - try without login
    demoButton: {
      backgroundColor: '#95A5A6', // Grey
      paddingVertical: 13,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignItems: 'center',
    },

    // Demo button text
    demoButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '500',
    },

    // Divider text
    dividerText: {
      textAlign: 'center',
      color: '#95A5A6', // Grey
      fontSize: 12,
      marginVertical: 12,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header with app name */}
        <View style={styles.headerSection}>
          <Text style={styles.appName}>FINDERZ</Text>
          <Text style={styles.tagline}>
            Find trusted skilled professionals in your community
          </Text>
        </View>

        {/* Main feature section */}
        <View style={styles.featureSection}>
          <Text style={styles.featureTitle}>What is Finderz?</Text>
          <Text style={styles.featureText}>
            Connect with verified electricians, plumbers, builders, barbers, and other skilled professionals instantly. Get services done right, at fair prices, with community reviews.
          </Text>
        </View>

        {/* Key features list */}
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureItemText}>
              <Text style={{ fontWeight: '600', color: '#000000' }}>Find Services</Text> - Search for any professional service in your area
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureItemText}>
              <Text style={{ fontWeight: '600', color: '#000000' }}>Check Ratings</Text> - See reviews and ratings from verified customers
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureItemText}>
              <Text style={{ fontWeight: '600', color: '#000000' }}>Negotiate Prices</Text> - Chat and bargain directly with professionals
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureBullet}>✓</Text>
            <Text style={styles.featureItemText}>
              <Text style={{ fontWeight: '600', color: '#000000' }}>Safe & Secure</Text> - All professionals verified and community-backed
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.buttonContainer}>
          {/* Primary CTA - New users should sign up */}
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/auth/signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started - Sign Up</Text>
          </TouchableOpacity>

          {/* Existing users login */}
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/auth/login')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Already have account? Log In</Text>
          </TouchableOpacity>

          <Text style={styles.dividerText}>or</Text>

          {/* Demo mode - try without registration */}
          <TouchableOpacity 
            style={styles.demoButton}
            onPress={() => router.replace('/dashboard')}
            activeOpacity={0.8}
          >
            <Text style={styles.demoButtonText}>Try Demo - Browse Without Logging In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
