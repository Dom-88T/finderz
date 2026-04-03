/**
 * FINDERZ - Dashboard Screen
 * 
 * Main hub after user logs in. Shows:
 * 1. Location selector
 * 2. Service categories search
 * 3. Available professionals in the area
 * 4. Quick access buttons
 * 
 * Dummy data included for testing - replace with real API calls in production.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';

/**
 * DUMMY DATA - All types of services and professionals
 * 
 * In production, this would come from an API endpoint.
 * Data structure:
 * - id: Unique identifier
 * - name: Professional's name
 * - service: Type of service they provide
 * - rating: Star rating out of 5
 * - reviews: Number of reviews
 * - price: Starting price for the service
 * - location: Area/neighborhood
 * - image: Profile image (placeholder)
 * - verified: Whether verified by community
 */
const DUMMY_PROFESSIONALS = [
  {
    id: '1',
    name: 'Chisom Okafor',
    service: 'Electrician',
    rating: 4.8,
    reviews: 47,
    price: '₦5,000 - ₦15,000',
    location: 'Yaba, Lagos',
    verified: true,
    bio: '15 years experience in electrical installations and repairs',
  },
  {
    id: '2',
    name: 'Tunde Adeniran',
    service: 'Plumber',
    rating: 4.6,
    reviews: 34,
    price: '₦3,000 - ₦12,000',
    location: 'Victoria Island, Lagos',
    verified: true,
    bio: 'Expert in fixing pipes, leaks, and bathroom fixtures',
  },
  {
    id: '3',
    name: 'Kunle Bello',
    service: 'Builder/Carpenter',
    rating: 4.9,
    reviews: 52,
    price: '₦8,000 - ₦25,000',
    location: 'Ikeja, Lagos',
    verified: true,
    bio: 'Construction and carpentry work for homes and offices',
  },
  {
    id: '4',
    name: 'Amara Eze',
    service: 'Barber',
    rating: 4.7,
    reviews: 28,
    price: '₦1,500 - ₦3,000',
    location: 'Surulere, Lagos',
    verified: true,
    bio: 'Professional barber with modern cutting techniques',
  },
  {
    id: '5',
    name: 'Bola Obi',
    service: 'House Cleaner',
    rating: 4.5,
    reviews: 19,
    price: '₦2,000 - ₦8,000',
    location: 'Lekki, Lagos',
    verified: true,
    bio: 'Deep cleaning and regular maintenance services',
  },
  {
    id: '6',
    name: 'Zainab Ibrahim',
    service: 'Tailor',
    rating: 4.7,
    reviews: 31,
    price: '₦1,000 - ₦5,000',
    location: 'Shomolu, Lagos',
    verified: true,
    bio: 'Custom tailoring and clothing alterations',
  },
  {
    id: '7',
    name: 'Marcus Nwankwo',
    service: 'AC Technician',
    rating: 4.8,
    reviews: 25,
    price: '₦4,000 - ₦10,000',
    location: 'Alagbole, Lagos',
    verified: true,
    bio: 'Air conditioning installation, repair, and maintenance',
  },
  {
    id: '8',
    name: 'Grace Ogunwale',
    service: 'Interior Designer',
    rating: 4.9,
    reviews: 41,
    price: '₦10,000 - ₦50,000',
    location: 'Ikoyi, Lagos',
    verified: true,
    bio: 'Professional interior design consultation and implementation',
  },
];

// Service categories available
const SERVICE_CATEGORIES = [
  'Electrician',
  'Plumber',
  'Builder',
  'Barber',
  'Cleaner',
  'Tailor',
  'Painter',
  'AC Tech',
  'Mechanic',
  'Welder',
];

export default function DashboardScreen() {
  const router = useRouter();

  // State management
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProfessionals, setFilteredProfessionals] = useState(DUMMY_PROFESSIONALS);

  // Styling
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    scrollContent: {
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 40,
    },
    // Header with greeting
    headerSection: {
      marginBottom: 20,
    },
    greeting: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 4,
    },
    subGreeting: {
      fontSize: 12,
      color: '#7F8C8D',
    },
    // Location selector
    locationSection: {
      marginBottom: 16,
    },
    locationLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: 6,
      textTransform: 'uppercase',
    },
    locationButton: {
      borderWidth: 1,
      borderColor: '#D5DBDB',
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: '#F5F5F5',
    },
    locationButtonText: {
      fontSize: 13,
      color: '#555555',
      fontWeight: '500',
    },
    // Search bar
    searchSection: {
      marginBottom: 20,
    },
    searchInput: {
      borderWidth: 1,
      borderColor: '#D5DBDB',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 13,
      backgroundColor: '#F5F5F5',
      color: '#000000',
    },
    // Category buttons
    categorySection: {
      marginBottom: 20,
    },
    categoryLabel: {
      fontSize: 11,
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: 8,
      textTransform: 'uppercase',
    },
    categoryScroll: {
      marginHorizontal: -16,
      paddingHorizontal: 16,
    },
    categoryButton: {
      borderWidth: 1,
      borderColor: '#95A5A6',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginRight: 8,
      backgroundColor: '#FFFFFF',
    },
    categoryButtonActive: {
      backgroundColor: '#2C3E50',
      borderColor: '#2C3E50',
    },
    categoryButtonText: {
      fontSize: 12,
      color: '#555555',
    },
    categoryButtonTextActive: {
      color: '#FFFFFF',
    },
    // Results header
    resultsHeader: {
      fontSize: 12,
      fontWeight: '600',
      color: '#2C3E50',
      marginBottom: 12,
      textTransform: 'uppercase',
    },
    // Professional card
    professionalCard: {
      borderWidth: 1,
      borderColor: '#E0E0E0',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      backgroundColor: '#FAFAFA',
    },
    professionalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    professionalName: {
      fontSize: 14,
      fontWeight: '600',
      color: '#000000',
      marginBottom: 2,
    },
    serviceType: {
      fontSize: 12,
      color: '#7F8C8D',
      fontWeight: '500',
      marginBottom: 4,
    },
    ratingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    stars: {
      fontSize: 11,
      color: '#F39C12',
      marginRight: 4,
    },
    rating: {
      fontSize: 11,
      color: '#555555',
      fontWeight: '600',
    },
    reviews: {
      fontSize: 10,
      color: '#95A5A6',
    },
    bioText: {
      fontSize: 11,
      color: '#666666',
      lineHeight: 16,
      marginBottom: 8,
    },
    priceLocation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    price: {
      fontSize: 12,
      fontWeight: '600',
      color: '#2C3E50',
    },
    location: {
      fontSize: 11,
      color: '#7F8C8D',
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 8,
    },
    viewButton: {
      flex: 1,
      backgroundColor: '#2C3E50',
      borderRadius: 6,
      paddingVertical: 8,
      alignItems: 'center',
    },
    viewButtonText: {
      color: '#FFFFFF',
      fontSize: 11,
      fontWeight: '600',
    },
    chatButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#2C3E50',
      borderRadius: 6,
      paddingVertical: 8,
      alignItems: 'center',
    },
    chatButtonText: {
      color: '#2C3E50',
      fontSize: 11,
      fontWeight: '600',
    },
    verifiedBadge: {
      backgroundColor: '#27AE60',
      borderRadius: 3,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    verifiedText: {
      fontSize: 9,
      color: '#FFFFFF',
      fontWeight: '600',
    },
  });

  // Handle search
  const handleSearch = (text) => {
    setSearchQuery(text);
    
    // Filter by service type or professional name
    const filtered = DUMMY_PROFESSIONALS.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase()) ||
      p.service.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredProfessionals(filtered);
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    const filtered = DUMMY_PROFESSIONALS.filter(p =>
      p.service.toLowerCase() === category.toLowerCase()
    );
    setFilteredProfessionals(filtered);
    setSearchQuery('');
  };

  // Render professional card
  const renderProfessionalCard = ({ item }) => (
    <View style={styles.professionalCard}>
      <View style={styles.professionalHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.professionalName}>{item.name}</Text>
          <Text style={styles.serviceType}>{item.service}</Text>
        </View>
        {item.verified && (
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ Verified</Text>
          </View>
        )}
      </View>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <Text style={styles.stars}>★★★★★</Text>
        <Text style={styles.rating}>{item.rating}</Text>
        <Text style={styles.reviews}>({item.reviews} reviews)</Text>
      </View>

      {/* Bio */}
      <Text style={styles.bioText}>{item.bio}</Text>

      {/* Price and Location */}
      <View style={styles.priceLocation}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.location}>📍 {item.location}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => router.push(`/laborer/profile?id=${item.id}`)}
        >
          <Text style={styles.viewButtonText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => router.push(`/chat/negotiation?id=${item.id}`)}
        >
          <Text style={styles.chatButtonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Greeting */}
        <View style={styles.headerSection}>
          <Text style={styles.greeting}>Welcome Back! 👋</Text>
          <Text style={styles.subGreeting}>Find trusted professionals for any service</Text>
        </View>

        {/* Location Selector */}
        <View style={styles.locationSection}>
          <Text style={styles.locationLabel}>📍 Service Location</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationButtonText}>{selectedLocation} ▼</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by professional name or service..."
            placeholderTextColor="#95A5A6"
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>

        {/* Category Buttons */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryLabel}>📋 Filter by Service</Text>
          <ScrollView
            style={styles.categoryScroll}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {SERVICE_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  searchQuery === '' && filteredProfessionals.length === DUMMY_PROFESSIONALS.length
                    ? {}
                    : styles.categoryButtonActive,
                ]}
                onPress={() => handleCategoryFilter(category)}
              >
                <Text style={styles.categoryButtonText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results */}
        <Text style={styles.resultsHeader}>
          Available Professionals ({filteredProfessionals.length})
        </Text>

        <FlatList
          data={filteredProfessionals}
          renderItem={renderProfessionalCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
