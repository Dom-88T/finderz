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
  { id: '1', name: 'Chisom Okafor', service: 'Electrician', rating: 4.8, reviews: 47, price: '₦5,000 - ₦15,000', location: 'Yaba, Lagos', verified: true, bio: '15 years experience in electrical installations' },
  { id: '2', name: 'Tunde Adeniran', service: 'Plumber', rating: 4.6, reviews: 34, price: '₦3,000 - ₦12,000', location: 'Victoria Island, Lagos', verified: true, bio: 'Expert in fixing pipes and leaks' },
  { id: '3', name: 'Kunle Bello', service: 'Builder', rating: 4.9, reviews: 52, price: '₦8,000 - ₦25,000', location: 'Ikeja, Lagos', verified: true, bio: 'Construction and carpentry specialist' },
  { id: '4', name: 'Amara Eze', service: 'Barber', rating: 4.7, reviews: 28, price: '₦1,500 - ₦3,000', location: 'Surulere, Lagos', verified: true, bio: 'Professional barber with modern techniques' },
  { id: '5', name: 'Bola Obi', service: 'Cleaner', rating: 4.5, reviews: 19, price: '₦2,000 - ₦8,000', location: 'Lekki, Lagos', verified: true, bio: 'Deep cleaning and maintenance' },
  { id: '6', name: 'Zainab Ibrahim', service: 'Tailor', rating: 4.7, reviews: 31, price: '₦1,000 - ₦5,000', location: 'Shomolu, Lagos', verified: true, bio: 'Custom tailoring and alterations' },
  { id: '7', name: 'Marcus Nwankwo', service: 'AC Technician', rating: 4.8, reviews: 25, price: '₦4,000 - ₦10,000', location: 'Alagbole, Lagos', verified: true, bio: 'AC installation and maintenance' },
  { id: '8', name: 'Grace Ogunwale', service: 'Graphic Designer', rating: 4.9, reviews: 41, price: '₦10,000 - ₦50,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Professional graphic design services' },
  { id: '9', name: 'Seun Alabi', service: 'Mechanic', rating: 4.6, reviews: 38, price: '₦4,000 - ₦20,000', location: 'Mushin, Lagos', verified: true, bio: 'Car repair and maintenance expert' },
  { id: '10', name: 'Tayo Okafor', service: 'Welder', rating: 4.7, reviews: 23, price: '₦3,000 - ₦10,000', location: 'Oshodi, Lagos', verified: true, bio: 'Professional welding services' },
  { id: '11', name: 'Ngozi Eze', service: 'Beautician', rating: 4.8, reviews: 56, price: '₦2,000 - ₦8,000', location: 'Badagry, Lagos', verified: true, bio: 'Makeup and beauty styling' },
  { id: '12', name: 'Adebayo Ayoola', service: 'Carpenter', rating: 4.6, reviews: 29, price: '₦5,000 - ₦15,000', location: 'Gbagada, Lagos', verified: true, bio: 'Furniture and woodwork specialist' },
  { id: '13', name: 'Chioma Okoro', service: 'Home Tutor', rating: 4.9, reviews: 45, price: '₦2,000 - ₦5,000', location: 'Ogba, Lagos', verified: true, bio: 'Expert in Mathematics and Sciences' },
  { id: '14', name: 'Solomon Nkosi', service: 'Painter', rating: 4.5, reviews: 35, price: '₦3,000 - ₦12,000', location: 'Alimosho, Lagos', verified: true, bio: 'Interior and exterior painting' },
  { id: '15', name: 'Adekunle Bando', service: 'Gas Fitter', rating: 4.7, reviews: 18, price: '₦2,000 - ₦7,000', location: 'Epe, Lagos', verified: true, bio: 'Gas pipeline installation and repair' },
  { id: '16', name: 'Jumoke Adeyemi', service: 'Photographer', rating: 4.8, reviews: 52, price: '₦15,000 - ₦50,000', location: 'Ajah, Lagos', verified: true, bio: 'Professional photography for all events' },
  { id: '17', name: 'Chinedu Uba', service: 'Electrician', rating: 4.6, reviews: 41, price: '₦4,000 - ₦12,000', location: 'Somolu, Lagos', verified: true, bio: 'Electrical repairs and installations' },
  { id: '18', name: 'Fatima Aliyu', service: 'Hairstylist', rating: 4.9, reviews: 63, price: '₦1,000 - ₦4,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Expert hair styling and treatment' },
  { id: '19', name: 'Kemi Oladele', service: 'Chef', rating: 4.7, reviews: 38, price: '₦10,000 - ₦30,000', location: 'Lekki, Lagos', verified: true, bio: 'Professional catering and cooking' },
  { id: '20', name: 'Rade Okonkwo', service: 'Plumber', rating: 4.8, reviews: 47, price: '₦3,000 - ₦10,000', location: 'Shomolu, Lagos', verified: true, bio: 'Expert plumbing solutions' },
  { id: '21', name: 'Blessing Amakiri', service: 'Web Developer', rating: 4.7, reviews: 29, price: '₦30,000 - ₦100,000', location: 'Victoria Island, Lagos', verified: true, bio: 'Full-stack web development' },
  { id: '22', name: 'Adenuga Bankole', service: 'AC Technician', rating: 4.6, reviews: 32, price: '₦3,000 - ₦9,000', location: 'Yaba, Lagos', verified: true, bio: 'AC repair and servicing' },
  { id: '23', name: 'Folake Adeyemi', service: 'Cleaner', rating: 4.8, reviews: 44, price: '₦2,000 - ₦6,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Professional cleaning services' },
  { id: '24', name: 'Ibrahim Sule', service: 'Driver', rating: 4.5, reviews: 26, price: '₦3,000 - ₦8,000', location: 'Alimosho, Lagos', verified: true, bio: 'Reliable and safe driving services' },
  { id: '25', name: 'Adaeze Mbaka', service: 'Makeup Artist', rating: 4.9, reviews: 51, price: '₦5,000 - ₦20,000', location: 'Surulere, Lagos', verified: true, bio: 'Professional makeup for all occasions' },
  { id: '26', name: 'Oluwaseun Obi', service: 'Locksmith', rating: 4.6, reviews: 22, price: '₦2,000 - ₦7,000', location: 'Gbagada, Lagos', verified: true, bio: 'Lock repair and installation' },
  { id: '27', name: 'Sandra Okafor', service: 'Nutritionist', rating: 4.8, reviews: 35, price: '₦5,000 - ₦15,000', location: 'Lekki, Lagos', verified: true, bio: 'Diet and nutrition consultation' },
  { id: '28', name: 'Damilare Adesegun', service: 'Personal Trainer', rating: 4.7, reviews: 39, price: '₦3,000 - ₦10,000', location: 'Yaba, Lagos', verified: true, bio: 'Professional fitness coaching' },
  { id: '29', name: 'Uche Nwosu', service: 'UI/UX Designer', rating: 4.9, reviews: 28, price: '₦25,000 - ₦80,000', location: 'Gbagada, Lagos', verified: true, bio: 'Digital design excellence' },
  { id: '30', name: 'Miriam Adeyinka', service: 'Florist', rating: 4.7, reviews: 33, price: '₦5,000 - ₦20,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Beautiful flower arrangements' },
  { id: '31', name: 'Kwame Asante', service: 'Videographer', rating: 4.8, reviews: 41, price: '₦20,000 - ₦60,000', location: 'Victoria Island, Lagos', verified: true, bio: 'Professional video production' },
  { id: '32', name: 'Zara Khalil', service: 'Legal Advisor', rating: 4.9, reviews: 24, price: '₦15,000 - ₦50,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Corporate legal consultation' },
  { id: '33', name: 'Obi Ejiofor', service: 'Real Estate Agent', rating: 4.6, reviews: 37, price: '₦5,000 - ₦100,000', location: 'Lekki, Lagos', verified: true, bio: 'Property sales and leasing' },
  { id: '34', name: 'Hafsat Musa', service: 'Tax Consultant', rating: 4.8, reviews: 19, price: '₦10,000 - ₦40,000', location: 'VI, Lagos', verified: true, bio: 'Tax planning and filing' },
  { id: '35', name: 'Ridwan Ademoye', service: 'Accountant', rating: 4.7, reviews: 31, price: '₦8,000 - ₦30,000', location: 'Yaba, Lagos', verified: true, bio: 'Bookkeeping and accounting services' },
  { id: '36', name: 'Louise Okonkwo', service: 'Travel Agent', rating: 4.8, reviews: 44, price: '₦5,000 - ₦25,000', location: 'Lekki Lagos', verified: true, bio: 'Travel planning and bookings' },
  { id: '37', name: 'Chukwu Mathew', service: 'Tour Guide', rating: 4.6, reviews: 28, price: '₦3,000 - ₦12,000', location: 'Badagry, Lagos', verified: true, bio: 'Expert tour guiding services' },
  { id: '38', name: 'Abeni Adeosun', service: 'Tailor', rating: 4.9, reviews: 52, price: '₦1,500 - ₦6,000', location: 'Ebute Metta, Lagos', verified: true, bio: 'Quality tailoring and design' },
  { id: '39', name: 'Peter Adeleke', service: 'Phone Repair', rating: 4.7, reviews: 39, price: '₦2,000 - ₦8,000', location: 'Oshodi, Lagos', verified: true, bio: 'Phone repair and replacement' },
  { id: '40', name: 'Nneka Okafor', service: 'Computer Repair', rating: 4.8, reviews: 35, price: '₦3,000 - ₦10,000', location: 'Ikeja, Lagos', verified: true, bio: 'Computer and laptop repair' },
  { id: '41', name: 'Tunde Oyedele', service: 'Car Wash', rating: 4.6, reviews: 41, price: '₦2,000 - ₦5,000', location: 'Lekki, Lagos', verified: true, bio: 'Professional car detailing' },
  { id: '42', name: 'Ngozi Uchenna', service: 'Dry Cleaning', rating: 4.7, reviews: 32, price: '₦1,000 - ₦3,000', location: 'Surulere, Lagos', verified: true, bio: 'Quality dry cleaning services' },
  { id: '43', name: 'Yusuf Hamzat', service: 'Laundry Service', rating: 4.5, reviews: 25, price: '₦500 - ₦2,000', location: 'Mushin, Lagos', verified: true, bio: 'Regular laundry and ironing' },
  { id: '44', name: 'Ayo Olatunji', service: 'Security Guard', rating: 4.8, reviews: 38, price: '₦3,000 - ₦8,000', location: 'VI, Lagos', verified: true, bio: 'Professional security services' },
  { id: '45', name: 'Zainab Mustapha', service: 'Massage Therapist', rating: 4.9, reviews: 46, price: '₦3,000 - ₦10,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Therapeutic massage services' },
  { id: '46', name: 'David Okafor', service: 'Physiotherapist', rating: 4.7, reviews: 33, price: '₦5,000 - ₦15,000', location: 'Lekki, Lagos', verified: true, bio: 'Physical therapy and rehabilitation' },
  { id: '47', name: 'Suzy Adeyemi', service: 'Yoga Instructor', rating: 4.8, reviews: 29, price: '₦2,000 - ₦5,000', location: 'Yaba, Lagos', verified: true, bio: 'Certified yoga classes' },
  { id: '48', name: 'Ejiro Olugbemi', service: 'Gym Trainer', rating: 4.6, reviews: 42, price: '₦3,000 - ₦10,000', location: 'VI, Lagos', verified: true, bio: 'Personal fitness training' },
  { id: '49', name: 'Amina Sani', service: 'Language Tutor', rating: 4.9, reviews: 37, price: '₦2,000 - ₦6,000', location: 'Gbagada, Lagos', verified: true, bio: 'English and French tutoring' },
  { id: '50', name: 'Clement Eze', service: 'Music Teacher', rating: 4.7, reviews: 26, price: '₦3,000 - ₦8,000', location: 'Somolu, Lagos', verified: true, bio: 'Piano and guitar lessons' },
  { id: '51', name: 'Foluso Adeyemi', service: 'Painting', rating: 4.5, reviews: 20, price: '₦30,000 - ₦100,000', location: 'Lekki, Lagos', verified: true, bio: 'Fine art and portrait painting' },
  { id: '52', name: 'Ibrahim Adamu', service: 'Courier', rating: 4.6, reviews: 34, price: '₦1,000 - ₦5,000', location: 'Gbagada, Lagos', verified: true, bio: 'Fast and reliable delivery' },
  { id: '53', name: 'Blessing Okechukwu', service: 'Art Teacher', rating: 4.8, reviews: 28, price: '₦2,000 - ₦5,000', location: 'Yaba, Lagos', verified: true, bio: 'Visual arts tutoring' },
  { id: '54', name: 'Jessica Okafor', service: 'Driving Instructor', rating: 4.7, reviews: 40, price: '₦2,000 - ₦6,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Professional driving lessons' },
  { id: '55', name: 'Mohammed Aliyu', service: 'Generator Repair', rating: 4.6, reviews: 23, price: '₦3,000 - ₦10,000', location: 'Alimosho, Lagos', verified: true, bio: 'Generator servicing and repair' },
  { id: '56', name: 'Oluwatoyin Adekunle', service: 'Solar Installation', rating: 4.9, reviews: 31, price: '₦50,000 - ₦200,000', location: 'Lekki, Lagos', verified: true, bio: 'Solar panel installation' },
  { id: '57', name: 'Gideon Adeyeme', service: 'Mechanic', rating: 4.7, reviews: 36, price: '₦3,000 - ₦15,000', location: 'Ikeja, Lagos', verified: true, bio: 'Vehicle maintenance expert' },
  { id: '58', name: 'Funmi Ayokunle', service: 'Cleaner', rating: 4.8, reviews: 39, price: '₦2,000 - ₦7,000', location: 'VI, Lagos', verified: true, bio: 'Residential and office cleaning' },
  { id: '59', name: 'Raji Ogunwale', service: 'Data Analyst', rating: 4.9, reviews: 18, price: '₦20,000 - ₦80,000', location: 'Gbagada, Lagos', verified: true, bio: 'Data analysis and visualization' },
  { id: '60', name: 'Caroline Oluwaseun', service: 'Mobile App Developer', rating: 4.8, reviews: 24, price: '₦40,000 - ₦150,000', location: 'Ikoyi, Lagos', verified: true, bio: 'iOS and Android app development' },
  { id: '61', name: 'Taiwo Okafor', service: 'Barber', rating: 4.7, reviews: 45, price: '₦1,000 - ₦3,000', location: 'Yaba, Lagos', verified: true, bio: 'Expert barber services' },
  { id: '62', name: 'Aisha Mohammed', service: 'Insurance Agent', rating: 4.6, reviews: 21, price: '₦5,000 - ₦50,000', location: 'VI, Lagos', verified: true, bio: 'Insurance consultation and sales' },
  { id: '63', name: 'Victor Ejiro', service: 'Bicycle Repair', rating: 4.7, reviews: 17, price: '₦1,000 - ₦5,000', location: 'Mushin, Lagos', verified: true, bio: 'Bicycle maintenance and repair' },
  { id: '64', name: 'Chioma Adeyemi', service: 'Laptop Repair', rating: 4.8, reviews: 32, price: '₦2,000 - ₦10,000', location: 'Gbagada, Lagos', verified: true, bio: 'Expert laptop repair services' },
  { id: '65', name: 'Samuel Adekunle', service: 'TV Repair', rating: 4.6, reviews: 28, price: '₦2,000 - ₦8,000', location: 'Somolu, Lagos', verified: true, bio: 'Television repair and servicing' },
  { id: '66', name: 'Blessing Njoku', service: 'Appliance Repair', rating: 4.7, reviews: 34, price: '₦2,000 - ₦10,000', location: 'Lekki, Lagos', verified: true, bio: 'Home appliance repair' },
  { id: '67', name: 'Aderonke Adeosun', service: 'Swimming Coach', rating: 4.9, reviews: 25, price: '₦3,000 - ₦10,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Professional swimming instruction' },
  { id: '68', name: 'Chinedu Obi', service: 'Fitness Coach', rating: 4.8, reviews: 38, price: '₦3,000 - ₦12,000', location: 'VI, Lagos', verified: true, bio: 'Holistic fitness coaching' },
  { id: '69', name: 'Fatimah Ademiluyi', service: 'Life Coach', rating: 4.9, reviews: 33, price: '₦5,000 - ₦20,000', location: 'Lekki, Lagos', verified: true, bio: 'Personal development coaching' },
  { id: '70', name: 'Oluwaseun Adeleke', service: 'Electrician', rating: 4.6, reviews: 43, price: '₦4,000 - ₦14,000', location: 'Ikeja, Lagos', verified: true, bio: 'Electrical wiring and repairs' },
  { id: '71', name: 'Justina Onwuka', service: 'Plumber', rating: 4.8, reviews: 39, price: '₦3,000 - ₦11,000', location: 'Gbagada, Lagos', verified: true, bio: 'Quality plumbing work' },
  { id: '72', name: 'Emeka Okonkwo', service: 'Builder', rating: 4.7, reviews: 44, price: '₦7,000 - ₦24,000', location: 'VI, Lagos', verified: true, bio: 'Construction and masonry' },
  { id: '73', name: 'Adenike Adegunle', service: 'Cleaner', rating: 4.6, reviews: 36, price: '₦1,500 - ₦5,000', location: 'Yaba, Lagos', verified: true, bio: 'Efficient cleaning services' },
  { id: '74', name: 'Rantimi Adeyemi', service: 'Painter', rating: 4.8, reviews: 31, price: '₦2,500 - ₦10,000', location: 'Somolu, Lagos', verified: true, bio: 'Professional painting services' },
  { id: '75', name: 'Seun Adeleke', service: 'AC Technician', rating: 4.7, reviews: 29, price: '₦3,500 - ₦9,500', location: 'Lekki, Lagos', verified: true, bio: 'AC expert services' },
  { id: '76', name: 'Stella Okonkwo', service: 'Tailor', rating: 4.8, reviews: 47, price: '₦1,200 - ₦5,500', location: 'Ikeja, Lagos', verified: true, bio: 'Skilled tailoring' },
  { id: '77', name: 'Lanre Olatunji', service: 'Mechanic', rating: 4.9, reviews: 33, price: '₦3,500 - ₦18,000', location: 'Gbagada, Lagos', verified: true, bio: 'Expert mechanic' },
  { id: '78', name: 'Priscilla Amebo', service: 'Barber', rating: 4.6, reviews: 34, price: '₦1,200 - ₦2,800', location: 'Lekki, Lagos', verified: true, bio: 'Quality barber' },
  { id: '79', name: 'Karim Hassan', service: 'Welder', rating: 4.7, reviews: 20, price: '₦2,500 - ₦8,500', location: 'Alimosho, Lagos', verified: true, bio: 'Professional welding' },
  { id: '80', name: 'Blessing Awoniyi', service: 'Beautician', rating: 4.8, reviews: 51, price: '₦1,500 - ₦7,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Beauty and makeup expert' },
  { id: '81', name: 'Oladipo Akeem', service: 'Driver', rating: 4.6, reviews: 29, price: '₦2,500 - ₦7,500', location: 'VI, Lagos', verified: true, bio: 'Safe driving services' },
  { id: '82', name: 'Mfon Ekpo', service: 'Cleaner', rating: 4.7, reviews: 42, price: '₦1,800 - ₦6,000', location: 'Yaba, Lagos', verified: true, bio: 'Reliable cleaning' },
  { id: '83', name: 'Abiodun Okafor', service: 'Carpenter', rating: 4.8, reviews: 27, price: '₦4,500 - ₦13,500', location: 'Gbagada, Lagos', verified: true, bio: 'Quality carpentry' },
  { id: '84', name: 'Zainab Usman', service: 'Hairstylist', rating: 4.9, reviews: 58, price: '₦1,000 - ₦4,500', location: 'Somolu, Lagos', verified: true, bio: 'Expert hair styling' },
  { id: '85', name: 'Chukwudi Njoku', service: 'Gas Fitter', rating: 4.6, reviews: 16, price: '₦1,800 - ₦6,500', location: 'Lekki, Lagos', verified: true, bio: 'Gas services' },
  { id: '86', name: 'Tunde Adeojo', service: 'Electrician', rating: 4.8, reviews: 44, price: '₦4,500 - ₦14,500', location: 'Ikoyi, Lagos', verified: true, bio: 'Electrical expert' },
  { id: '87', name: 'Grace Mbah', service: 'Home Tutor', rating: 4.9, reviews: 48, price: '₦1,800 - ₦4,500', location: 'VI, Lagos', verified: true, bio: 'Excellent tuition' },
  { id: '88', name: 'Rasheed Adebayo', service: 'Plumber', rating: 4.7, reviews: 36, price: '₦2,800 - ₦11,000', location: 'Ikeja, Lagos', verified: true, bio: 'Plumbing specialist' },
  { id: '89', name: 'Chioma Ugwu', service: 'Chef', rating: 4.8, reviews: 40, price: '₦8,000 - ₦28,000', location: 'Gbagada, Lagos', verified: true, bio: 'Professional culinary' },
  { id: '90', name: 'Kabiru Mohammed', service: 'Builder', rating: 4.6, reviews: 38, price: '₦6,500 - ₦22,000', location: 'Alimosho, Lagos', verified: true, bio: 'Building services' },
  { id: '91', name: 'Jennifer Obanor', service: 'Photographer', rating: 4.9, reviews: 49, price: '₦12,000 - ₦45,000', location: 'Lekki, Lagos', verified: true, bio: 'Professional photography' },
  { id: '92', name: 'Usman Kareem', service: 'AC Technician', rating: 4.7, reviews: 26, price: '₦3,200 - ₦8,500', location: 'Somolu, Lagos', verified: true, bio: 'AC services' },
  { id: '93', name: 'Favour Okafor', service: 'Makeup Artist', rating: 4.8, reviews: 44, price: '₦4,500 - ₦18,000', location: 'Ikoyi, Lagos', verified: true, bio: 'Beauty artist' },
  { id: '94', name: 'Gideon Adeyemi', service: 'Locksmith', rating: 4.6, reviews: 19, price: '₦1,500 - ₦6,000', location: 'VI, Lagos', verified: true, bio: 'Lock services' },
  { id: '95', name: 'Amina Salami', service: 'Dry Cleaning', rating: 4.7, reviews: 29, price: '₦800 - ₦2,500', location: 'Alagbole, Lagos', verified: true, bio: 'Professional cleaning' },
  { id: '96', name: 'Ibrahim Olaleye', service: 'Mechanic', rating: 4.8, reviews: 40, price: '₦3,200 - ₦16,000', location: 'Yaba, Lagos', verified: true, bio: 'Auto repair expert' },
  { id: '97', name: 'Ngozi Okezie', service: 'Florist', rating: 4.9, reviews: 36, price: '₦4,500 - ₦18,000', location: 'Gbagada, Lagos', verified: true, bio: 'Flower arrangements' },
  { id: '98', name: 'Segun Adeyinka', service: 'Painter', rating: 4.7, reviews: 33, price: '₦2,800 - ₦11,000', location: 'Lekki, Lagos', verified: true, bio: 'Painting specialist' },
  { id: '99', name: 'Zainab Yakubu', service: 'Cleaner', rating: 4.8, reviews: 46, price: '₦1,600 - ₦5,500', location: 'Ikoyi, Lagos', verified: true, bio: 'Cleaning services' },
  { id: '100', name: 'Olalekan Adebayo', service: 'Web Developer', rating: 4.9, reviews: 27, price: '₦25,000 - ₦90,000', location: 'VI, Lagos', verified: true, bio: 'Web development expert' },
  { id: '101', name: 'Deborah Okafor', service: 'Personal Trainer', rating: 4.8, reviews: 36, price: '₦2,800 - ₦9,500', location: 'Somolu, Lagos', verified: true, bio: 'Fitness training' },
  { id: '102', name: 'Adex Mohammed', service: 'Security Guard', rating: 4.6, reviews: 31, price: '₦2,500 - ₦7,000', location: 'Ikeja, Lagos', verified: true, bio: 'Security services' },
];

// Service categories available
const SERVICE_CATEGORIES = [
  'Electrician', 'Plumber', 'Builder', 'Barber', 'Cleaner', 'Tailor', 'Painter', 
  'AC Technician', 'Mechanic', 'Welder', 'Carpenter', 'Gas Fitter', 'Locksmith', 
  'Florist', 'Photographer', 'Chef', 'Videographer', 'Graphic Designer', 'Web Developer',
  'Mobile App Developer', 'UI/UX Designer', 'Data Analyst', 'Accountant', 'Tax Consultant',
  'Legal Advisor', 'Real Estate Agent', 'Insurance Agent', 'Travel Agent', 'Tour Guide',
  'Driver', 'Courier', 'Laundry Service', 'Dry Cleaning', 'Car Wash', 'Car Mechanic',
  'Bicycle Repair', 'Phone Repair', 'Computer Repair', 'Laptop Repair', 'TV Repair',
  'Appliance Repair', 'Generator Repair', 'Solar Installation', 'Security Guard', 'Personal Trainer',
  'Yoga Instructor', 'Gym Trainer', 'Nutritionist', 'Beautician', 'Hairstylist', 'Makeup Artist',
  'Massage Therapist', 'Physiotherapist', 'Home Tutor', 'Language Tutor', 'Music Teacher',
  'Art Teacher', 'Driving Instructor', 'Swimming Coach', 'Fitness Coach', 'Life Coach'
];

export default function DashboardScreen() {
  const router = useRouter();

  // State management
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    
    // Filter by service type or professional name
    const filtered = DUMMY_PROFESSIONALS.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase()) ||
      p.service.toLowerCase().includes(text.toLowerCase())
    );
    
    setFilteredProfessionals(filtered);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    if (selectedCategory === category) {
      setFilteredProfessionals(DUMMY_PROFESSIONALS);
    } else {
      const filtered = DUMMY_PROFESSIONALS.filter(p =>
        p.service.toLowerCase() === category.toLowerCase()
      );
      setFilteredProfessionals(filtered);
    }
    setSearchQuery('');
  };

  // Render professional card
  const renderProfessionalCard = ({ item }: { item: typeof DUMMY_PROFESSIONALS[0] }) => (
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
                  selectedCategory === category ? styles.categoryButtonActive : {},
                ]}
                onPress={() => handleCategoryFilter(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category ? styles.categoryButtonTextActive : {},
                ]}>
                  {category}
                </Text>
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
