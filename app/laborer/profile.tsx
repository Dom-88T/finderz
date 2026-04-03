/**
 * FINDERZ - Laborer/Professional Profile Screen
 * 
 * Detailed view of a professional's profile including:
 * - Professional info and ratings
 * - Full bio and experience
 * - Service details and pricing
 * - Customer reviews
 * - Contact and booking options
 * - Bargain negotiation button
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

/**
 * Sample reviews data - in production this comes from the backend
 */
const SAMPLE_REVIEWS = [
  {
    id: '1',
    author: 'Ade T.',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Very professional and completed the work on time. Highly recommend!',
  },
  {
    id: '2',
    author: 'Toyin K.',
    rating: 5,
    date: '1 month ago',
    comment: 'Great service! Fixed my electrical issue perfectly. Will hire again.',
  },
  {
    id: '3',
    author: 'Fola M.',
    rating: 4,
    date: '1 month ago',
    comment: 'Good work but took a bit longer than expected. Overall satisfied.',
  },
];

// Sample professional full details
const PROFESSIONAL_DETAILS = {
  '1': {
    name: 'Chisom Okafor',
    service: 'Electrician',
    rating: 4.8,
    reviews: 47,
    price: '₦5,000 - ₦15,000',
    location: 'Yaba, Lagos',
    verified: true,
    bio: '15 years of professional electrical work',
    bio_full: 'Chisom has been providing electrical services for over 15 years. Specialized in residential and commercial installations, repairs, and maintenance. Licensed and insured. Reliable, punctual, and dedicated to quality work.',
    services: [
      'Electrical Installation',
      'Rewiring',
      'Troubleshooting',
      'Maintenance',
      'Solar Installation',
    ],
    yearsExperience: 15,
    completedJobs: 200,
    phone: '+234 801 234 5678',
    email: 'chisom@finderz.com',
  },
  '2': {
    name: 'Tunde Adeniran',
    service: 'Plumber',
    rating: 4.6,
    reviews: 34,
    price: '₦3,000 - ₦12,000',
    location: 'Victoria Island, Lagos',
    verified: true,
    bio: 'Expert plumbing solutions',
    bio_full: 'Tunde is an expert plumber with 12 years of experience in pipe installation, repairs, and maintenance. Skilled with modern plumbing fixtures and emergency repairs.',
    services: [
      'Pipe Installation',
      'Leak Repair',
      'Bathroom Fixtures',
      'Emergency Repairs',
      'Drain Cleaning',
    ],
    yearsExperience: 12,
    completedJobs: 156,
    phone: '+234 802 345 6789',
    email: 'tunde@finderz.com',
  },
};

export default function LaborerProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Get professional details (use default if not found)
  const professionalId = (Array.isArray(id) ? id[0] : id) || '1';
  const professional = PROFESSIONAL_DETAILS[professionalId as keyof typeof PROFESSIONAL_DETAILS] || PROFESSIONAL_DETAILS['1'];
  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
    // Header with back button
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    backButton: {
      fontSize: 24,
      marginRight: 10,
    },
    headerTitle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '600',
      color: '#000000',
    },
    // Profile header card
    profileCard: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
      backgroundColor: '#F9F9F9',
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 4,
    },
    serviceTitle: {
      fontSize: 14,
      color: '#2C3E50',
      fontWeight: '600',
      marginBottom: 8,
    },
    badge: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    verifiedBadge: {
      backgroundColor: '#27AE60',
      borderRadius: 4,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 8,
    },
    verifiedText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '600',
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    stars: {
      fontSize: 14,
      color: '#F39C12',
      marginRight: 6,
    },
    rating: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000000',
      marginRight: 8,
    },
    reviews: {
      fontSize: 12,
      color: '#7F8C8D',
    },
    // Section header
    sectionHeader: {
      fontSize: 13,
      fontWeight: '700',
      color: '#2C3E50',
      marginBottom: 12,
      marginTop: 16,
      textTransform: 'uppercase',
    },
    // Info row
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    infoLabel: {
      fontSize: 12,
      color: '#7F8C8D',
      fontWeight: '500',
    },
    infoValue: {
      fontSize: 13,
      fontWeight: '600',
      color: '#000000',
    },
    // Bio text
    bioText: {
      fontSize: 13,
      color: '#555555',
      lineHeight: 20,
      marginBottom: 12,
      backgroundColor: '#F5F5F5',
      padding: 12,
      borderRadius: 6,
    },
    // Service list
    serviceList: {
      marginBottom: 12,
    },
    serviceItem: {
      fontSize: 12,
      color: '#555555',
      paddingVertical: 6,
      paddingLeft: 12,
    },
    // Review card
    reviewCard: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 6,
      padding: 12,
      marginBottom: 10,
      backgroundColor: '#FAFAFA',
    },
    reviewerName: {
      fontSize: 12,
      fontWeight: '600',
      color: '#000000',
      marginBottom: 4,
    },
    reviewMeta: {
      fontSize: 10,
      color: '#7F8C8D',
      marginBottom: 6,
    },
    reviewStars: {
      fontSize: 12,
      color: '#F39C12',
      marginBottom: 6,
    },
    reviewComment: {
      fontSize: 11,
      color: '#555555',
      lineHeight: 16,
    },
    // Action buttons
    buttonContainer: {
      marginTop: 20,
      marginBottom: 40,
    },
    negotiateButton: {
      backgroundColor: '#2C3E50',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 12,
    },
    negotiateButtonText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '600',
    },
    contactButton: {
      borderWidth: 1,
      borderColor: '#2C3E50',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    contactButtonText: {
      color: '#2C3E50',
      fontSize: 13,
      fontWeight: '600',
    },
  });

  const handleNegotiate = () => {
    // Navigate to chat/negotiation screen
    router.push(`/chat/negotiation?id=${id}`);
  };

  const handleContact = () => {
    Alert.alert(
      'Contact Professional',
      `Call/WhatsApp: ${professional.phone}`,
      [
        { text: 'Call', onPress: () => Alert.alert('Calling...', `Calling ${professional.phone}`) },
        { text: 'WhatsApp', onPress: () => Alert.alert('WhatsApp', `Opening WhatsApp`) },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Professional Profile</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>{professional.name}</Text>
          <Text style={styles.serviceTitle}>{professional.service}</Text>

          <View style={styles.badge}>
            {professional.verified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>✓ Verified</Text>
              </View>
            )}
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.rating}>{professional.rating}</Text>
            <Text style={styles.reviews}>({professional.reviews} reviews)</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Experience</Text>
            <Text style={styles.infoValue}>{professional.yearsExperience} years</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Completed Jobs</Text>
            <Text style={styles.infoValue}>{professional.completedJobs}+</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>{professional.location}</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.infoLabel}>Base Price</Text>
            <Text style={styles.infoValue}>{professional.price}</Text>
          </View>
        </View>

        {/* About Section */}
        <Text style={styles.sectionHeader}>About</Text>
        <Text style={styles.bioText}>{professional.bio_full}</Text>

        {/* Services Section */}
        <Text style={styles.sectionHeader}>Services Offered</Text>
        <View style={styles.serviceList}>
          {professional.services.map((service: string, index: number) => (
            <Text key={index} style={styles.serviceItem}>
              • {service}
            </Text>
          ))}
        </View>

        {/* Reviews Section */}
        <Text style={styles.sectionHeader}>Customer Reviews</Text>
        {SAMPLE_REVIEWS.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <Text style={styles.reviewerName}>{review.author}</Text>
            <Text style={styles.reviewMeta}>{review.date}</Text>
            <Text style={styles.reviewStars}>{'★'.repeat(review.rating)}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.negotiateButton}
            onPress={handleNegotiate}
          >
            <Text style={styles.negotiateButtonText}>💬 Chat & Negotiate Price</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContact}
          >
            <Text style={styles.contactButtonText}>📞 Contact Professional</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
