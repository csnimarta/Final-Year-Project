import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  SHADOW_COLOR,
  SECONDARY_COLOR,
} from '../constants/Colors';
const ServiceBox = ({
  serviceName,
  iconName,
  screenName,
  screenTitle,

  IconComponent = () => { },
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate(screenName, { screenTitle: screenTitle });
      }}>
      <View style={styles.imageContainer}>
        {iconName !== null ? (
          <MaterialCommunityIcons
            name={iconName}
            color={PRIMARY_COLOR}
            size={48}
          />
        ) : (
          <IconComponent />
        )}
      </View>

      <Text style={styles.label}>{serviceName}</Text>
    </TouchableOpacity>
  );
};

export default ServiceBox;

const styles = StyleSheet.create({
  container: {
    width: '30%',
    aspectRatio: 1,

    borderRadius: responsiveHeight(2),
    shadowColor: '#000000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 5,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageContainer: {
    width: '55%',
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },
});
