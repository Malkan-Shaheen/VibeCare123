import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PersonalExplorer = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/PerExp.png')} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ExploreScreen')}
          style={styles.backButton}
        >
          <Image
            source={require('../assets/images/back.png')}
            style={styles.arrowBack}
          />
        </TouchableOpacity>

        {/* Button 1 */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'transparent' }]}
          onPress={() => navigation.navigate('CatchesYourEye')}
        >
          <Text style={styles.buttonText}>What catches your eyes first?</Text>
        </TouchableOpacity>

        {/* Button 2 */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'transparent' }]}
          onPress={() => navigation.navigate('EmojiExplorer')}
        >
          <Text style={styles.buttonText}>Emoji Encyclopedia</Text>
        </TouchableOpacity>

        {/* Button 3 */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'transparent' }]}
          onPress={() => navigation.navigate('Dairy')}
        >
          <Text style={styles.buttonText}>Write what's in your mind</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  arrowBack: {
    width: 24,
    height: 24,
  },
  button: {
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    width: 280,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
});

export default PersonalExplorer;
