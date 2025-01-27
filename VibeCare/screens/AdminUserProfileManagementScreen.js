import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import { API_BASE_URL } from "../config/api";

const API_BASE = `${API_BASE_URL}`;

const AdminUserProfileManagementScreen = () => {
  const [users, setUsers] = useState([]);
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

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/get-all-users`);
      const data = await res.json();

      if (data.status === "success") {
        setUsers(data.data);
      } else {
        showAlert("Error", "Failed to load users", "error");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      showAlert("Error", "Something went wrong while fetching users", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete User
  const deleteUser = (id) => {
    showAlert(
      "Delete User",
      "Are you sure you want to delete this user?",
      "warning",
      async () => {
        try {
          const res = await fetch(`${API_BASE}/delete-user/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.status === "success") {
            setUsers((prev) => prev.filter((u) => u._id !== id));
            showAlert("Success", "User deleted successfully", "success");
          } else {
            showAlert("Error", "Failed to delete user", "error");
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          showAlert("Error", "Something went wrong", "error");
        }
      }
    );
  };

  // View Login History
const viewLoginHistory = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/get-login-history/${id}`);
    const data = await res.json();
    if (data.status === "success") {
      const history = data.data
        .map(
          (entry, i) =>
            `${i + 1}. 📅 Date: ${entry.date || "N/A"}\n   ⏰ Time: ${
              entry.time || "N/A"
            }\n   🌐 IP: ${entry.ip || "N/A"}\n   🖥️ Device: ${
              entry.device || "N/A"
            }`
        )
        .join("\n\n");

      showAlert("Login History", history || "No login history found.", "info");
    } else {
      showAlert("Error", "Unable to fetch login history", "error");
    }
  } catch (error) {
    console.error("Error fetching login history:", error);
    showAlert("Error", "Something went wrong", "error");
  }
};


  return (
    <ScrollView style={styles.container}>
      {/* Custom Alert */}
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

            {/* ✅ Scrollable message */}
            <ScrollView style={{ maxHeight: 250, marginBottom: 20 }}>
              <Text style={styles.alertMessage}>{alertConfig.message}</Text>
            </ScrollView>

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

      <Text style={styles.header}>User Profile Management</Text>

      {users.map((user) => (
        <View key={user._id} style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{user.Name}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                onPress={() => viewLoginHistory(user._id)}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="time-outline" size={22} color="#1976D2" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteUser(user._id)}
                style={{ marginLeft: 10 }}
              >
                <Ionicons name="trash-outline" size={22} color="#B00020" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.info}>📧 {user.Email}</Text>
          <Text style={styles.info}>👤 Username: {user.Username}</Text>
          <Text style={styles.status}>
            {user.status === "Deactivated" ? "🔴 Deactivated" : "🟢 Active"}
          </Text>
        </View>
      ))}

      {users.length === 0 && (
        <Text style={styles.empty}>No users available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE9E6",
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#610d1b",
    marginBottom: 20,
    marginTop: 35,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#37474F",
  },
  info: {
    fontSize: 15,
    color: "#555",
    marginTop: 4,
  },
  status: {
    marginTop: 6,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  actions: {
    flexDirection: "row",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
    fontSize: 16,
  },

  // ✅ Alert styles copied from first screen
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

export default AdminUserProfileManagementScreen;
