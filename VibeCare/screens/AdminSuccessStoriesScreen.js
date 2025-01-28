import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}`;

const AdminSuccessStoriesScreen = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "info",
    onConfirm: () => {},
  });

  const showAlert = (title, message, type = "info", onConfirm = () => {}) => {
    setAlertConfig({ title, message, type, onConfirm });
    setAlertVisible(true);
  };

  const hideAlert = () => setAlertVisible(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/success-stories`);
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
      showAlert("Error", "Failed to fetch success stories", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteStory = (id) => {
    showAlert(
      "Delete Story",
      "Are you sure you want to delete this story?",
      "warning",
      async () => {
        try {
          await axios.delete(`${API_URL}/success-stories/${id}`);
          fetchStories(); // Refresh the list after deletion
          showAlert("Success", "Story deleted successfully", "success");
        } catch (error) {
          console.error('Error deleting story:', error);
          showAlert("Error", "Failed to delete the story", "error");
        }
      }
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Success Stories Management</Text>
        <Text style={styles.emptyText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* ✅ Custom Alert */}
      <Modal visible={alertVisible} transparent animationType="fade">
        <View style={styles.alertOverlay}>
          <View
            style={[
              styles.alertBox,
              alertConfig.type === "error" && styles.errorAlert,
              alertConfig.type === "success" && styles.successAlert,
              alertConfig.type === "warning" && styles.warningAlert,
            ]}
          >
            <Icon
              name={
                alertConfig.type === "error"
                  ? "error"
                  : alertConfig.type === "success"
                  ? "check-circle"
                  : "warning"
              }
              size={40}
              color={
                alertConfig.type === "error"
                  ? "#dc3545"
                  : alertConfig.type === "success"
                  ? "#28a745"
                  : "#ffc107"
              }
            />
            <Text style={styles.alertTitle}>{alertConfig.title}</Text>
            <Text style={styles.alertMessage}>{alertConfig.message}</Text>
            <View style={styles.alertButtons}>
              {alertConfig.type === "warning" && (
                <TouchableOpacity
                  style={[styles.alertButton, styles.cancelButton]}
                  onPress={hideAlert}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.alertButton, styles.confirmButton]}
                onPress={() => {
                  alertConfig.onConfirm();
                  hideAlert();
                }}
              >
                <Text style={styles.buttonText}>
                  {alertConfig.type === "warning" ? "Confirm" : "OK"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.header}>Success Stories Management</Text>

      {stories.map((story) => (
        <View key={story._id} style={styles.storyCard}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{story.title}</Text>
            <TouchableOpacity onPress={() => deleteStory(story._id)}>
              <Ionicons name="trash-outline" size={24} color="#B00020" />
            </TouchableOpacity>
          </View>
          <Text style={styles.location}>📍 {story.subtitle}</Text>
          <Text style={styles.storyText}>{story.story}</Text>
        </View>
      ))}

      {stories.length === 0 && !loading && (
        <Text style={styles.emptyText}>No success stories to display.</Text>
      )}
    </ScrollView>
  );
};

// Keep original styles + add alert styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE9E6',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#610d1b',
    marginVertical: 20,
    textAlign: 'center',
    marginTop:50,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#37474F',
  },
  location: {
    color: '#607D8B',
    marginTop: 4,
    marginBottom: 10,
    fontSize: 14,
  },
  storyText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
    textAlign: 'justify',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },

  // ✅ Custom Alert styles
  alertOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  errorAlert: {
    borderLeftWidth: 5,
    borderColor: "#dc3545",
  },
  successAlert: {
    borderLeftWidth: 5,
    borderColor: "#28a745",
  },
  warningAlert: {
    borderLeftWidth: 5,
    borderColor: "#ffc107",
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  alertMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  alertButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  alertButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  confirmButton: {
    backgroundColor: "purple",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdminSuccessStoriesScreen;
