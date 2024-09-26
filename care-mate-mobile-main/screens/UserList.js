import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  TEXT_COLOR,
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  SHADOW_COLOR,
  SECONDARY_COLOR,
} from '../constants/Colors';
import moment from 'moment';

const UserList = ({ name, serviceType, requestTime }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#fff',
          flex: 1,
          paddingVertical: responsiveHeight(1),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: responsiveHeight(1),
        },
      ]}
    >
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.serviceType}>{serviceType}</Text>
      </View>
      <Text style={styles.requesttime}>
        {moment({ requestTime }).fromNow(true)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(90),
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: responsiveHeight(2),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  name: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  serviceType: {
    fontSize: responsiveFontSize(1.5),
    color: PRIMARY_COLOR,
    //  backgroundColor: 'red'
  },
  requesttime: {
    fontSize: responsiveFontSize(1.5),
    color: TEXT_COLOR,
    //flexDirection: 'row'
  },
});
export default UserList;
