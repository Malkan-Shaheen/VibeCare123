import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image, ActivityIndicator, Platform, StatusBar as RNStatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignupScreen from './screens/SignupScreen';
import GenderSelectionScreen from './screens/GenderSelectionScreen';
import AgeSelectionScreen from './screens/AgeMPage';
import Relation from './screens/Relation';
import LivingSituationPage from './screens/LivingSituationPage';
import SigninScreen from './screens/SigninScreen';
import ExploreScreen from './screens/ExploreScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AdminSignIn from './screens/admin';
import admindashboard from './screens/admindashboard';
import WellBeingPage from './screens/WellBeingPage';
import DepressionQuiz from './screens/DepressionQuiz';
import AnxietyScreen from './screens/AnxietyScreen';
import StressPredictor from './screens/StressPredicctor';
import Recommendations from './screens/recommendation';


const Stack = createNativeStackNavigator();

// Loading Screen Component
function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("WelcomeScreen"); // Always go to WelcomeScreen
    }, 3000);

    return () => clearTimeout(timer); // cleanup timer
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

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="LoadingScreen">
        {/* Loading Screen */}
        <Stack.Screen 
          name="LoadingScreen" 
          component={LoadingScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="GenderSelectionScreen" component={GenderSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AgeSelectionScreen" component={AgeSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Relation" component={Relation} options={{ headerShown: false }} />
        <Stack.Screen name="LivingSituationPage" component={LivingSituationPage} options={{ headerShown: false }} />
        <Stack.Screen name="SigninScreen" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ExploreScreen" component={ExploreScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminSignIn" component={AdminSignIn} options={{ headerShown: false }} />
        <Stack.Screen name="admindashboard" component={admindashboard} options={{ headerShown: false }} />
       <Stack.Screen name="WellBeingPage" component={WellBeingPage}  options={{ headerShown: false }} />
       <Stack.Screen name="DepressionQuiz" component={DepressionQuiz} options={{ headerShown: false }}/>
        <Stack.Screen name='AnxietyScreen' component={AnxietyScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="StressPredictor" component={StressPredictor} options={{ headerShown: false }} />
        <Stack.Screen name='Recommendations' component={Recommendations}  options={{ headerShown: false }} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDE6E6',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 0 : RNStatusBar.currentHeight,
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
