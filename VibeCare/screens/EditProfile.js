import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const EditProfileScreen = () => {
  const [profile, setProfile] = useState({
    Name: "Malkan",
    Username: "malkii",
    Email: "malkan@gmail.com",
  });

  const [originalProfile, setOriginalProfile] = useState({ ...profile });
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState("");

  // 🔐 Password states
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordOtpStep, setPasswordOtpStep] = useState(false);

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setCustomAlertVisible(true);
  };

  const closeAlert = () => setCustomAlertVisible(false);

  // ✅ Save Name & Username directly
  const handleSaveChanges = () => {
    setOriginalProfile((prev) => ({
      ...prev,
      Name: profile.Name,
      Username: profile.Username,
    }));
    showAlert("Success", "Changes saved successfully (dummy).");
  };

  // ✅ Email verification dummy
  const handleEmailVerification = () => {
    if (!profile.Email.includes("@")) {
      showAlert("Invalid Email", "Please enter a valid email address");
      return;
    }
    showAlert("OTP Sent", "Check your email (dummy OTP: 1234)");
    setOtpStep(true);
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setOriginalProfile((prev) => ({ ...prev, Email: profile.Email }));
      showAlert("Success", "Email updated successfully (dummy).");
      setOtpStep(false);
      setOtp("");
    } else {
      showAlert("Error", "Invalid OTP (dummy).");
    }
  };

  // 🔐 Password reset dummy
  const handlePasswordResetRequest = () => {
    if (newPassword.length < 6) {
      showAlert("Invalid Password", "Password must be at least 6 characters.");
      return;
    }
    showAlert("OTP Sent", "Check your email (dummy OTP: 1234)");
    setPasswordOtpStep(true);
  };

  const handleVerifyPasswordOtp = () => {
    if (otp === "1234") {
      showAlert("Success", "Password reset successfully (dummy).");
      setPasswordOtpStep(false);
      setOtp("");
      setNewPassword("");
    } else {
      showAlert("Error", "Invalid OTP (dummy).");
    }
  };

  // ✅ Decide button type
  const emailChanged = profile.Email !== originalProfile.Email;
  const nameOrUsernameChanged =
    profile.Name !== originalProfile.Name ||
    profile.Username !== originalProfile.Username;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Name */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profile.Name}
        onChangeText={(text) => handleChange("Name", text)}
      />

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={profile.Username}
        onChangeText={(text) => handleChange("Username", text)}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={profile.Email}
        onChangeText={(text) => handleChange("Email", text)}
        keyboardType="email-address"
      />

      {/* Password Reset */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="New Password"
          value={newPassword}
          secureTextEntry={!showPassword}
          onChangeText={setNewPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#333"
            style={{ marginLeft: -40 }}
          />
        </TouchableOpacity>
      </View>

      {/* Buttons */}
      {!otpStep && !passwordOtpStep ? (
        <>
          {emailChanged ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleEmailVerification}
            >
              <Text style={styles.saveButtonText}>Verify Email & Save</Text>
            </TouchableOpacity>
          ) : nameOrUsernameChanged ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          ) : newPassword ? (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handlePasswordResetRequest}
            >
              <Text style={styles.saveButtonText}>Verify Email & Reset Password</Text>
            </TouchableOpacity>
          ) : null}
        </>
      ) : otpStep ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleVerifyOtp}>
            <Text style={styles.saveButtonText}>Verify OTP</Text>
          </TouchableOpacity>
        </>
      ) : passwordOtpStep ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleVerifyPasswordOtp}
          >
            <Text style={styles.saveButtonText}>Verify OTP & Reset Password</Text>
          </TouchableOpacity>
        </>
      ) : null}

      {/* Custom Alert */}
      <Modal visible={customAlertVisible} transparent animationType="fade">
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

// --- styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE6E6",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    color: "#5c1060",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#d1b7f7",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#8b3efa",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#8b3efa",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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

export default EditProfileScreen;
