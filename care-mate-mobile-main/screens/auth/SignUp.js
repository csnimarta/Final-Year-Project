import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  TurboModuleRegistry,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
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

import PhoneInput from 'react-native-phone-input';

import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [iconColor, setIconColor] = useState(
    showPassword ? TEXT_COLOR : SECONDARY_COLOR,
  );
  const [iconName, setIconName] = useState(
    showPassword ? 'eye-outline' : 'eye-off-outline',
  );

  const [emailAddress, setEmailAddress] = useState('test@test.com');
  const [phonenumber, setPhoneNumber] = useState('1234567890123');
  const [password, setPassword] = useState('sNb173456@@');

  const [full_name, setFullName] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [emailvalidationMessage, setemailValidationMessage] = useState('');
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const phonenumberRegex = /^\d{11}$/;

  const validateValues = (emailAddress, phonenumber, password) => {
    // Validate email
    if (!emailRegex.test(emailAddress)) {
      console.log(
        'Email is invalid. It must contain characters, one letter, one number, and one special character.',
      );
      return false;
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      console.log(
        'Password is invalid. It must contain at least 8 characters, one letter, one number, and one special character.',
      );
      return false;
    }

    // Validate phone number
    if (!phonenumberRegex.test(phonenumber)) {
      console.log('Phonenumber is invalid. It must contain 11 digits.');
      return false;
    }

    return true;
  };

  const [userNameError, setUserNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignUp = () => {
    const isValid = validateValues(emailAddress, phonenumber, password);

    if (isValid) {
      console.log('All values are valid. Proceeding with signup.');

      const postData = {
        email_address: emailAddress,
        password: password,
        phone_number: phonenumber,
        full_name: full_name,
      };

      navigatetoGenderSelection(postData);
    } else {
      // Set error messages for each input field
      if (!emailRegex.test(emailAddress)) {
        setEmailError('Email is invalid.');
      } else {
        setEmailError('');
      }

      if (!passwordRegex.test(password)) {
        setPasswordError('Password is invalid.');
      } else {
        setPasswordError('');
      }

      if (!phonenumberRegex.test(phonenumber)) {
        setPhoneNumberError('Phone number is invalid.');
      } else {
        setPhoneNumberError('');
      }
      if (!passwordRegex.test(password)) {
        setConfirmPasswordError('Confirm password is not valid');
      } else {
        setConfirmPasswordError('');
      }
      // Display validation error alert
      Alert.alert('Validation Error', 'Please check your input values.');
    }
  };

  const handleValidation = () => {
    if (inputvalue.length < 5) {
      console.log(
        'Validation failed: password Input length must be at least 8 characters.',
      );
    } else {
      console.log('Validation passed: Input is valid.');
    }
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

  const navigatetoGenderSelection = data => {
    navigation.navigate('GenderSelection', {signUpData: data});
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
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
        <Text style={styles.welcomeText}>Create Account</Text>
        <Text style={styles.subHeadingText}>Sign Up to get started!</Text>

        <View style={styles.SignUpContentContainer}>
          <View style={styles.inputFieldStyle}>
            <Text style={styles.inputLabel}>User Name</Text>
            <TextInput
              placeholder="John Doe"
              placeholderTextColor={TEXT_COLOR}
              style={styles.nameInput}
              onChangeText={text => {
                setFullName(text);
              }}
            />
            <Text style={styles.errorText}>{userNameError}</Text>
          </View>

          <View style={styles.inputFieldStyle}>
            <Text style={styles.inputLabel}>Mobile number</Text>
            <TextInput
              initialCountry="Pakistan"
              placeholder="+92 123456789"
              placeholderTextColor={TEXT_COLOR}
              style={styles.phoneInput}
              keyboardType="phone-pad"
              onChangeText={text => {
                setPhoneNumber(text);
              }}
            />
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          </View>

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
            <Text style={styles.errorText}>{emailError}</Text>
          </View>

          <View style={[styles.inputFieldStyle]}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              placeholder={'●●●●●●●●'}
              secureTextEntry={showPassword}
              placeholderTextColor={TEXT_COLOR}
              style={styles.passwordInput}
              onChangeText={text => {
                setPassword(text);
              }}
            />
            <Text style={styles.errorText}>{passwordError}</Text>
            <View
              style={{
                position: 'absolute',
                marginTop: responsiveHeight(2),
                alignSelf: 'flex-end',
                right: responsiveWidth(3),
              }}>
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

          <View style={[styles.inputFieldStyle]}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              placeholder={'●●●●●●●●'}
              secureTextEntry={showPassword}
              placeholderTextColor={TEXT_COLOR}
              style={styles.confirmpasswordInput}
              onChangeText={text => {
                setPassword(text);
              }}
            />
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
            <View
              style={{
                position: 'absolute',
                marginTop: responsiveHeight(2),
                alignSelf: 'flex-end',
                right: responsiveWidth(3),
              }}>
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

          <TouchableOpacity
            style={styles.SignUpButton}
            onPress={() => {
              handleSignUp();
            }}>
            <Text style={styles.SignUpButtonText}>Next</Text>
          </TouchableOpacity>

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
                top: responsiveHeight(-2),
              }}>
              <Text
                style={{
                  color: SECONDARY_COLOR,
                }}>
                Already have an account?
              </Text>

              <TouchableOpacity
                style={{}}
                onPress={() => {
                  navigation.navigate('SignIn');
                }}>
                <Text
                  style={{
                    color: PRIMARY_COLOR,
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SignUpButtonText: {
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
    // backgroundColor: 'red'
  },

  welcomeText: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: responsiveFontSize(4),
    top: '-15%',
    marginLeft: responsiveHeight(2.5),
  },
  subHeadingText: {
    color: SHADOW_COLOR,
    textAlign: 'center',
    fontSize: responsiveHeight(2),
    alignSelf: 'center',
    top: '-15%',
    marginLeft: responsiveHeight(3),
  },
  SignUpContentContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(70),
    top: '-13%',
    alignSelf: 'center',

    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "red"
  },
  inputFieldStyle: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    borderRadius: 8,
    padding: 10,

    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    marginVertical: 8,
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
  nameInput: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginTop: responsiveHeight(-1),
    width: responsiveWidth(80),
  },

  phoneInput: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginTop: responsiveHeight(-1),
    width: responsiveWidth(80),
  },

  confirmpasswordInput: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    marginTop: responsiveHeight(-1),
    width: responsiveWidth(80),
  },

  SignUpButton: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    marginTop: responsiveHeight(2),
  },

  errorText: {
    fontSize: responsiveFontSize(1.5),
    top: responsiveHeight(0.5),
    //   marginTop: responsiveHeight(-0.5),
    color: 'red',
  },
});

export default SignUp;
