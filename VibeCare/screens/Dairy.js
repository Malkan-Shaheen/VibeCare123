
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Diary = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
          <Ionicons name="time-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Book Image */}
      <Image
        source={require("../assets/images/dairy.png")}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Your Personal Diary</Text>

      {/* Dummy Note Box */}
      <View style={styles.noteBox}>
        <Text style={styles.noteText}>
          This is a dummy note. In the real app, your saved notes will appear
          here.
        </Text>
        <TouchableOpacity style={styles.addMoreButton} activeOpacity={0.8}>
          <Text style={styles.addMoreText}>Tap to add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe6eb",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  noteBox: {
    width: "80%",
    minHeight: 100,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  noteText: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
  },
  addMoreButton: {
    marginTop: 10,
    backgroundColor: "purple",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  addMoreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Diary;
