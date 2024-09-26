import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  PRIMARY_COLOR,
  TEXT_COLOR,
  SECONDARY_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';

import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {baseUrl} from '../../IPConfig';
import axios from 'axios';

const ChangePassword = () => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const [showPassword, setShowPassword] = useState(false);
  const [iconColor, setIconColor] = useState(
    showPassword ? TEXT_COLOR : SECONDARY_COLOR,
  );
  const [iconName, setIconName] = useState(
    showPassword ? 'eye-outline' : 'eye-off-outline',
  );
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (passwordRegex.test(password)) {
    console.log('Password is valid');
  } else {
    console.log(
      'Password is invalid. It must contain at least 8 characters, one letter, one number, and one special character.',
    );
  }

  const handleChangePassword = () => {
    console.log('password:', password);
  };

  const navigation = useNavigation();
  const route = useRoute();

  const resetPassword = async data => {
    try {
      const bodyData = {
        updatedPassword: password,
        updatedConfirmPassword: confirmPassword,
        userId: route.params.userId,
      };

      console.log('body: ', bodyData);
      const apiResponse = await axios
        .post(`${baseUrl}/forgot-password/reset-password`, bodyData)
        .then(onSuccess => {
          console.log('send otp success: ', onSuccess.data);
          Alert.alert(
            'Yayy',
            onSuccess.data.message,
            [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('SignIn');
                },
              },
            ],
            {cancelable: false},
          );

          //   navigation.replace('PasswordChange', {
          //     emailAddress: route.params.emailAddress,
          //     userId: route.params.userId,
          //   });
        })
        .catch(onError => {
          console.log('on error otp sending: ', onError.response.data);
          if (onError.response.data.statusCode == 400) {
            console.log('j');
            Alert.alert('Oops', onError.response.data.message);
          } else if (onError.response.data.statusCode == 404) {
            Alert.alert('Oops', onError.response.data.message);
          }
        });
    } catch (error) {
      console.log('error in verifying otp: ', error.response.data);
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
      </View>
      <View style={styles.animationContainer}>
        <LottieView
          style={{
            width: '100%',
            height: '100%',
          }}
          source={require('../../assets/animations/confirm-password.json')}
          autoPlay
          onAnimationFinish={() => {
            console.log('finished');
          }}
          loop={false}
        />
      </View>

      <View>
        <Text style={styles.Textdesign}>Change Your Password!</Text>
        <Text style={styles.subheadingText}>
          Your New Password Should Be different From Your Old Password.
        </Text>
      </View>

      <View style={styles.PasswordContainer}>
        <View style={[styles.inputFieldStyle]}>
          <Text style={styles.inputLabel}>New Password</Text>
          <TextInput
            placeholder={'●●●●●●●●'}
            secureTextEntry={showPassword}
            placeholderTextColor={TEXT_COLOR}
            style={styles.passwordInput}
            onChangeText={text => {
              setPassword(text);
            }}
          />

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

          <View style={[styles.inputFieldStyle]}>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              placeholder={'●●●●●●●●'}
              secureTextEntry={showPassword}
              placeholderTextColor={TEXT_COLOR}
              style={styles.confirmpasswordInput}
              onChangeText={text => {
                setConfirmPassword(text);
              }}
            />

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
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            resetPassword();
          }}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    //   backgroundColor: 'red',
    width: responsiveWidth(90),
    height: responsiveHeight(20),
    alignSelf: 'center',
    top: responsiveHeight(3),
    marginLeft: responsiveHeight(5),
  },

  Textdesign: {
    //  backgroundColor: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.5),
    color: TEXT_COLOR,
    top: responsiveHeight(4),
  },

  subheadingText: {
    //  backgroundColor: 'red',
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: SHADOW_COLOR,
    top: responsiveHeight(5),
    marginHorizontal: responsiveHeight(5),
  },

  PasswordContainer: {
    top: responsiveHeight(3),
    width: responsiveWidth(90),
    height: responsiveHeight(50),
    alignSelf: 'center',
    marginVertical: responsiveHeight(5),
  },

  inputFieldStyle: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: SECONDARY_COLOR,
    alignSelf: 'center',
    marginVertical: responsiveHeight(1.5),
  },

  inputLabel: {
    color: SECONDARY_COLOR,
  },

  passwordInput: {
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

  confirmButton: {
    borderRadius: responsiveHeight(2),
    alignSelf: 'center',
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    top: responsiveHeight(13),
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontWeight: 'bold',
    color: BACKGROUND_COLOR,
    textAlign: 'center',
    fontSize: responsiveFontSize(2.5),
  },
});

export default ChangePassword;
