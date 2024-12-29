import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Recommendations = ({ route }) => {
  const { userId } = route.params;
  const [formData, setFormData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingData(true);
        const response = await axios.get(
          `${API_BASE_URL}/get-user-preferences?userId=${userId}`
        );

        if (response.data?.status === "success") {
          setFormData(response.data.preferences);
        } else {
          setFormData(null);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setFormData(null);
      } finally {
        setLoadingData(false);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Call your backend AI logic here
      const result = await axios.post(`${API_BASE_URL}/predict_suggestion`, {
        userId,
      });
      setSuggestion(result.data.recommendation || "No recommendation available");
    } catch (err) {
      console.error("Prediction error:", err);
      setSuggestion("Could not fetch recommendation at this time.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6a51ae" />
        <Text style={styles.loadingText}>Loading your data...</Text>
      </View>
    );
  }

  if (!formData) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          No user data found. Please complete your profile first.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Your Profile</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Age Group: {formData.ageGroup}</Text>
          <Text style={styles.label}>Gender: {formData.gender}</Text>
          <Text style={styles.label}>
            Relationship: {formData.relationshipStatus}
          </Text>
          <Text style={styles.label}>
            Living Situation: {formData.livingSituation}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Get Personalized Plan</Text>
          )}
        </TouchableOpacity>

        {suggestion ? (
          <View style={styles.card}>
            <Text style={styles.header}>Your Recommendation</Text>
            <Text style={styles.suggestion}>{suggestion}</Text>
          </View>
        ) : null}
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#6a51ae",
  },
  errorText: {
    color: "red",
    textAlign: "center",
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
