import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import React, {useEffect, useState} from 'react';

import {
  BACKGROUND_COLOR,
  SHADOW_COLOR,
  TEXT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../../constants/Colors';
import {useRoute} from '@react-navigation/native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

import * as Animatable from 'react-native-animatable';

export default function AgeSelection() {
  const navigation = useNavigation();
  const route = useRoute();

  const [age, setAge] = useState(0);
  const [signUpData, setSignUpData] = useState(route.params.signUpData);

  const [selectedValueIndex, setSelectedValueIndex] = useState(7);

  const navigateToAreaSelection = () => {
    navigation.navigate('AreaSelection');
  };

  const navigateToPreferences = () => {
    navigation.navigate('Preferences', {
      signUpData: {
        gender: signUpData.gender,
        email_address: signUpData.email_address,
        full_name: signUpData.full_name,
        password: signUpData.password,
        phone_number: signUpData.phone_number,
        userType: signUpData.userType,
        age: age,
      },
    });
  };

  const handleValueChange = (data, selectedIndex) => {
    console.log('Your age is:', data);
    setAge(data);
    setSelectedValueIndex(selectedIndex);
  };

  useEffect(() => {
    console.log('route data age: ', route.params);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
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
        <Text style={styles.ageText}>How Old Are You?</Text>
        <Text style={styles.subHeadingText}>
          This helps us to provide you age-specific services
        </Text>

        <View style={styles.pickerContainer}>
          <ScrollPicker
            dataSource={[
              '18',
              '19',
              '20',
              '21',
              '22',
              '23',
              '24',
              '25',
              '26',
              '27',
              '28',
              '29',
              '30',
              '31',
              '32',
              '33',
              '34',
              '35',
            ]}
            selectedIndex={selectedValueIndex}
            renderItem={(data, index) => {
              const isSelected = index === selectedValueIndex;
              return (
                <TouchableOpacity
                  onPress={() => handleValueChange(data, index)}
                  key={index}
                  style={[
                    styles.pickerItem,
                    {
                      borderBottomColor: isSelected
                        ? PRIMARY_COLOR
                        : 'transparent',
                    },
                  ]}>
                  <Text
                    style={{
                      color: isSelected ? PRIMARY_COLOR : SHADOW_COLOR,
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(4),
                    }}>
                    {data}
                  </Text>
                </TouchableOpacity>
              );
            }}
            onValueChange={handleValueChange}
            itemHeight={70}
            wrapperBackground="#fff"
            highlightColor="#3465d9"
            highlightBorderWidth={3}
          />
        </View>

        <View style={styles.selectedAgeContainer}>
          <Text style={styles.selectedAgeText}>
            You are {selectedValueIndex + 18} years old
          </Text>
        </View>

        <View style={styles.ButtonContainer}>
          <Animatable.View
            style={styles.container}
            animation="zoomIn"
            duration={1500}>
            <View
              style={{
                width: responsiveWidth(90),
                height: responsiveHeight(18),
                alignSelf: 'center',
                justifyContent: 'space-between',
                top: responsiveHeight(25),
              }}>
              <TouchableOpacity
                style={styles.NextButton}
                onPress={() => {
                  navigateToPreferences();
                }}>
                <Text style={styles.NextButtonText}>Next</Text>
              </TouchableOpacity>

              {signUpData.userRole == 'CONSUMER' && (
                <TouchableOpacity
                  style={styles.SkipButton}
                  onPress={() => {
                    navigateToPreferences();
                  }}>
                  <Text style={styles.SkipButtonText}>Skip</Text>
                </TouchableOpacity>
              )}
            </View>
          </Animatable.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ageText: {
    fontWeight: 'bold',
    color: TEXT_COLOR,
    textAlign: 'center',
    fontSize: responsiveFontSize(4),
    top: responsiveHeight(7),
  },
  subHeadingText: {
    top: responsiveHeight(9),
    color: SHADOW_COLOR,
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    width: responsiveWidth(80),
  },

  pickerContainer: {
    width: responsiveWidth(50),
    height: responsiveHeight(36),
    alignSelf: 'center',
    top: responsiveHeight(18),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  NextButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    alignItems: 'center',
    color: BACKGROUND_COLOR,
  },
  NextButton: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(2),
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    // top: responsiveHeight(29),
    alignSelf: 'center',
  },

  SkipButton: {
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    // top: responsiveHeight(1),
    alignSelf: 'center',
    borderColor: PRIMARY_COLOR,
    borderWidth: 1,
  },
  SkipButtonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    alignItems: 'center',
    fontSize: responsiveFontSize(2.5),
  },

  selectedAgeContainer: {
    alignItems: 'center',
    top: responsiveHeight(23),
    // backgroundColor: 'red',
  },

  selectedAgeText: {
    fontSize: responsiveFontSize(2.5),
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});
