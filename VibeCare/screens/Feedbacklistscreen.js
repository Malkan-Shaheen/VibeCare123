import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const dummyFeedbacks = [
  {
    _id: "1",
    userId: "User123",
    rating: 5,
    selectedImprovement: "UI/UX",
    feedback: "Great app, but UI can be smoother!",
    createdAt: "2025-09-21T10:00:00Z",
    responded: false,
  },
  {
    _id: "2",
    userId: "User456",
    rating: 4,
    selectedImprovement: "Performance",
    feedback: "App is good but a bit slow.",
    createdAt: "2025-09-20T15:30:00Z",
    responded: true,
  },
];

const FeedbackListScreen = ({ navigation }) => {
  const [feedbacks] = useState(dummyFeedbacks);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="purple" />
        </TouchableOpacity>
        <Text style={styles.header}>User Feedback</Text>
      </View>

      {/* Content Section */}
      {feedbacks.length === 0 ? (
        <Text style={styles.noFeedback}>No feedback available.</Text>
      ) : (
        <FlatList
          data={feedbacks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.feedbackCard}>
              <View style={styles.feedbackHeader}>
                <Text style={styles.userId}>User: {item.userId}</Text>
                <TouchableOpacity>
                  <Icon name="delete" size={22} color="red" />
                </TouchableOpacity>
              </View>
              <Text style={styles.rating}>⭐ Rating: {item.rating || "N/A"}</Text>
              {item.selectedImprovement && (
                <Text style={styles.improvement}>
                  🔧 Improvement: {item.selectedImprovement}
                </Text>
              )}
              {item.feedback && (
                <Text style={styles.feedbackText}>📝 {item.feedback}</Text>
              )}
              <Text style={styles.date}>
                📅 {new Date(item.createdAt).toLocaleString()}
              </Text>

              <TouchableOpacity
                style={[
                  styles.respondButton,
                  item.responded && styles.respondedButton,
                ]}
                disabled={item.responded}
              >
                <Text style={styles.buttonText}>
                  {item.responded ? "Responded" : "Respond to Ticket"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
    paddingTop: 50,
  },
  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 15,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "purple",
  },
  noFeedback: {
    textAlign: "center",
    fontSize: 18,
    color: "#555",
  },
  feedbackCard: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  feedbackHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ff8c00",
    marginTop: 5,
  },
  improvement: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 5,
  },
  feedbackText: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 10,
  },
  respondButton: {
    marginTop: 10,
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  respondedButton: {
    backgroundColor: "#6c757d", // Gray color for responded state
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackListScreen;
