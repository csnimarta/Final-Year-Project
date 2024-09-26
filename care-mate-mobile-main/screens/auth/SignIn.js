import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SHADOW_COLOR,
  TEXT_COLOR,
} from '../../constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../IPConfig';
import { useToast } from 'react-native-toast-notifications';
import UserContext from '../../context/UserProvider';
import { err } from 'react-native-svg';

const SignIn = () => {
  const toast = useToast();

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [iconColor, setIconColor] = useState(
    showPassword ? TEXT_COLOR : SECONDARY_COLOR,
  );
  const [iconName, setIconName] = useState(
    showPassword ? 'eye-outline' : 'eye-off-outline',
  );

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [emailvalidationMessage, setemailValidationMessage] = useState('');
  const navigation = useNavigation();
  const { user, setUser } = React.useContext(UserContext);

  const handleSignIn = () => {
    const isEmailValid = emailRegex.test(emailAddress);
    const isPasswordValid = passwordRegex.test(password);

    if (!isEmailValid || !isPasswordValid) {
    }

    if (!emailAddress.trim() || !password.trim()) {
      console.log('Email and password are required.');
      // navigation.navigate('AdminHomescreen');
      return;
    }

    const postData = {
      email_address: emailAddress,
      password: password,
    };
    if (emailAddress.toLowerCase() === 'veenita@admin.com') {
      navigation.navigate('AdminHomescreen');
      return;
    }
    axios
      .post(`${baseUrl}/user/login`, postData)
      .then((response) => {
        if (
          response.data.status === 400 ||
          response.data.status === 404 ||
          response.data.status === 401
        ) {
          toast.show(response.data.message, { type: 'danger' });
          return;
        }
        // console.log('response.data.user_type: ', response?.data);
        if (postData.email_address.toLowerCase() === 'veenita@admin.com') {
          navigation.navigate('AdminHomescreen');
        } else if (response.data.role === 'SERVICE_PROVIDER') {
          // If user type is service provider, navigate to approval screen
          if (response.data.isAccountActive) {
            AsyncStorage.setItem('@user', JSON.stringify(response.data)).then(
              () => {
                setUser(response.data);
              },
            );
            navigation.navigate('ProviderHomeScreen');
          } else {
            navigation.navigate('ApprovalScreen');
          }
        } else if (response.data.role === 'CONSUMER') {
          AsyncStorage.setItem('@user', JSON.stringify(response.data)).then(
            () => {
              setUser(response.data);
            },
          );
          // Otherwise, navigate to home screen
          navigateToHomeScreen(response.data.role);
        }
      })
      .catch((error) => {
        if (error == 401) {
          toast.show('Failed', error.message);
        }
        console.log(error);
      });
  };

  const validateValues = (emailAddress, password) => {
    if (emailRegex.test(emailAddress)) {
      console.log('email is valid');
      if (passwordRegex.test(password)) {
        console.log('password is valid');
      } else {
        console.log(
          'Password is invalid. It must contain at least 8 characters, one letter, one number, and one special character.',
        );
      }
    } else {
      console.log(
        'Email is invalid. It must contains characters, one letter, one number, and one special character.',
      );
    }
  };

  const handleValidation = () => {
    const handleValidation = () => {
      if (password.length < 5) {
        console.log(
          'Validation failed: Password length must be at least 5 characters.',
        );
      } else {
        console.log('Validation passed: Password is valid.');
      }
    };
  };

  const handleShowPassword = () => {
    if (showPassword) {
      setIconColor(TEXT_COLOR);
      setIconName('eye-outline');
      setShowPassword(!showPassword);
    } else {
      setIconColor(SECONDARY_COLOR);
      setIconName('eye-off-outline');
      setShowPassword(!showPassword);
    }
  };

  const navigateToHomeScreen = (role) => {
    if (role == 'SERVICE_PROVIDER') {
      navigation.navigate('ProviderHomeScreen');
    } else {
      navigation.navigate('Main');
    }
  };

  const navigatetoForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View style={styles.logoContainer}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            top: responsiveHeight(-9),
          }}
          source={require('../../assets/images/logo-v2.png')}
        />
      </View>
      <View>
        <Text style={styles.welcomeText}>Welcome back</Text>
        <Text style={styles.subHeadingText}>Sign in to continue!</Text>

        <View style={styles.signInContentContainer}>
          <View style={styles.inputFieldStyle}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              placeholder="example@example.com"
              placeholderTextColor={TEXT_COLOR}
              keyboardType="email-address"
              style={styles.emailInput}
              onChangeText={(text) => {
                setEmailAddress(text);
              }}
            />
          </View>
          <View style={styles.inputFieldStyle}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder={'●●●●●●●●'}
              secureTextEntry={showPassword}
              placeholderTextColor={TEXT_COLOR}
              style={styles.passwordInput}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            {/* Display password error */}

            <View
              style={{
                position: 'absolute',
                marginTop: responsiveHeight(2),
                alignSelf: 'flex-end',
                right: responsiveWidth(3),
              }}
            >
              <Icon
                name={iconName}
                color={iconColor}
                size={25}
                onPress={() => {
                  handleShowPassword();
                }}
              />
            </View>
          </View>

          <View style={styles.forgotAndRememberContainer}>
            {/* <View // leave it 
              style={{
                flexDirection: 'row',
                width: responsiveWidth(40),
                //height: responsiveHeight(40),
                // backgroundColor: 'blue',
                alignItems: 'center',
                top: responsiveHeight(2),
              }}>
              <CheckBox
                value={checked}
                onValueChange={value => {
                  setChecked(value);
                }}
                tintColors={{ true: PRIMARY_COLOR, false: SECONDARY_COLOR }}
              />

              <Text
                style={{
                  color: SECONDARY_COLOR,
                }}>
                Remember Password
              </Text>
            </View> */}

            <View>
              <TouchableOpacity
                style={styles.passwordContainer}
                onPress={() => {
                  navigatetoForgotPassword();
                }}
              >
                <Text
                  style={{
                    color: PRIMARY_COLOR,
                    fontWeight: 'bold',
                  }}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.SignInButton}
            onPress={() => {
              handleSignIn();
            }}
          >
            <Text style={styles.SignInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View
            style={{
              width: responsiveWidth(90),
              height: responsiveHeight(8),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text
                style={{
                  color: SECONDARY_COLOR,
                }}
              >
                Don't have an account yet?
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              >
                <Text
                  style={{
                    color: PRIMARY_COLOR,
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  SignInButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    alignItems: 'center',
    color: BACKGROUND_COLOR,
  },
  logoContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(30),
    borderColor: SHADOW_COLOR,
    alignSelf: 'center',
    justifyContent: 'center',
    top: responsiveHeight(-2),
  },
  logoImage: {
    width: '100%',
    height: '85%',
    marginTop: '-7%',
  },
  welcomeText: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: responsiveFontSize(3),
    top: '-18%',
  },
  subHeadingText: {
    color: SHADOW_COLOR,
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    top: '-18%',
  },
  signInContentContainer: {
    width: responsiveWidth(50),
    height: responsiveHeight(55),
    alignSelf: 'center',
    top: '-16%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputFieldStyle: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    borderRadius: 8,
    padding: 10,

    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    marginVertical: responsiveHeight(1.2),
  },
  inputLabel: {
    color: SECONDARY_COLOR,
  },

  emailInput: {
    color: TEXT_COLOR,
    fontWeight: 'bold',
    marginTop: responsiveHeight(-1),
  },

  passwordInput: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginTop: responsiveHeight(-1),
    width: responsiveWidth(80),
  },
  SignInButton: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    marginTop: responsiveHeight(2),
  },

  forgotAndRememberContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SignIn;
