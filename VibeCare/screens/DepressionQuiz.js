import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";

const beckQuestions = [
  "Sadness",
  "Pessimism",
  "Past Failure",
  "Loss of Pleasure",
  "Guilty Feelings",
  "Punishment Feelings",
  "Self-Dislike",
  "Self-Criticalness",
  "Suicidal Thoughts or Wishes",
  "Crying",
  "Agitation",
  "Loss of Interest",
  "Indecisiveness",
  "Worthlessness",
  "Loss of Energy",
  "Changes in Sleeping Pattern",
  "Irritability",
  "Changes in Appetite",
  "Concentration Difficulty",
  "Tiredness or Fatigue",
  "Loss of Interest in Sex",
];

const getOptionLabel = (questionIndex, value) => {
  const options = [
    ["I do not feel sad.", "I feel sad much of the time.", "I am sad all the time.", "I am so sad or unhappy that I can’t stand it."],
    ["I am not discouraged about my future.", "I feel more discouraged about my future than I used to be.", "I do not expect things to work out for me.", "I feel my future is hopeless and will only get worse."],
    ["I do not feel like a failure.", "I have failed more than I should have.", "As I look back, I see a lot of failures.", "I feel I am a total failure as a person."],
    ["I get as much pleasure as I ever did from the things I enjoy.", "I don’t enjoy things as much as I used to.", "I get very little pleasure from the things I used to enjoy.", "I can’t get any pleasure from the things I used to enjoy."],
  ];
  return options[questionIndex] ? options[questionIndex][value] : `Option ${value}`;
};

const bgColors = [
  "#FFEBEE", "#E8F5E9", "#E3F2FD", "#FFF3E0", "#F3E5F5", "#FBE9E7",
  "#E0F2F1", "#F1F8E9", "#EDE7F6", "#FFFDE7", "#ECEFF1",
];

const shadeColor = (color, percent) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR = R.toString(16).padStart(2, "0");
  const GG = G.toString(16).padStart(2, "0");
  const BB = B.toString(16).padStart(2, "0");

  return `#${RR}${GG}${BB}`;
};

const screenWidth = Dimensions.get("window").width;

const DepressionQuiz = ({ navigation }) => {
  const [answers, setAnswers] = useState(Array(21).fill(""));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value.toString();
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!answers[currentQuestion]) {
      setShowAlert(true);
      return;
    }
    if (currentQuestion === beckQuestions.length - 1) {
      navigation.navigate("ExploreScreen");
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/images/depbg.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        shouldPlay
        isLooping
        isMuted
      />

      <ScrollView contentContainerStyle={styles.cardWrapper}>
        <View
          style={[
            styles.card,
            { backgroundColor: bgColors[currentQuestion % bgColors.length] },
          ]}
        >
          <Text style={styles.question}>
            Q{currentQuestion + 1}. {beckQuestions[currentQuestion]}
          </Text>

          <View style={styles.optionsWrapper}>
            {[0, 1, 2, 3].map((value) => {
              const isSelected = answers[currentQuestion] === value.toString();
              const cardColor = bgColors[currentQuestion % bgColors.length];
              const lighter = shadeColor(cardColor, 30);
              const darker = shadeColor(cardColor, -30);

              return (
                <TouchableOpacity
                  key={value}
                  style={[
                    styles.optionBox,
                    isSelected && {
                      backgroundColor: lighter,
                      borderColor: darker,
                      borderWidth: 2,
                    },
                  ]}
                  onPress={() => handleChange(value, currentQuestion)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && { fontWeight: "bold", color: "#333" },
                    ]}
                  >
                    {value} - {getOptionLabel(currentQuestion, value)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>
              {currentQuestion === beckQuestions.length - 1
                ? "Finish"
                : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showAlert} transparent animationType="fade">
        <View style={styles.alertBox}>
          <View style={styles.alertContent}>
            <Text style={styles.alertText}>❗ Please select an answer</Text>
            <TouchableOpacity
              onPress={() => setShowAlert(false)}
              style={styles.alertButton}
            >
              <Text style={styles.alertButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
  },
  cardWrapper: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  card: {
    width: screenWidth - 40,
    borderRadius: 20,
    padding: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  optionsWrapper: {
    marginTop: 5,
    marginBottom: 16,
  },
  optionBox: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#6200ea",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  nextText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  alertBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  alertText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  alertButton: {
    backgroundColor: "purple",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
  },
  alertButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default DepressionQuiz;
