import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, SHADOW_COLOR} from '../constants/Colors';
import LottieView from 'lottie-react-native';

import {useNavigation} from '@react-navigation/native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import UserTypeSelection from './auth/GenderSelection';
import * as Animatable from 'react-native-animatable';




const Welcome = () => {
  const navigation = useNavigation();

  const navigateToSignIn = () => {
    navigation.navigate("SignIn");
  };

  const navigateToUserTypeSelection = () => {
    navigation.navigate("SignUp");
  };


  return (
    <View style={{
      flex: 1,
      backgroundColor: "#fff",
    }}>

      <Text style={styles.welcomeText}>Welcome</Text>
      <Text style={styles.subHeadingText}>Please Sign In or Sign Up to continue using our app</Text>

      <View style={styles.animationContainer}>
        <LottieView style={
          {
            width: "100%",
            height: "100%"
          }
        } source={require('../assets/animations/welcome-2.json')} autoPlay loop />

      </View>




      <View style={styles.buttonsContainer}>
        <Animatable.View animation="zoomIn" duration={1500}>

          <TouchableOpacity style={styles.SignInButton} onPress={() => {
            navigateToSignIn();
          }}>
            <Text style={styles.SignInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.SignUpbutton} onPress={() => {
            navigateToUserTypeSelection();
          }}>
            <Text style={styles.SignUpbuttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Animatable.View>

      </View>


    </View>
  );
};

const styles = StyleSheet.create({



  buttonsContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(20),
    alignSelf: 'center',
    justifyContent: "space-between",
    marginTop: responsiveHeight(11),


  },

  SignInButton: {
    width: responsiveWidth(90),
    height: responsiveHeight(9),
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
  },

  SignInButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    alignItems: 'center',
    color: BACKGROUND_COLOR
  },

  SignUpbutton: {
    width: responsiveWidth(90),
    height: responsiveHeight(9),
    backgroundColor: BACKGROUND_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    marginVertical: responsiveHeight(2)

  },

  SignUpbuttonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    alignItems: 'center',
    color: PRIMARY_COLOR,
  },
  welcomeText: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
    top: responsiveHeight(7)

  },
  subHeadingText: {
    color: SHADOW_COLOR,
    top: responsiveHeight(8),
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    width: responsiveWidth(70)
  },

  animationContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(55),
    // backgroundColor: 'red',
    alignSelf: 'center',
    top: responsiveHeight(7.5)
  }
});

export default Welcome;

