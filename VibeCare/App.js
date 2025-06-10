import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, ActivityIndicator, Text, View, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserPreferencesProvider } from './UserPreferencesContext';
import WelcomeScreen from './screens/WelcomeScreen';
import SignupScreen from './screens/SignupScreen';
import SigninScreen from './screens/SigninScreen';
import InfoScreen from './screens/InfoScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import MyAccount from './screens/MyAccount';
import AboutScreen from './screens/AboutScreen';
import SuccessStoriesScreen from './screens/SuccessStoriesScreen';
import ExploreScreen from './screens/ExploreScreen';
import GenderSelectionScreen from './screens/GenderSelectionScreen';
import AgeFPage from './screens/AgeFPage';
import AgeSelectionScreen from './screens/AgeMPage';
import Relation from './screens/Relation';
import LivingSituationPage from './screens/LivingSituationPage';
import WellBeingPage from './screens/WellBeingPage';
import ChatBotScreen from './screens/ChatbotScreen';
import FeedbackScreen from './screens/FeedbackScreen';
import FeedbackScreen1 from './screens/FeedbackScreen1';
import PersonalExplorer from './screens/PersonalExplorer';
import Dairy from './screens/Dairy';
import CatchesYourEye from './screens/CatchesYourEye';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import VerifyOtpScreen from './screens/VerifyOtpScreen';
import VerifyEmailOtpScreen from './screens/VerifyEmailOtpScreen';
import EmojiDetailScreen from './screens/EmojiDetailScreen';
import EmojiScreen1 from './screens/EmojiScreen1';
import HelpSupportScreen from './screens/HelpSupportScreen'; 
import DepressionQuiz from './screens/DepressionQuiz';
import AdminSignIn from './screens/admin';
import EditProfileScreen from './screens/EditProfile';
import FeedbackListScreen from './screens/Feedbacklistscreen';
import RespondTicketScreen from './screens/RespondTicketScreen';
import AddStoryScreen from './screens/AddStoryScreen';
import HistoryScreen from './screens/DiaryHistory';
import OtpVerification from './screens/OtpVerification';
import EmailVerification from './screens/EmailVerification';
import StressPredictor from './screens/StressPredicctor';
import RandomImageQuiz from './screens/RandomImageQuiz';
import EmailVerificationSignUp from './screens/EmailVerificationSignup';
import RandomImage from './screens/RandomImage';
import ResultScreen from './screens/ResultScreen';
import EmojiExplorer from './screens/EmojiExplorer';
import SubcategoryScreen from './screens/SubcategoryScreen';
import SubcategoryDetails from './screens/SubcategoryDetails';
import SearchEmojiScreen from './screens/SearchEmojiScreen';
import Recommendations from './screens/recommendations';
import AnxietyScreen from './screens/AnxietyScreen';
import SettingsScreen from './screens/SettingsScreen';
import admindashboard from './screens/admindashboard';
import VCHistoryScreen from './screens/VCHistoryScreen';
import AdminVCHistoryScreen from './screens/AdminVCHistoryScreen';
import AdminSuccessStoriesScreen from './screens/AdminSuccessStoriesScreen';
import AdminUserProfileManagementScreen from './screens/AdminUserProfileManagementScreen';
import caretakerdashboard from './screens/caretakerdashboard';
import CaretakerSignIn from './screens/CaretakersignIn';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoadingScreen({ navigation }) {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken'); 
        const userId = await AsyncStorage.getItem('userId'); // Retrieve userId

        console.log('User Token:', userToken);
        console.log('User ID:', userId);

        if (userToken && userId) {
          console.log('User is logged in:', userId);
          navigation.replace('ExploreScreen',{userId}); // Navigate to ExploreScreen if user is logged in
        } else {
          navigation.replace('WelcomeScreen'); // Otherwise, navigate to WelcomeScreen
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.replace('WelcomeScreen');
      }
    };

    setTimeout(checkLoginStatus, 3000); // Wait for 3 seconds before checking
  }, [navigation]);


  return (
    <View style={styles.loadingContainer}>
      <Image source={require('./assets/images/mind.png')} style={styles.image} />
      <Text style={styles.quoteText}>
        "A beautiful mind is a treasure trove of great ideas and dreams." 
      </Text>
      <ActivityIndicator size="large" color="#5F0F09" style={styles.activityIndicator} />
    </View>
  );
}

// Main Stack Navigator
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar 
        backgroundColor="#FDE6E6" 
        barStyle="dark-content"
        translucent={true}
      />
      <UserPreferencesProvider>
        <NavigationContainer
          theme={{
            colors: {
              background: '#FDE6E6',
            },
          }}
        >
          <Stack.Navigator 
            initialRouteName="LoadingScreen"
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: '#FDE6E6',
                flex: 1,
              },
            }}
          >
            {/* Loading Screen */}
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="SigninScreen" component={SigninScreen} />
            <Stack.Screen name="InfoScreen" component={InfoScreen} />
            <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
            <Stack.Screen name="MyAccount" component={MyAccount} />
            <Stack.Screen name="AboutScreen" component={AboutScreen} />
            <Stack.Screen name="SuccessStoriesScreen" component={SuccessStoriesScreen} />
            <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
            <Stack.Screen name="GenderSelectionScreen" component={GenderSelectionScreen} />
            <Stack.Screen name="AgeFPage" component={AgeFPage} />
            <Stack.Screen name="AgeSelectionScreen" component={AgeSelectionScreen} />
            <Stack.Screen name="Relation" component={Relation} />
            <Stack.Screen name="LivingSituationPage" component={LivingSituationPage} />
            <Stack.Screen name="WellBeingPage" component={WellBeingPage} />
            <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} />
            <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
            <Stack.Screen name="FeedbackScreen1" component={FeedbackScreen1} />
            <Stack.Screen name="PersonalExplorer" component={PersonalExplorer} />
            <Stack.Screen name="EmojiScreen1" component={EmojiScreen1} />
            <Stack.Screen name="Dairy" component={Dairy} />
            <Stack.Screen name="CatchesYourEye" component={CatchesYourEye} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="VerifyOtpScreen" component={VerifyOtpScreen} />
            <Stack.Screen name="VerifyEmailOtpScreen" component={VerifyEmailOtpScreen} />
            <Stack.Screen name="EmojiDetailScreen" component={EmojiDetailScreen} />
            <Stack.Screen name="HelpSupportScreen" component={HelpSupportScreen} />
            <Stack.Screen name="AdminSignIn" component={AdminSignIn} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="FeedbackListScreen" component={FeedbackListScreen} />
            <Stack.Screen name="RespondTicketScreen" component={RespondTicketScreen} />
            <Stack.Screen name="AddStoryScreen" component={AddStoryScreen} />
            <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
            <Stack.Screen name="OtpVerification" component={OtpVerification} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="StressPredictor" component={StressPredictor} />
            <Stack.Screen name="RandomImageQuiz" component={RandomImageQuiz} />
            <Stack.Screen name="EmailVerificationSignUp" component={EmailVerificationSignUp} />
            <Stack.Screen name="RandomImage" component={RandomImage} />
            <Stack.Screen name="ResultScreen" component={ResultScreen} />
            <Stack.Screen name="EmojiExplorer" component={EmojiExplorer} />
            <Stack.Screen name="SubcategoryScreen" component={SubcategoryScreen} />
            <Stack.Screen name='SubcategoryDetails' component={SubcategoryDetails} />
            <Stack.Screen name='SearchEmojiScreen' component={SearchEmojiScreen} />
            <Stack.Screen name='Recommendations' component={Recommendations} />
            <Stack.Screen name='AnxietyScreen' component={AnxietyScreen} />
            <Stack.Screen name='SettingsScreen' component={SettingsScreen} />
            <Stack.Screen name='admindashboard' component={admindashboard} />
            <Stack.Screen name='VCHistoryScreen' component={VCHistoryScreen} />
            <Stack.Screen name='AdminVCHistoryScreen' component={AdminVCHistoryScreen} />
            <Stack.Screen name='AdminSuccessStoriesScreen' component={AdminSuccessStoriesScreen} />
            <Stack.Screen name="AdminUserProfileManagementScreen" component={AdminUserProfileManagementScreen} />
            <Stack.Screen name='caretakerdashboard' component={caretakerdashboard} />
            <Stack.Screen name='CaretakerSignIn' component={CaretakerSignIn} />
         
         
          </Stack.Navigator>
        </NavigationContainer>
      </UserPreferencesProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    fontSize: 20,
    marginTop: 10,
    color: '#5F0F09',
  },
  icon: {
    width: 24,
    height: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDE6E6', 
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight, // Adjust for Android status bar
  },
  image: {
    width: 350,
    height: 350,
    marginBottom: -30,
    resizeMode: 'contain',
  },
  quoteText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#5F0F09',
    marginBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
  },
  activityIndicator: {
    position: 'absolute',
    bottom: 20,
  },
});