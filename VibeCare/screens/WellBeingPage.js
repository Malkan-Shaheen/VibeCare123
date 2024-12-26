import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WellBeingPage = () => {
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // Dummy static scores
  const depressionScore = 18; // Moderate depression
  const anxietyScore = 12; // Moderate anxiety
  const stressScore = 22; // Moderate stress

  const allScoresAvailable = depressionScore !== null && anxietyScore !== null && stressScore !== null;

  const navigateToStage = (stage) => {
    console.log(`Navigating to Stage ${stage}`);
    switch (stage) {
      case 1:
        navigation.navigate('DepressionQuiz');
        break;
      case 2:
        navigation.navigate('AnxietyScreen');
        break;
      case 3:
        navigation.navigate('StressPredictor');
        break;
      case 4:
        if (allScoresAvailable) {
          navigation.navigate('Recommendations');
        } else {
          showCustomAlert(
            "Incomplete Assessments",
            "Please complete all three assessments to view your well-being summary."
          );
        }
        break;
      default:
        console.log('Invalid stage selected.');
    }
  };

  const handleBackPress = () => {
    navigation.navigate('ExploreScreen');
  };

  const showCustomAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setCustomAlertVisible(true);
  };

  const getScoreColor = (score, type) => {
    if (score === null) return '#CCCCCC';
    if (score < 10) return '#4CAF50'; // Green
    if (score < 20) return '#FFC107'; // Yellow
    if (score < 30) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getDepressionLevelText = (score) => {
    if (score === null) return "Not completed";
    if (score <= 10) return "Normal Ups and Downs";
    if (score <= 16) return "Mild Mood Disturbance";
    if (score <= 20) return "Borderline clinical depression";
    if (score <= 30) return "Moderate depression";
    if (score <= 40) return "Severe depression";
    if (score <= 63) return "Extreme depression";
    return "Normal";
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBackPress}>
            <Image source={require('../assets/images/back.png')} style={styles.arrowBack} />
          </TouchableOpacity>

          <Text style={styles.mainText}>
            Curious about how your{'\n'}mood and habits are{'\n'}shaping your well-{'\n'}being?
          </Text>
          <View style={styles.row}>
            <Text style={styles.subText}>
              Discover personalized well-being tips crafted just for you, based on your unique daily moods and routines.
            </Text>
            <Image source={require('../assets/images/wellbeing.png')} style={styles.image} />
          </View>
        </View>

        <Modal visible={customAlertVisible} transparent animationType="fade" onRequestClose={() => setCustomAlertVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.alertBox}>
              <Text style={styles.alertTitle}>{alertTitle}</Text>
              <Text style={styles.alertMessage}>{alertMessage}</Text>
              <TouchableOpacity 
                style={styles.alertButton} 
                onPress={() => setCustomAlertVisible(false)}
                disabled={isLoading}
              >
                <Text style={styles.alertButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.stagesContainer}>
        <StageButton
          color="#F8C8D4"
          iconPath={require('../assets/images/depression.png')}
          text="Your Depression Level"
          score={depressionScore}
          scoreText={getDepressionLevelText(depressionScore)}
          scoreColor={getScoreColor(depressionScore, 'depression')}
          onPress={() => navigateToStage(1)}
        />
        <StageButton
          color="#C8F6D2"
          iconPath={require('../assets/images/stage2.png')}
          text="Your Anxiety Level"
          score={anxietyScore}
          scoreText="Moderate anxiety"
          scoreColor={getScoreColor(anxietyScore, 'anxiety')}
          onPress={() => navigateToStage(2)}
        />
        <StageButton
          color="#D0A8E2"
          iconPath={require('../assets/images/stage3.png')}
          text="Your Stress Level"
          score={stressScore}
          scoreText="Moderate stress"
          scoreColor={getScoreColor(stressScore, 'stress')}
          onPress={() => navigateToStage(3)}
        />
        <StageButton 
          color={allScoresAvailable ? "#D78E8E" : "#CCCCCC"} 
          iconPath={require('../assets/images/stage4.png')} 
          text="Your Well-Being Summary" 
          onPress={() => navigateToStage(4)}
          showScore={false}
        />
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8b3efa" />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const StageButton = ({ color, iconPath, text, onPress, score, scoreText, scoreColor, disabled, showScore = true }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.stageButton, { backgroundColor: color }, disabled && styles.disabledButton]}
    disabled={disabled}
  >
    <Image source={iconPath} style={[styles.stageIcon, disabled && { tintColor: '#888' }]} />
    <View style={{ flex: 1 }}>
      <Text style={[styles.stageText, disabled && { color: '#888' }]}>{text}</Text>
      {showScore && score !== null ? (
        <Text style={[styles.scoreText, { color: scoreColor || '#333' }]}>
          {scoreText || `Score: ${score}`}
        </Text>
      ) : showScore ? (
        <Text style={styles.scoreText}>Not completed</Text>
      ) : null}
    </View>
    <Image 
      source={require('../assets/images/forward.png')} 
      style={[styles.arrowForward, disabled && { tintColor: '#888' }]} 
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDE6E6' },
  header: {
    backgroundColor: '#D6E5C3',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 20,
  },
  headerContent: { flexDirection: 'column', alignItems: 'flex-start' },
  arrowBack: { height: 20, width: 20, marginVertical: 20, top: 65, left: -10 },
  mainText: { fontSize: 24, fontWeight: 'bold', color: '#000', marginTop: 30, left: 20, top: -10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: -30 },
  subText: { fontSize: 16, color: '#5A5A5A', flex: 1 },
  image: { width: 200, height: 230, marginTop: 3 },
  stagesContainer: { padding: 24 },
  stageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  disabledButton: { opacity: 0.6 },
  stageIcon: { width: 40, height: 40, marginRight: 16 },
  stageText: { fontSize: 18, fontWeight: 'bold', color: '#000', flex: 1 },
  scoreText: { fontSize: 14, color: '#333', marginTop: 4 },
  arrowForward: { width: 24, height: 24, marginLeft: 16 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" },
  alertBox: { width: "80%", backgroundColor: "#fff", borderRadius: 20, padding: 20, alignItems: "center" },
  alertTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#333" },
  alertMessage: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 20 },
  alertButton: { backgroundColor: "#8b3efa", borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20 },
  alertButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  loadingContainer: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16 },
});

export default WellBeingPage;
