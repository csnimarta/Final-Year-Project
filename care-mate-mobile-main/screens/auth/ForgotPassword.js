import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  SHADOW_COLOR,
  SECONDARY_COLOR,
} from '../../constants/Colors';
import LottieView from 'lottie-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {baseUrl} from '../../IPConfig';
import axios from 'axios';

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState('');

  const [emailvalidationMessage, setemailValidationMessage] = useState('');
  const navigation = useNavigation();

  const validateValues = emailAddress => {
    const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;

    if (emailRegex.test(emailAddress)) {
      console.log('Email is valid');
    } else {
      console.log(
        'Email is invalid. It must contain characters, one letter, one number, and one special character.',
      );
    }
  };

  const checkUserEmail = async () => {
    // try {
    const bodyData = {
      emailAddress: emailAddress,
    };

    console.log('body data: ', bodyData);

    const apiResponse = await axios
      .post(`${baseUrl}/forgot-password/check-user-email`, bodyData)
      .then(onSuccess => {
        console.log('on success: ', onSuccess.data);
        navigation.replace('OTPScreen', {
          userId: onSuccess.data.data._id,
          emailAddress: onSuccess.data.data.email_address,
        });
      })
      .catch(onError => {
        console.log('on error catch user email: ', onError.response.data);
        if (onError.response.data.statusCode == 400) {
          Alert.alert('Oops', onError.response.data.message);
        } else if (onError.response.data.statusCode == 404) {
          Alert.alert('Oops', onError.response.data.message);
        } else {
          console.log('else me');
        }
      });
    // } catch (error) {
    //   console.log('error in checking user email: ', error);
    // }
  };

  const handleForgotPassword = () => {
    console.log('emailaddress:', emailAddress);
  };

  const navigateToOTPScreen = () => {
    // navigation.navigate('OTPScreen');
    checkUserEmail();
  };
  // const navigateToHomeScreen = () => {
  //     navigation.navigate("HomeScreen")
  // }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/arrow-back.png')}
            style={{
              width: responsiveWidth(8),
              height: responsiveHeight(2),
              tintColor: PRIMARY_COLOR,
              top: responsiveHeight(2),
              marginLeft: responsiveHeight(3),
            }}
          />
        </TouchableOpacity>

        <View style={styles.animationContainer}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../../assets/animations/forgot-password.json')}
            autoPlay
          />
        </View>
        <View>
          <Text style={styles.HeadingText}>Forgot Your Password?</Text>

          <Text style={styles.subheadingText}>
            Please enter your registered email address below to reset your
            password!
          </Text>

          <View style={styles.inputFieldStyle}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              placeholder="example@example.com"
              placeholderTextColor={TEXT_COLOR}
              keyboardType="email-address"
              style={styles.emailInput}
              onChangeText={text => {
                setEmailAddress(text);
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.SendButton}
            onPress={() => {
              navigateToOTPScreen();
            }}>
            <Text style={styles.SendButtonText}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(8),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginLeft: responsiveHeight(2),
            }}>
            <Text
              style={{
                color: SECONDARY_COLOR,
              }}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text
                style={{
                  color: PRIMARY_COLOR,
                  fontWeight: 'bold',
                }}>
                {' '}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(30),
    // backgroundColor: 'red',
    alignItems: 'center',
    alignSelf: 'center',
    top: responsiveHeight(4),
  },

  inputFieldStyle: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    top: responsiveHeight(8),
    marginLeft: responsiveHeight(2),
  },

  inputLabel: {
    color: SECONDARY_COLOR,
  },
  emailInput: {
    color: TEXT_COLOR,
    fontWeight: 'bold',
    marginTop: responsiveHeight(-1),
  },

  inputLabel: {
    color: SECONDARY_COLOR,
  },

  subheadingText: {
    top: responsiveHeight(4),
    fontWeight: 'bold',
    // backgroundColor: "red",
    color: SHADOW_COLOR,
    marginHorizontal: responsiveHeight(5),
    alignSelf: 'center',
    textAlign: 'center',
  },

  HeadingText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.5),

    top: responsiveHeight(3),
    color: TEXT_COLOR,
    textAlign: 'center',
  },

  SendButton: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    marginTop: responsiveHeight(12),
    marginLeft: responsiveHeight(2),
  },

  SendButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    alignItems: 'center',
    color: BACKGROUND_COLOR,
  },
});

export default ForgotPassword;
