import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const CaretakerSignIn = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertCallback, setAlertCallback] = useState(null);

  const showCustomAlert = (title, message, onPress = null) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setCustomAlertVisible(true);
    setAlertCallback(() => onPress);
  };

  const closeAlert = () => {
    setCustomAlertVisible(false);
    if (alertCallback) {
      alertCallback();
      setAlertCallback(null);
    }
  };

  const handleLogin = async () => {
    if (name.trim() === '' || code.length !== 6) {
      showCustomAlert('Invalid Input', 'Please enter a valid name and 6-digit code.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/verify-caretaker`, {
        name,
        otp: code,
      });

     if (response.data.status === 'success') {
  console.log("Caretaker ID:", response.data.caretakerId);
  console.log("User ID:", response.data.userId);

  showCustomAlert('Success', `Welcome, ${name}!`, () => {
    navigation.navigate('caretakerdashboard', {
      caretakerId: response.data.caretakerId,
      userId: response.data.userId, // pass userId forward if needed
      name,
    });
  });
}
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      showCustomAlert('Login Failed', error.response?.data?.message || 'Server error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caretaker Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name(as set by patient)"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter 6-digit code(as set by patient)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        maxLength={6}
        value={code}
        onChangeText={setCode}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Custom Alert Modal */}
      <Modal
        visible={customAlertVisible}
        transparent
        animationType="fade"
        onRequestClose={closeAlert}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={closeAlert}>
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CaretakerSignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f4ff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#6a1b9a',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#8b3efa',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // --- Custom Alert Styles (same as AdminSignIn) ---
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alertMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: '#8b3efa',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  alertButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
