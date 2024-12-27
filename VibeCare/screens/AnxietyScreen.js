import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Video } from 'expo-av';

const questions = [
  { key: 'numbness', statement: 'Do you feel numbness in your body?' },
  { key: 'wobbliness', statement: 'Do you experience wobbliness or unsteadiness?' },
  { key: 'afraidofworsthappening', statement: 'Do you often fear something bad will happen?' },
  { key: 'heartpounding', statement: 'Do you notice your heart pounding?' },
  { key: 'unsteadyorunstable', statement: 'Do you feel physically unstable or unsteady?' },
  { key: 'terrified', statement: 'Do you feel terrified without reason?' },
  { key: 'handstrembling', statement: 'Do your hands tremble or shake?' },
  { key: 'shakystate', statement: 'Do you feel like your body is in a shaky state?' },
  { key: 'difficultyinbreathing', statement: 'Do you have difficulty in breathing?' },
  { key: 'scared', statement: 'Do you feel scared often?' },
  { key: 'hotorcoldsweats', statement: 'Do you get hot or cold sweats?' },
  { key: 'faceflushed', statement: 'Do you notice your face flushing?' },
];

const optionLabels = {
  0: 'Not at all',
  1: 'A little bit',
  2: 'Quite a bit',
  3: 'Extremely',
};

const AnxietyScreen = ({ navigation, route }) => {
  const { userId, depressionScore } = route.params || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const videoRef = useRef(null);

  const handleSelect = (value) => {
    const key = questions[currentIndex].key;
    setAnswers((prev) => ({ ...prev, [key]: value }));

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Navigate back to WellBeingPage with collected answers
      navigation.navigate('WellBeingPage', {
        userId,
        depressionScore,
        anxietyAnswers: answers,
      });
    }
  };

  const { statement } = questions[currentIndex];

  return (
    <View style={styles.container}>
      {/* Background video */}
      <Video
        ref={videoRef}
        source={require('../assets/images/bg1.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        shouldPlay
        isMuted
      />

      {/* Question card */}
      <View style={styles.card}>
        <Text style={styles.title}>Anxiety Assessment</Text>
        <Text style={styles.statement}>{statement}</Text>

        <View style={styles.optionsContainer}>
          {[0, 1, 2, 3].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.optionButton}
              onPress={() => handleSelect(num)}
            >
              <Text style={styles.optionText}>{optionLabels[num]}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.progress}>
          {currentIndex + 1} / {questions.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    padding: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#800080',
    textAlign: 'center',
  },
  statement: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  optionsContainer: {
    width: '100%',
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#800080',
    paddingVertical: 12,
    borderRadius: 12,
    marginVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  progress: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
});

export default AnxietyScreen;
