import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';

import React, { useState, useEffect } from 'react';

import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';

import LottieView from 'lottie-react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../IPConfig';

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false);

  const [otpCode, setOtpCode] = useState('');
  const [expirationTime, setExpirationTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const verifyOtp = async () => {
    try {
      const bodyData = {
        otpCode: otpCode,
        emailAddress: route.params.emailAddress,
      };
      if (expirationTime < Date.now()) {
        Alert.alert('Oops', 'OTP has expired. Please resend code.');
        return;
      }

      const apiResponse = await axios
        .post(`${baseUrl}/forgot-password/verify-otp`, bodyData)
        .then(onSuccess => {
          console.log('send otp success: ', onSuccess.data);
          navigation.replace('ChangePassword', {
            emailAddress: route.params.emailAddress,
            userId: route.params.userId,
          });
        })
        .catch(onError => {
          console.log('on error otp sending: ', onError.response.data.message);
          if (onError.response.data.statusCode == 400) {
            console.log('j');
            Alert.alert('Oops', onError.response.data.message);
          } else if (onError.response.data.statusCode == 401) {
            Alert.alert('Oops', onError.response.data.message);
          }
        });
    } catch (error) {
      console.log('error in verifying otp: ', error.response.data);
    }
  };

  const sendOtp = async () => {
    try {
      const bodyData = {
        userId: route.params.userId,
        emailAddress: route.params.emailAddress,
      };

      console.log('body: ', bodyData);
      const apiResponse = await axios
        .post(`${baseUrl}/forgot-password/send-otp-email`, bodyData)
        .then(onSuccess => {
          console.log('send otp success: ', onSuccess.data);
          Alert.alert('Hurray!', onSuccess.data.message);
          //   navigation.replace('SendAndVerifyOTP', {
          //     emailAddress: route.params.emailAddress,
          //     userId: route.params.userId,
          //   });
        })
      // Set expiration time for OTP ( 30 seconds)
      const expiration = 60 * 1000;
      setExpirationTime(Date.now() + expiration);
    } catch (error) {
      console.log('error in sending otp: ', error.response.data);
      Alert.alert('Oops', error.response.data.message);
    }
  };
  //       .catch(onError => {
  //         console.log('on error otp sending: ', onError.response.data);
  //         if (onError.response.data.statusCode == 400) {
  //           Alert.alert('Oops', onError.response.data.message);
  //         }
  //       });
  //   } catch (error) {
  //     console.log('error in sending otp: ', error.response.data);
  //   }
  // };

  useEffect(() => {
    sendOtp();
  }, [refresh]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    // Calculate the remaining time based on the expiration time
    const timer = setInterval(() => {
      const timeRemaining = Math.max(0, Math.ceil((expirationTime - Date.now()) / 1000));
      setTimeLeft(timeRemaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationTime]);


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View>
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
        </View>
        <View style={styles.animationContainer}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../../assets/animations/password-reset.json')}
            autoPlay
          />
        </View>

        <View>
          <Text style={styles.Text2}>OTP VERIFICATION</Text>
          <Text style={styles.Text}>
            Please Enter 4 digit number that we have send to Email address
          </Text>
        </View>
        <View style={styles.OtpContainer}>
          <OTPTextView
            handleTextChange={e => {
              setOtpCode(e);
            }}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCount={4}
            tintColor={'blue'}
          />
        </View>
        <TouchableOpacity
          style={styles.EnterButton}
          onPress={() => {
            verifyOtp();
          }}>
          <Text style={styles.EnterButtonText}>Verify</Text>
        </TouchableOpacity>

        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(8),
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: responsiveHeight(2),
            marginTop: responsiveHeight(-2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: SECONDARY_COLOR,
              }}>
              Didn't Recieve code?
            </Text>

            <TouchableOpacity
              onPress={() => {
                // navigateToForgotPassword();
                setRefresh(true);
              }}>

              <Text
                style={{
                  color: PRIMARY_COLOR,
                  fontWeight: 'bold',
                }}>
                {' '}
                Resend code
              </Text>
            </TouchableOpacity>

          </View>
        </View>
        <Text style={{
          color: PRIMARY_COLOR,
          alignSelf: 'center'

        }}>Time left: {formatTime(timeLeft)}</Text>
        {timeLeft === 0 && (
          <Text style={{
            color: PRIMARY_COLOR,
            alignSelf: 'center',
            fontWeight: 'bold'
          }}>OTP has expired. Please resend OTP.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(30),
    alignItems: 'center',
    alignSelf: 'center',
    top: responsiveHeight(2),
    //  backgroundColor: 'red'
  },

  Text: {
    fontWeight: 'bold',
    color: SHADOW_COLOR,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: responsiveHeight(5),
    top: responsiveHeight(4),
  },

  Text2: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
    alignSelf: 'center',
    top: responsiveHeight(3),
    textAlign: 'center',
    color: TEXT_COLOR,
  },

  OtpContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(15),
    alignItems: 'center',
    alignSelf: 'center',
    top: responsiveHeight(9),
  },

  EnterButton: {
    backgroundColor: PRIMARY_COLOR,
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    borderRadius: responsiveHeight(2),
    alignItems: 'center',
    marginTop: responsiveHeight(7),
    marginLeft: responsiveHeight(2),
    justifyContent: 'center',
  },
  EnterButtonText: {
    color: BACKGROUND_COLOR,
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: responsiveFontSize(2.5),
  },

  roundedTextInput: {
    borderRadius: 6,
    borderWidth: 2,
    width: 60,
    color: TEXT_COLOR,
    height: responsiveHeight(8),
    alignItems: 'center',
    fontSize: 20,
  },
});

export default OTPScreen;
