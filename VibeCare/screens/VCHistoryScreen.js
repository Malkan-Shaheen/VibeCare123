import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const VCHistoryScreen = () => {
  // Dummy static chat sessions
  const [sessions] = useState([
    {
      date: '2025-09-15',
      messages: [
        { sender: 'user', text: 'Hello, I need some help.', time: '10:30 AM' },
        { sender: 'bot', text: 'Of course! I’m here to listen.', time: '10:31 AM' },
        { sender: 'user', text: 'I feel anxious these days.', time: '10:32 AM' },
        { sender: 'bot', text: 'That’s completely okay. Let’s work through it together.', time: '10:33 AM' },
      ],
    },
    {
      date: '2025-09-10',
      messages: [
        { sender: 'user', text: 'Hi, are you available?', time: '02:15 PM' },
        { sender: 'bot', text: 'Yes, I’m here to support you.', time: '02:16 PM' },
      ],
    },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Virtual Counseling History</Text>

        {sessions.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#666' }}>
            No chat history found
          </Text>
        ) : (
          sessions.map((session, index) => (
            <View key={index} style={styles.sessionContainer}>
              <Text style={styles.sessionDate}>🗓 {session.date}</Text>
              {session.messages.map((msg, i) => (
                <View
                  key={i}
                  style={[
                    styles.messageBubble,
                    msg.sender === 'user' ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text style={styles.messageSender}>
                    {msg.sender === 'user' ? 'You' : 'VibeCare'}
                  </Text>
                  <Text style={styles.messageText}>{msg.text}</Text>
                  <Text style={styles.timestamp}>{msg.time}</Text>
                </View>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE9E6',
    padding: 20,
  },
  header: {
    fontSize: 28,
    marginTop: 30,
    fontWeight: 'bold',
    color: '#610d1b',
    marginBottom: 20,
    textAlign: 'center',
  },
  sessionContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  sessionDate: {
    fontSize: 16,
    color: '#610d1b',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageBubble: {
    padding: 14,
    borderRadius: 16,
    marginVertical: 8,
    maxWidth: '100%',
  },
  userBubble: {
    backgroundColor: '#f3f3f3',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  botBubble: {
    backgroundColor: '#e1d4f3',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageSender: {
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
    marginTop: 6,
  },
});

export default VCHistoryScreen;
