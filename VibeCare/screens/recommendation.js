import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Recommendations = () => {
  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Your Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Age Group: 20-30</Text>
          <Text style={styles.label}>Gender: Female</Text>
          <Text style={styles.label}>Relationship: Single</Text>
          <Text style={styles.label}>Living Situation: With Family</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Personalized Plan</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.header}>Your Recommendation</Text>
          <Text style={styles.suggestion}>
            This is a dummy recommendation. In the real app, your personalized
            plan will appear here.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#f5f7ff",
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#4a2cba",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#6a51ae",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  suggestion: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },
});

export default Recommendations;
