import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {useNavigation} from '@react-navigation/native';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SHADOW_COLOR,
  TEXT_COLOR,
  BACKGROUND_COLOR,
} from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PersonalInfo = () => {
  const navigation = useNavigation();
  const navigateToHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
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
        <TouchableOpacity
          onPress={() => {
            navigateToHomeScreen();
          }}>
          <Text style={styles.Text}>Done</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          top: responsiveHeight(5),
          marginLeft: responsiveHeight(3),
        }}>
        <Text style={styles.details}>Personal Details</Text>
        <Text style={styles.details2}>
          we use this information to verify your identity and to keep our
          community safe. You decide what personal details you make visible to
          others.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.headingText}>Contact info</Text>
        <View
          style={{
            marginLeft: responsiveHeight(2),
            flexDirection: 'row',
            marginBottom: responsiveHeight(3),
            justifyContent: 'space-between',
            marginBottom: responsiveHeight(0.5),
          }}>
          <TouchableOpacity>
            <Text style={styles.Personalinfotext}>Abc12@gmail.com ,</Text>
            <Text style={styles.Personalinfotext}>+9203324531789 ,</Text>
            <Text style={styles.Personalinfotext}>v12#@56</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={23}
              color={TEXT_COLOR}
              style={{
                marginLeft: responsiveWidth(77),
                top: responsiveHeight(-5),
              }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headingText}>Other info</Text>
        <View
          style={{
            marginLeft: responsiveHeight(2),
            flexDirection: 'row',
            marginBottom: responsiveHeight(3),
            justifyContent: 'space-between',
            marginBottom: responsiveHeight(0.5),

            //top: responsiveHeight(2)
          }}>
          <TouchableOpacity>
            <Text style={styles.Personalinfotext}>Age ,</Text>
            <Text style={styles.Personalinfotext}>Area</Text>
            <Text style={styles.Personalinfotext}>gender</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={23}
              color={TEXT_COLOR}
              style={{
                marginLeft: responsiveWidth(77),
                top: responsiveHeight(-5),
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.headingText}>Account ownership and control</Text>
        <View
          style={{
            marginLeft: responsiveHeight(2),
            flexDirection: 'row',
            marginBottom: responsiveHeight(3),
            justifyContent: 'space-between',

            //top: responsiveHeight(2)
          }}>
          <TouchableOpacity>
            <Text style={styles.Personalinfotext}>
              manage your Date, modify your legacy contact,deactivate or delete
              your accounts and profiles.
            </Text>

            <MaterialIcons
              name="keyboard-arrow-right"
              size={23}
              color={TEXT_COLOR}
              style={{
                marginLeft: responsiveWidth(77),
                top: responsiveHeight(-2),
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Text: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(2),
    //marginHorizontal: responsiveHeight(10)
    top: responsiveHeight(2),
    marginRight: responsiveHeight(3),
  },
  details: {
    color: TEXT_COLOR,
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  details2: {
    color: TEXT_COLOR,
    fontSize: responsiveFontSize(2),
  },
  container: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    top: responsiveHeight(9),
    borderRadius: responsiveHeight(4),
    minHeight: responsiveHeight(20),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 5,
    backgroundColor: '#fff',
    //marginVertical: responsiveHeight(6)
  },
  headingText: {
    color: TEXT_COLOR,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginLeft: responsiveHeight(2),
    top: responsiveHeight(3),
  },
  Personalinfotext: {
    color: TEXT_COLOR,
    top: responsiveHeight(3),
    //  flexDirection: 'column'
  },
});
export default PersonalInfo;
