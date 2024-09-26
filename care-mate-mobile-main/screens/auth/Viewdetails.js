import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
} from '../../constants/Colors';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {PrivateValueStore, useNavigation} from '@react-navigation/native';

const ViewDetails = ({route}) => {
  const {Workingdays, serviceType, budget, successMessage} = route.params;
  const navigation = useNavigation();
  const navigateToCreateService = () => {
    navigation.navigate('CreateService');
  };

  const navigateToProviderHomeScreen = () => {
    navigation.navigate('ProviderHomeScreen');
  };

  

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <Text style={styles.header}>{successMessage}</Text>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Working days:</Text>
          <Text style={styles.value}>{Workingdays}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Service Type:</Text>
          <Text style={styles.value}>{serviceType}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Budget:</Text>
          <Text style={styles.value}>Rs{budget}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          top: responsiveHeight(9),
        }}>
        <TouchableOpacity
          onPress={() => {
            navigateToCreateService();
          }}>
          <Text style={styles.buttonText}>Edit Service</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: responsiveFontSize(1.5),
            color: PRIMARY_COLOR,
            fontWeight: 'bold',
            alignSelf: 'center',
          }}>
          Or
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigateToProviderHomeScreen();
          }}>
          <Text style={styles.buttonText}>Homescreen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90),
    top: responsiveHeight(9),
    marginVertical: responsiveHeight(1),
    marginBottom: responsiveHeight(4),
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    // flex: 1,
    minHeight: responsiveHeight(10),

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: '#F5F5F5',
    borderRadius: responsiveHeight(2),
  },
  header: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    top: responsiveHeight(3.5),
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: responsiveHeight(2),
    // backgroundColor: 'red'
  },
  label: {
    fontWeight: 'bold',
    marginRight: responsiveHeight(1),
    color: PRIMARY_COLOR,
  },
  value: {
    color: TEXT_COLOR,
  },

  buttonText: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
  },
});
export default ViewDetails;
