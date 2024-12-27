import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Card, ProgressBar } from 'react-native-paper';
import { Video } from 'expo-av';

const StressPredictor = ({ navigation }) => {
  const videoRef = useRef(null);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      {/* Background Video */}
      <Video
        ref={videoRef}
        source={require('../assets/images/bg.mp4')}
        style={styles.backgroundVideo}
        resizeMode="cover"
        isLooping
        isMuted
        shouldPlay
      />

      <View style={styles.centerContainer}>
        <Card style={styles.card}>
          <Text style={styles.title}>Stress Check</Text>
          <Text style={styles.question}>
            On a scale of 0–21, how often have you felt nervous or “on edge” recently?
          </Text>

          {/* ProgressBar instead of Slider */}
          <View style={styles.progressContainer}>
            <ProgressBar progress={0.5} color="#6200ee" style={styles.progressBar} />
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>0</Text>
              <Text style={styles.progressLabel}>21</Text>
            </View>
            <Text style={styles.value}>10</Text>
          </View>

          {/* Next Button */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('WellBeingPage')}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  card: {
    padding: 25,
    width: '100%',
    maxWidth: 420,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  question: {
    fontSize: 18,
    marginBottom: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: '#444',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  progressLabel: {
    fontSize: 14,
    color: '#555',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
    marginTop: 10,
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'purple',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
});

export default StressPredictor;
