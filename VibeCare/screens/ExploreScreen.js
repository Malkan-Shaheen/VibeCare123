import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  Modal,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const ExploreScreen = ({ navigation, route }) => {
  const userId = route?.params?.userId || null;
  console.log("Route params in ExploreScreen:", route.params);

  useEffect(() => {
    if (userId) {
      console.log("User ID received in ExploreScreen:", userId);
    } else {
      console.log("User ID not received in ExploreScreen");
    }
  }, [userId]);

  const [backPressCount, setBackPressCount] = useState(0);
  const [customAlertVisible, setCustomAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const showCustomAlert = (title, message, confirmAction) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setOnConfirm(() => confirmAction);
    setCustomAlertVisible(true);
  };

  const closeAlert = () => {
    setCustomAlertVisible(false);
  };

  // Handle back button press (double press to exit)
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (backPressCount === 0) {
          setBackPressCount(1);
          ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
          setTimeout(() => setBackPressCount(0), 2000);
          return true;
        } else {
          BackHandler.exitApp();
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [backPressCount])
  );

  // Logout just goes back to signin
  const handleLogout = () => {
    showCustomAlert('Logout', 'Are you sure you want to logout?', () => {
      navigation.replace('SigninScreen');
    });
  };

  // Add caretaker just navigates
  const handleAddCaretaker = () => {
    navigation.navigate('AddCaretakerScreen', { userId });
  };

  const features = [
    {
      title: 'Personalized well-being insight',
      subtitle:
        'Gathering detailed insights through Q/A sessions, and recommending exercises, activities, and treatments.',
      image: require('../assets/images/wb.png'),
      backgroundColor: 'rgba(215, 176, 205, 1.0)',
      borderColor: '#D58CCA',
      onPress: () => navigation.navigate('WellBeingPage', { userId }),
    },
    {
      title: 'Persona Explorer',
      subtitle:
        'Explore yourself: image-based personality, emoji encyclopedia, and a diary for special events.',
      image: require('../assets/images/pe.png'),
      backgroundColor: 'rgba(249, 236, 188, 1.0)',
      borderColor: '#F2C94C',
      onPress: () => navigation.navigate('PersonalExplorer', { userId }),
    },
    {
      title: 'Virtual Counseling',
      subtitle:
        'Discuss your thoughts with an AI buddy and get helpful insights.',
      image: require('../assets/images/vc.png'),
      backgroundColor: 'rgba(207, 162, 167, 1.0)',
      borderColor: '#EB5757',
      onPress: () => navigation.navigate('ChatBotScreen', { userId }),
    },
    {
      title: 'Feedback',
      subtitle:
        'Your feedback helps us improve and provide a better experience.',
      image: require('../assets/images/fb.png'),
      backgroundColor: 'rgba(211, 242, 228, 1.0)',
      borderColor: '#27AE60',
      onPress: () => navigation.navigate('FeedbackScreen', { userId }),
    },
  ];

  const footerOptions = [
    {
      label: 'Add Caretaker',
      image: require('../assets/images/add.png'),
      onPress: handleAddCaretaker,
    },
    {
      label: 'Edit Profile',
      image: require('../assets/images/user.png'),
      onPress: () => navigation.navigate('EditProfileScreen', { userId }),
    },
    {
      label: 'Home',
      image: require('../assets/images/home_icon.png'),
      onPress: () => navigation.navigate('ExploreScreen', { userId }),
      selected: true,
    },
    {
      label: 'Success Stories',
      image: require('../assets/images/stories.png'),
      onPress: () => navigation.navigate('SuccessStoriesScreen', { userId }),
    },
    {
      label: 'Logout',
      image: require('../assets/images/turn-off.png'),
      onPress: handleLogout,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Custom Alert Modal */}
      <Modal
        visible={customAlertVisible}
        transparent
        animationType="fade"
        onRequestClose={closeAlert}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[styles.alertButton, { backgroundColor: "#8b3efa" }]}
                onPress={() => {
                  closeAlert();
                  onConfirm();
                }}
              >
                <Text style={styles.alertButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.alertButton, { backgroundColor: "red" }]}
                onPress={closeAlert}
              >
                <Text style={styles.alertButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Feature List */}
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Explore Features</Text>
            <View style={styles.quoteContainer}>
              <Text style={styles.quote}>
                "The journey of a thousand miles begins with one step."
              </Text>
              <View style={styles.rowContainer}>
                <View style={styles.textContainer}>
                  <Text style={styles.description}>
                    Take this first step towards mental clarity and well-being with
                  </Text>
                  <Text style={styles.brand}>VibeCare</Text>
                </View>
                <Image
                  source={require('../assets/images/splash.png')}
                  style={styles.image}
                />
              </View>
            </View>
            <Text style={styles.subtitle}>
              Let's start the healing journey together...
            </Text>
          </View>
        }
        data={features}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.onPress}
            style={[
              styles.featureCard,
              { backgroundColor: item.backgroundColor, borderColor: item.borderColor },
            ]}
          >
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
            <Image source={item.image} style={styles.cardImage} />
          </TouchableOpacity>
        )}
      />

      {/* Bottom Navigation Bar */}
      <View style={styles.footer}>
        {footerOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={option.onPress}
            style={styles.footerOption}
          >
            <Image source={option.image} style={styles.footerIcon} />
            <Text style={styles.footerLabel}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDE9E6' },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    backgroundColor: "#FDE6E6",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  alertTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#333" },
  alertMessage: { fontSize: 16, color: "#555", textAlign: "center", marginBottom: 20 },
  alertButton: { borderRadius: 15, paddingVertical: 10, paddingHorizontal: 20, marginHorizontal: 10 },
  alertButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#610d1b',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ad263d',
  },
  footerOption: { alignItems: 'center', flex: 1 },
  footerIcon: { width: 24, height: 24, marginBottom: 5 },
  footerLabel: { fontSize: 12, color: 'white', textAlign: 'center' },
  headerContainer: { padding: 16, alignContent: 'center' },
  title: {
    color: 'red', fontSize: 32, fontWeight: 'bold',
    marginBottom: -10, marginTop: 30, textAlign: 'center',
  },
  quoteContainer: {
    backgroundColor: 'rgba(222, 185, 160, 1.0)',
    borderRadius: 50,
    top: 35,
    marginHorizontal: -10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    alignContent: 'center',
  },
  quote: { fontSize: 16, fontWeight: 'bold', color: '#333', paddingTop: 20, marginLeft: 20, marginBottom: 16 },
  rowContainer: { flexDirection: 'row', alignItems: 'flex-end', paddingRight: 25 },
  textContainer: { flex: 1, marginLeft: 20, top: -25 },
  description: { fontSize: 16, color: '#555' },
  brand: { fontSize: 32, fontWeight: 'bold', fontStyle: 'italic', color: 'red', marginTop: 10 },
  image: { width: 120, height: 130, borderRadius: 25, marginLeft: -20 },
  subtitle: { fontSize: 22, fontWeight: '500', color: '#333', textAlign: 'center', marginBottom: 30, top: 30 },
  gridContainer: { padding: 13 },
  featureCard: {
    flex: 1,
    marginTop: 20,
    margin: 5,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    height: 220,
    shadowRadius: 8,
    borderWidth: 2,
  },
  featureTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  featureSubtitle: { fontSize: 12, color: '#555', marginVertical: 5 },
  cardImage: { width: 110, height: 90, borderRadius: 50, alignSelf: 'flex-end' },
});

export default ExploreScreen;
