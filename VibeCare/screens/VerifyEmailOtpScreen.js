import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
} from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const VerifyEmailOtpScreen = ({ navigation, route }) => {
  const { Email, userId } = route.params;   // only using Email + userId for OTP
  const [otp, setOtp] = useState('');
  const [isOtpFocused, setIsOtpFocused] = useState(false);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const placeholderAnimation = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsOtpFocused(true);
    Animated.timing(placeholderAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsOtpFocused(false);
    if (!otp) {
      Animated.timing(placeholderAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setCustomAlertVisible(true);
  };

  const closeAlert = () => {
    setCustomAlertVisible(false);
  };

 const handleVerifyOtp = async () => {
  if (!otp) {
    showAlert("Alert", "Please enter the OTP");
    return;
  }

  console.log("🔹 Verifying OTP with payload:", {
    Email: Email.trim().toLowerCase(),
    otp: otp.trim().toString(),
    userId
  });

  try {
    const response = await axios.post(`${API_BASE_URL}/verifyOtp`, {
      Email: Email.trim().toLowerCase(),   // always lowercase
      otp: otp.trim().toString(),          // ensure string
      userId: userId,
    });

    console.log("✅ OTP verification API response:", response.data);

    if (response.data.status === "success") {
      showAlert("Success", "OTP verified successfully!");
      setTimeout(() => {
        setCustomAlertVisible(false);
        console.log("➡️ Navigating to ResetPasswordScreen with:", { Email, userId });
        navigation.navigate("ResetPasswordScreen", { Email, userId });
      }, 1000);
    } else {
      console.warn("⚠️ OTP invalid. Response message:", response.data.message);
      showAlert("Invalid OTP", response.data.message || "The OTP is invalid or expired.");
    }
  } catch (error) {
    console.error("❌ Error verifying OTP:", error);

    if (error.response) {
      console.error("📡 Server responded with error:", error.response.data);
    } else if (error.request) {
      console.error("📭 No response received from server. Request was:", error.request);
    } else {
      console.error("⚙️ Error setting up request:", error.message);
    }

    showAlert("Error", error.response?.data?.message || "Something went wrong, please try again.");
  }
};


  const resendOtp = async () => {
    try {
      await axios.post(`${API_BASE_URL}/send-email-otp`, {
        Email,
        userId,
      });
      showAlert("Success", "OTP resent to your email address.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      showAlert("Error", "Failed to resend OTP. Please try again.");
    }
  };

  const placeholderPosition = placeholderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [15, -10],
  });

  const placeholderFontSize = placeholderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 12],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the OTP sent to {Email}</Text>

      <View style={styles.inputContainer}>
        <View style={styles.floatingInputContainer}>
          {(isOtpFocused || otp) && (
            <Animated.Text
              style={[
                styles.floatingLabel,
                {
                  top: placeholderPosition,
                  fontSize: placeholderFontSize,
                },
              ]}
            >
              Enter OTP
            </Animated.Text>
          )}
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            onFocus={handleFocus}
            onBlur={handleBlur}
            keyboardType="numeric"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={resendOtp}>
        <Text style={styles.resendText}>Didn't receive OTP? Resend</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE6E6",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#4A4A4A',
  },
  title: {
    fontSize: 30,
    color: "#5c1060",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  floatingInputContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  floatingLabel: {
    position: 'absolute',
    left: 15,
    color: '#8b3efa',
    backgroundColor: '#FDE6E6',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#d1b7f7',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#4A4A4A',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#8b3efa',
  },
  button: {
    backgroundColor: '#8b3efa',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendText: {
    color: '#8b3efa',
    textAlign: 'center',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  alertBox: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  alertMessage: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: "#8b3efa",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  alertButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VerifyEmailOtpScreen;
