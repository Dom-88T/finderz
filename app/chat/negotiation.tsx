/**
 * FINDERZ - Chat & Negotiation Screen
 * 
 * This is where the magic happens! 💬
 * 
 * Users can:
 * - Chat with professionals in real-time
 * - Send negotiation messages
 * - Discuss custom pricing
 * - Share job details and requirements
 * - Eventually reach agreement on price
 * 
 * This demo shows message history and input.
 * In production, integrate with real messaging backend (Firebase, etc).
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

/**
 * Sample conversation - in production this comes from backend
 */
const SAMPLE_MESSAGES = [
  {
    id: '1',
    sender: 'professional', // 'user' or 'professional'
    text: 'Hi! Thanks for reaching out. How can I help you with electrical work today?',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    sender: 'user',
    text: 'Hi Chisom! I need to fix the wiring in my kitchen. It will take about 2 hours of work.',
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    sender: 'professional',
    text: 'Kitchen wiring, sure. That usually costs around ₦7,000-₦8,000 depending on complexity. Can I visit to assess?',
    timestamp: '10:34 AM',
  },
  {
    id: '4',
    sender: 'user',
    text: 'Can you do ₦5,500? That\'s my budget for this work.',
    timestamp: '10:36 AM',
  },
  {
    id: '5',
    sender: 'professional',
    text: 'Let me meet you halfway at ₦6,500. Quality materials aren\'t cheap, but for ₦6,500 I can use good components and do quality work.',
    timestamp: '10:38 AM',
  },
  {
    id: '6',
    sender: 'user',
    text: 'How about ₦6,000? If you can start tomorrow afternoon?',
    timestamp: '10:40 AM',
  },
  {
    id: '7',
    sender: 'professional',
    text: 'Deal! ₦6,000 and I\'ll start tomorrow at 2 PM. Send me your address and I\'ll confirm.',
    timestamp: '10:42 AM',
  },
];

// Professional name from dummy data
const PROFESSIONAL_NAMES = {
  '1': 'Chisom Okafor',
  '2': 'Tunde Adeniran',
};

export default function NegotiationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [inputText, setInputText] = useState('');
  const professionalId = (Array.isArray(id) ? id[0] : id) || '1';
  const professionalName = PROFESSIONAL_NAMES[professionalId as keyof typeof PROFESSIONAL_NAMES] || 'Professional';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    // Header
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
      backgroundColor: '#F9F9F9',
    },
    backButton: {
      fontSize: 20,
      marginRight: 12,
    },
    headerContent: {
      flex: 1,
    },
    headerName: {
      fontSize: 14,
      fontWeight: '600',
      color: '#000000',
    },
    headerStatus: {
      fontSize: 11,
      color: '#27AE60', // Green for online
      marginTop: 2,
    },
    // Messages container
    messagesContainer: {
      flex: 1,
      padding: 16,
    },
    // Message bubble
    messageBubble: {
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    // User message (right side)
    userMessageBubble: {
      justifyContent: 'flex-end',
    },
    userMessageText: {
      backgroundColor: '#2C3E50',
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
      maxWidth: '85%',
    },
    userMessageContent: {
      color: '#FFFFFF',
      fontSize: 13,
      lineHeight: 18,
    },
    // Professional message (left side)
    professionalMessageBubble: {
      justifyContent: 'flex-start',
    },
    professionalMessageText: {
      backgroundColor: '#E0E0E0',
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 10,
      maxWidth: '85%',
    },
    professionalMessageContent: {
      color: '#000000',
      fontSize: 13,
      lineHeight: 18,
    },
    // Message timestamp
    timestamp: {
      fontSize: 10,
      color: '#95A5A6',
      marginTop: 4,
      marginHorizontal: 6,
    },
    // Input area
    inputArea: {
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
      paddingHorizontal: 12,
      paddingVertical: 12,
      backgroundColor: '#FAFAFA',
      flexDirection: 'row',
      alignItems: 'flex-end',
      gap: 8,
    },
    // Text input
    textInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#D5DBDB',
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 13,
      color: '#000000',
      backgroundColor: '#FFFFFF',
      maxHeight: 100,
    },
    // Send button
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#2C3E50',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonText: {
      fontSize: 18,
      color: '#FFFFFF',
    },
    // Agreement notification
    agreementBox: {
      backgroundColor: '#D5F4E6',
      borderLeftWidth: 4,
      borderLeftColor: '#27AE60',
      padding: 12,
      marginHorizontal: 16,
      marginBottom: 12,
      borderRadius: 6,
    },
    agreementTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: '#27AE60',
      marginBottom: 4,
    },
    agreementText: {
      fontSize: 12,
      color: '#1E5631',
      lineHeight: 16,
    },
  });

  // Handle send message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: (messages.length + 1).toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Auto-scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Simulate professional response after delay
    setTimeout(() => {
      const autoResponse = {
        id: (messages.length + 2).toString(),
        sender: 'professional',
        text: 'Thanks for the info. I\'m thinking about this. Let me confirm and get back to you soon!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, autoResponse]);
    }, 2000);
  };

  // Check if agreement was reached
  const agreementReached = messages.some(m => m.text.includes('Deal!'));

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerName}>{professionalName}</Text>
          <Text style={styles.headerStatus}>● Online</Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {/* Agreement notification if deal made */}
        {agreementReached && (
          <View style={styles.agreementBox}>
            <Text style={styles.agreementTitle}>✓ DEAL AGREED!</Text>
            <Text style={styles.agreementText}>
              Both parties have agreed on terms. You can now proceed with booking or arrange a service time.
            </Text>
          </View>
        )}

        {/* Message list */}
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'user'
                ? styles.userMessageBubble
                : styles.professionalMessageBubble,
            ]}
          >
            <View
              style={
                message.sender === 'user'
                  ? styles.userMessageText
                  : styles.professionalMessageText
              }
            >
              <Text
                style={
                  message.sender === 'user'
                    ? styles.userMessageContent
                    : styles.professionalMessageContent
                }
              >
                {message.text}
              </Text>
            </View>
            <Text style={styles.timestamp}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputArea}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Type your message or price suggestion..."
          placeholderTextColor="#95A5A6"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
        >
          <Text style={styles.sendButtonText}>➤</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
