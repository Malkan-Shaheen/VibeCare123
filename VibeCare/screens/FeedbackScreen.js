import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';

const FeedbackScreen = ({ navigation, route }) => {
  const { userId } = route.params || {};
  const [rating, setRating] = useState(0);
  const [selectedImprovement, setSelectedImprovement] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [currentPage, setCurrentPage] = useState('Feedback');
  const [ticketNumber, setTicketNumber] = useState(null);

  // ✅ custom alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  // Improvement options
  const improvementOptions = [
    { id: 1, label: 'Speed and efficiency' },
    { id: 2, label: 'Chatbot (Your dodo)' },
    { id: 3, label: 'Persona Explorer' },
    { id: 4, label: 'Overall Performance' },
  ];

  const handleRating = (star) => {
    setRating(star);
  };

  const handleImprovementSelection = (id) => {
    setSelectedImprovement(id);
  };

  const generateTicketNumber = () => {
    return `TCK-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const handleSubmit = () => {
    if (rating === 0 && !selectedImprovement && !feedback.trim()) {
      showAlert("Incomplete Feedback", "Please fill at least one field before submitting.");
      return;
    }

    const ticket = generateTicketNumber();
    setTicketNumber(ticket);

    // Just simulate success
    setCurrentPage('ThankYouScreen');
  };

  const fetchFeedbackStatus = () => {
    // Dummy simulation
    showAlert(
      "Feedback Status",
      "Your feedback is still pending. (Dummy data)"
    );
  };

  // ✅ Thank You Screen
  if (currentPage === 'ThankYouScreen') {
    return (
      <View style={styles.container}>
        <View style={styles.thankYouCard}>
          <Text style={styles.thankYouMessage}>🎉 Thank You! 🎉</Text>
          <Text style={styles.ticketMessage}>
            We appreciate your feedback. Remain in touch to check your feedback status!
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('ExploreScreen', { userId })}
          >
            <Text style={styles.buttonText}>Back to Explore</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.ticketNumber}>Your Ticket Number: {ticketNumber}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>VibeCare</Text>

      {/* ✅ Reusable Alert Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
      >
        <View style={styles.alertBox}>
          <View style={styles.alertContent}>
            <Text style={styles.alertText}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => setAlertVisible(false)}
            >
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Rate Your Experience */}
      <View style={[styles.card, { backgroundColor: '#daf5e1' }]}>
        <Text style={styles.question}>Rate Your Experience</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRating(star)}
              style={[
                styles.star,
                { backgroundColor: rating >= star ? '#ad26ad' : '#E0E0E0' },
              ]}
            />
          ))}
        </View>
      </View>

      {/* Tell us what can be improved? */}
      <View style={[styles.card, { backgroundColor: '#daeef5' }]}>
        <Text style={styles.question}>Tell us what can be improved?</Text>
        <View style={styles.optionsContainer}>
          {improvementOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => handleImprovementSelection(option.id)}
              style={[
                styles.improvementOption,
                selectedImprovement === option.id && styles.selectedImprovementOption,
              ]}
            >
              <Text
                style={[
                  styles.improvementOptionText,
                  selectedImprovement === option.id && styles.selectedImprovementOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* How can we improve... */}
      <View style={[styles.card, { backgroundColor: '#e4daf5' }]}>
        <Text style={styles.question}>How can we improve...</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Type your feedback here..."
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('ExploreScreen', { userId })}
        >
          <Text style={styles.buttonText}>No, thank you.</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.statusButton}
        onPress={fetchFeedbackStatus}
      >
        <Text style={styles.buttonText}>Check Feedback Status</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F7', padding: 20 },
  header: {
    fontSize: 40,
    color: 'purple',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    paddingTop: 50,
  },
  card: { borderRadius: 12, padding: 20, marginVertical: 10, elevation: 5 },
  question: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  starsContainer: { flexDirection: 'row', marginTop: 10 },
  star: { width: 30, height: 30, borderRadius: 15, marginHorizontal: 5 },
  optionsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  improvementOption: { padding: 10, borderRadius: 8, margin: 5 },
  selectedImprovementOption: {
    borderColor: 'purple',
    borderWidth: 2,
    backgroundColor: '#ad26ad',
  },
  improvementOptionText: { fontSize: 14 },
  selectedImprovementOptionText: { color: '#FFF', fontWeight: 'bold' },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    height: 100,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  buttonContainer: { flexDirection: 'row', marginTop: 20 },
  submitButton: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#BDBDBD',
    padding: 15,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: { color: '#FFF', fontWeight: '600', textAlign: 'center' },
  thankYouCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    marginTop: 200,
  },
  thankYouMessage: { fontSize: 24, fontWeight: 'bold', color: 'green', marginBottom: 10 },
  ticketMessage: {
    fontSize: 16, color: '#333', textAlign: 'center',
    marginRight: 10, marginTop: 10, padding: 10,
  },
  ticketNumber: {
    fontSize: 22, fontWeight: 'bold', color: 'purple',
    marginVertical: 10, left: 50,
  },
  backButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  statusButton: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // ✅ Alert Styles
  alertBox: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  alertContent: {
    width: '80%', backgroundColor: '#fff', borderRadius: 20,
    padding: 20, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4, elevation: 5,
  },
  alertText: { fontSize: 18, marginBottom: 10, fontWeight: 'bold', color: '#333' },
  alertMessage: { fontSize: 16, textAlign: 'center', marginBottom: 20, color: '#555' },
  alertButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  alertButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default FeedbackScreen;
