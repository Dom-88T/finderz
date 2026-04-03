/**
 * FINDERZ - User Profile & Settings
 * 
 * Users can manage their:
 * - Profile information
 * - Account settings
 * - Preferences
 * - Account type
 * - Logout
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 24,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#2C3E50',
      textTransform: 'uppercase',
      marginBottom: 12,
    },
    settingItem: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      paddingHorizontal: 14,
      paddingVertical: 12,
      marginBottom: 8,
      backgroundColor: '#FAFAFA',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    settingLabel: {
      fontSize: 13,
      color: '#000000',
      fontWeight: '500',
    },
    settingValue: {
      fontSize: 12,
      color: '#7F8C8D',
    },
    logoutButton: {
      backgroundColor: '#E74C3C',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    logoutButtonText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '600',
    },
  });

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Clear user session and navigate to welcome
            router.replace('/');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Full Name</Text>
            <Text style={styles.settingValue}>John Doe</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Email</Text>
            <Text style={styles.settingValue}>john@example.com</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Phone</Text>
            <Text style={styles.settingValue}>+2348012345678</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingValue}>Enabled →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingValue}>English →</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Text style={styles.settingValue}>Off →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help</Text>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>FAQ & Support</Text>
            <Text style={styles.settingValue}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>About Finderz</Text>
            <Text style={styles.settingValue}>v1.0</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
