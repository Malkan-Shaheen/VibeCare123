import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import Slider from '@react-native-community/slider';
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
          <Text style={styles.question}>
            On a scale of 0–21, how often have you felt nervous or “on edge” recently?
          </Text>

          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>10</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={21}
              step={1}
              value={10}
              minimumTrackTintColor="#6200ee"
              maximumTrackTintColor="#000000"
              thumbTintColor="#6200ee"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>0</Text>
              <Text style={styles.sliderLabel}>21</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WellBeingPage')}>
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  card: {
    padding: 20,
    width: '100%',
    maxWidth: 400,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sliderContainer: {
    width: '100%',
    marginBottom: 30,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#6200ee',
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  sliderLabel: {
    fontSize: 14,
    color: '#666',
  },
  backgroundVideo: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  button: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StressPredictor;
