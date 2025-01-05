import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const SuccessStoriesScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom alert states
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error'); // "error" | "success"

  const showAlert = (title, message, type = 'error') => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setCustomAlertVisible(true);

    if (type === 'success') {
      setTimeout(() => setCustomAlertVisible(false), 1500);
    }
  };

  const closeAlert = () => setCustomAlertVisible(false);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/success-stories`, {
          params: { userId },
        });
        if (response.data && response.data.length > 0) {
          setStories(response.data);
        } else {
          showAlert('Notice', 'No success stories found.', 'error');
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        showAlert('Error', 'Failed to fetch stories. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [userId]);

  const renderStoryCard = ({ item }) => (
    <View style={styles.storyCard}>
      <Text style={styles.storyTitle}>{item.title}</Text>
      <Text style={styles.storySubtitle}>{item.subtitle}</Text>
      <Text style={styles.storyContent}>{item.story}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerText}>Success Stories</Text>
        <Text style={styles.subHeading}>Inspiring Journeys to a Better Life</Text>

        <FlatList
          data={stories}
          renderItem={renderStoryCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={false}
        />

        <TouchableOpacity
          style={styles.dottedBorderBox}
          onPress={() => navigation.navigate('AddStoryScreen', { userId })}
        >
          <View style={styles.addStoryContainer}>
            <Ionicons name="add-circle-outline" size={28} color="#333" />
            <Text style={styles.addStoryText}>Add Your Story</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Alert Modal */}
      <Modal
        visible={customAlertVisible}
        transparent
        animationType="fade"
        onRequestClose={closeAlert}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.alertBox,
              alertType === 'error' ? styles.errorAlert : styles.successAlert,
            ]}
          >
            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>

            {alertType === 'error' && (
              <TouchableOpacity style={styles.alertButton} onPress={closeAlert}>
                <Text style={styles.alertButtonText}>OK</Text>
              </TouchableOpacity>
            )}

            {alertType === 'success' && (
              <TouchableOpacity style={styles.alertButton} onPress={closeAlert}>
                <Text style={styles.alertButtonText}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#80B9A1',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 30,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subHeading: {
    fontSize: 16,
    color: '#f2f2f2',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 10,
  },
  storyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  storySubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  storyContent: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  dottedBorderBox: {
    marginTop: 25,
    padding: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  addStoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addStoryText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#444',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 1.5,
    borderColor: '#ccc2be',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Custom Alert Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  alertBox: {
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  errorAlert: {
    backgroundColor: '#ffe0e0', 
  },
  successAlert: {
    backgroundColor: '#d4fcd4', 
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

export default SuccessStoriesScreen;
