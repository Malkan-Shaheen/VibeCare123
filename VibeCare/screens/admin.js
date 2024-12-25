import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const AdminSignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const navigation = useNavigation();

  const handleLogin = () => {
    // No validation, directly navigate
    navigation.navigate("admindashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Portal</Text>
      <Text style={styles.subtitle}>Sign in to your admin account</Text>

      <View style={styles.inputContainer}>
        {(isUsernameFocused || username) && (
          <Text style={styles.floatingLabel}>Admin-name</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder={!isUsernameFocused ? "Admin-name" : ""}
          placeholderTextColor="#aaa"
          value={username}
          onFocus={() => setIsUsernameFocused(true)}
          onBlur={() => setIsUsernameFocused(false)}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        {(isPasswordFocused || password) && (
          <Text style={styles.floatingLabel}>Password</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder={!isPasswordFocused ? "Password" : ""}
          placeholderTextColor="#aaa"
          value={password}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.signinButton} onPress={handleLogin}>
        <Text style={styles.signinButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDE6E6",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    color: "#5c1060",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 15,
  },
  floatingLabel: {
    position: "absolute",
    top: -10,
    left: 15,
    fontSize: 12,
    color: "#8b3efa",
    backgroundColor: "#FDE6E6",
    paddingHorizontal: 5,
    zIndex: 1,
  },
  input: {
    width: "100%",
    backgroundColor: "#d1b7f7",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#4A4A4A",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#8b3efa",
  },
  signinButton: {
    backgroundColor: "#8b3efa",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 5,
    paddingHorizontal: 100,
  },
  signinButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdminSignIn;
