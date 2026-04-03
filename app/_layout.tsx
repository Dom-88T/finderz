/**
 * FINDERZ APP - Root Layout
 * 
 * This is the main layout file for the Finderz app.
 * It manages the overall navigation structure for:
 * - Welcome/Demo page
 * - Authentication (Login/Sign up)
 * - Main app (Dashboard, Search, Profiles, Chat)
 * 
 * Color Scheme:
 * - Background: White (#FFFFFF)
 * - Text: Black (#000000)
 * - Headers: Navy blue-ish grey (#2C3E50)
 * - Accents: Grey (#95A5A6, #7F8C8D)
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false, // Hide default headers - we'll create custom ones
          contentStyle: {
            backgroundColor: '#FFFFFF', // White background globally
          },
        }}
      >
        {/* Welcome/Demo Screen - First screen users see */}
        <Stack.Screen name="index" />

        {/* Authentication Screens */}
        <Stack.Screen 
          name="auth/login" 
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="auth/signup" 
          options={{ presentation: 'modal' }}
        />

        {/* Main App Navigation */}
        <Stack.Screen name="dashboard/index" />
        <Stack.Screen name="search/services" />
        <Stack.Screen name="laborer/profile" />
        <Stack.Screen name="chat/negotiation" />
        <Stack.Screen name="profile/settings" />
        <Stack.Screen name="profile/myservices" />
      </Stack>
      
      {/* Status bar styling - light background with dark text */}
      <StatusBar barStyle="dark-content" />
    </>
  );
}

