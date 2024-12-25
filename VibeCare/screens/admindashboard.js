import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const AdminDashboard = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>

      <View style={styles.quoteBox}>
        <Text style={styles.quote}>
          "Leadership is about making others better as a result of your presence."
        </Text>
      </View>

      <Image
        source={require('../assets/images/admin1.png')} // Placeholder admin image
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>
        Welcome, Admin! This is your control panel preview.
      </Text>

      {/* Static buttons just for display */}
      <TouchableOpacity style={[styles.button, styles.usersButton]}>
        <Text style={styles.buttonText}>Users Profile Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.storiesButton]}>
        <Text style={styles.buttonText}>Success Stories Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.feedbackButton]}>
        <Text style={styles.buttonText}>Feedback Management</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.vcButton]}>
        <Text style={styles.buttonText}>Virtual Counselling History</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDE9E6',
    padding: 20,
    alignItems: 'center',
    flexGrow: 1,
    top: 20,
  },
  heading: {
    fontSize: 38,
    top: 10,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  quoteBox: {
    backgroundColor: 'rgba(222, 185, 160, 1.0)',
    borderRadius: 20,
    padding: 16,
    top: 10,
    marginVertical: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  quote: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    marginVertical: 12,
    textAlign: 'center',
  },
  image: {
    width: 320,
    height: 240,
    borderRadius: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  usersButton: {
    backgroundColor: '#8b3efa', // Purple
  },
  storiesButton: {
    backgroundColor: '#eb5757', // Red
  },
  feedbackButton: {
    backgroundColor: '#27AE60', // Green
  },
  vcButton: {
    backgroundColor: '#2D9CDB', // Blue
  },
});

export default AdminDashboard;
