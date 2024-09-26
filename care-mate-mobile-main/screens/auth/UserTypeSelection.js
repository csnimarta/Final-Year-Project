import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  SHADOW_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
} from '../../constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import SignUp from './SignUp';
import {useRoute} from '@react-navigation/native';

const UserTypeSelection = () => {
  const route = useRoute();

  console.log('route:', route.params);
  const [signUpData, setSignUpData] = useState({});

  const navigation = useNavigation();

  const navigateToAgeSelection = userRole => {
    navigation.navigate('AgeSelection', {
      signUpData: {
        gender: signUpData.gender,
        email_address: signUpData.email_address,
        full_name: signUpData.full_name,
        password: signUpData.password,
        phone_number: signUpData.phone_number,
        userType: userRole
      }
    });
  };

  useEffect(() => {
    console.log('route data gender: ', route.params);
    setSignUpData(route.params.signUpData);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffff',
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

        <Text style={styles.Message}>Greetings</Text>
        <Text style={styles.subHeadingMessage}>
          This is your space to personalize and manage your experience with us.
        </Text>

        <View style={styles.animationContainer}>
          <LottieView
            style={{
              width: '100%',
              height: '100%',
            }}
            source={require('../../assets/animations/user-type-selection.json')}
            autoPlay
            loop
          />
        </View>

        <View style={styles.iconsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                navigateToAgeSelection('CONSUMER');
              }}>
              {signUpData.gender === 'MALE' ? (
                <Image
                  source={{uri: 'https://res.cloudinary.com/dsek1jm9h/image/upload/v1715075480/consumer-male_ns9kws.jpg'}}
                  style={styles.iconImageStyle}
                />
              ) : (
                <Image
                  source={{uri: 'https://res.cloudinary.com/dsek1jm9h/image/upload/v1715075480/consumer-female_dfoqg9.jpg'}}
                  style={styles.iconImageStyle}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.genderLabelStyle}>Consumer</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                navigateToAgeSelection('SERVICE_PROVIDER');
              }}>
              {signUpData.gender === 'MALE' ? (
                <Image
                  source={{uri: 'https://res.cloudinary.com/dsek1jm9h/image/upload/v1715075593/service-provider-male_q1y5c9.jpg'}}
                  style={styles.iconImageStyle}
                />
              ) : (
                <Image
                  source={{uri: 'https://res.cloudinary.com/dsek1jm9h/image/upload/v1715075593/service-provider-female_rvxpjv.jpg'}}
                  style={styles.iconImageStyle}
                />
              )}
            </TouchableOpacity>
            <Text style={styles.genderLabelStyle}>Service Provider</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(36),
    alignSelf: 'center',
    top: responsiveHeight(15.5),
  },

  Message: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
    top: responsiveHeight(7),
    //backgroundColor: 'red',
  },
  subHeadingMessage: {
    color: SHADOW_COLOR,
    width: responsiveWidth(75),
    //backgroundColor: 'red',
    textAlign: 'center',
    top: responsiveHeight(8),
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
  },

  iconsContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(25),
    alignSelf: 'center',
    top: responsiveHeight(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: "red"
  },
  buttonContainer: {
    width: '35%',
    height: '70%',
  },
  iconImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 35,
    top: -0.6,
  },
  iconButton: {
    height: '85%',
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: PRIMARY_COLOR,
  },
  genderLabelStyle: {
    color: TEXT_COLOR,
    textAlign: 'center',
    marginTop: 7,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UserTypeSelection;
