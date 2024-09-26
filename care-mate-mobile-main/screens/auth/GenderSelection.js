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
import {useRoute} from '@react-navigation/native';

const GenderSelection = () => {
  const route = useRoute();

  const [selectedGender, setSelectedGender] = useState('');

  const [signUpData, setSignUpData] = useState({});

  const navigation = useNavigation();

  const navigateToUserTypeSelection = genderParam => {
    navigation.navigate('UserTypeSelection', {
      signUpData: {
        gender: genderParam,
        email_address: signUpData.email_address,
        full_name: signUpData.full_name,
        password: signUpData.password,
        phone_number: signUpData.phone_number
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
                navigateToUserTypeSelection('MALE');
              }}>
              <Image
                source={{uri: 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-7/512/Male-icon.png'}}
                style={styles.iconImageStyle}
              />
            </TouchableOpacity>
            <Text style={styles.genderLabelStyle}>Male</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                navigateToUserTypeSelection('FEMALE');
              }}>
              <Image
                source={{uri: 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-7/256/Female-icon.png'}}
                style={styles.iconImageStyle}
              />
            </TouchableOpacity>
            <Text style={styles.genderLabelStyle}>Female</Text>
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
    width: '75%',
    height: '75%',
    alignSelf: 'center',
    marginTop: responsiveHeight(2)
  },
  iconButton: {
    height: '90%',
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

export default GenderSelection;
