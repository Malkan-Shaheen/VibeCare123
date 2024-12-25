import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
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



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen 
          name="SignupScreen" 
          component={SignupScreen} 
          options={{ headerShown: false }} // hides default header
        />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}  options={{ headerShown: false }}  />
         <Stack.Screen name="GenderSelectionScreen" component={GenderSelectionScreen}  options={{ headerShown: false }} />
            <Stack.Screen name="AgeSelectionScreen" component={AgeSelectionScreen}  options={{ headerShown: false }} />
            <Stack.Screen name="Relation" component={Relation}  options={{ headerShown: false }} />
            <Stack.Screen name="LivingSituationPage" component={LivingSituationPage}  options={{ headerShown: false }}  />
            <Stack.Screen name="SigninScreen" component={SigninScreen}  options={{ headerShown: false }}  />
            <Stack.Screen name="ExploreScreen" component={ExploreScreen}  options={{ headerShown: false }}  />
             <Stack.Screen name="AdminSignIn" component={AdminSignIn} options={{ headerShown: false }}/>
             <Stack.Screen name='admindashboard' component={admindashboard} options={{ headerShown: false }}/>



      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
