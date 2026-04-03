/**
 * FINDERZ - Service Search Screen
 * 
 * Specialized screen for searching services with advanced filters.
 * Users can filter by:
 * - Service category
 * - Price range
 * - Rating
 * - Location
 * - Availability
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ServicesSearchScreen() {
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000000',
      marginBottom: 16,
      textAlign: 'center',
    },
    description: {
      fontSize: 13,
      color: '#7F8C8D',
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20,
    },
    button: {
      backgroundColor: '#2C3E50',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Advanced Service Search</Text>
      <Text style={styles.description}>
        Use the Dashboard to search for services. This screen is coming soon with advanced filtering options!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/dashboard')}
      >
        <Text style={styles.buttonText}>← Go to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
