/**
 * FINDERZ - My Services (For Service Providers)
 * 
 * Service providers can manage their offered services:
 * - List services they offer
 * - Set prices
 * - Update availability
 * - View service requests
 * - Manage bookings
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function MyServicesScreen() {
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
    serviceCard: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      padding: 14,
      marginBottom: 12,
      backgroundColor: '#FAFAFA',
    },
    serviceName: {
      fontSize: 14,
      fontWeight: '600',
      color: '#000000',
      marginBottom: 8,
    },
    serviceDetails: {
      fontSize: 12,
      color: '#7F8C8D',
      marginBottom: 4,
    },
    priceRow: {
      fontSize: 12,
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: 8,
    },
    buttonsRow: {
      flexDirection: 'row',
      gap: 8,
    },
    editButton: {
      flex: 1,
      backgroundColor: '#2C3E50',
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
    },
    editButtonText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '600',
    },
    addButton: {
      backgroundColor: '#27AE60',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontSize: 13,
      fontWeight: '600',
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 13,
      color: '#7F8C8D',
      marginTop: 40,
    },
  });

  // Sample services for this provider
  const myServices = [
    {
      id: '1',
      name: 'Electrical Installation',
      basePrice: '₦7,000',
      status: 'Available',
    },
    {
      id: '2',
      name: 'Fixing & Troubleshooting',
      basePrice: '₦5,000',
      status: 'Available',
    },
    {
      id: '3',
      name: 'Solar Installation',
      basePrice: '₦15,000',
      status: 'Available',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>My Services</Text>

        {myServices.length > 0 ? (
          <>
            {myServices.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDetails}>
                  Status: <Text style={{ color: '#27AE60' }}>{service.status}</Text>
                </Text>
                <Text style={styles.priceRow}>Base Price: {service.basePrice}</Text>
                <View style={styles.buttonsRow}>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>View Requests</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </>
        ) : (
          <Text style={styles.emptyText}>
            You haven't added any services yet. Tap the button below to get started!
          </Text>
        )}

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New Service</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
