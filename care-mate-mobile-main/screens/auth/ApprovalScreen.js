import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth
} from 'react-native-responsive-dimensions';
import {PRIMARY_COLOR} from '../../constants/Colors';
import ApprovalMeetingIllustration from '../../assets/images/approval-meeting.svg';
import ArrowBackIcon from '../../assets/images/arrow-back.svg';
import {useNavigation} from '@react-navigation/native';


const ApprovalScreen = () => {

  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveHeight(100)
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          navigation.goBack();
        }}
        style={{position: 'absolute', top: responsiveWidth(5), left: responsiveWidth(5), backgroundColor: PRIMARY_COLOR, padding: 7.5, borderRadius: 100}}>
        <ArrowBackIcon height={22.5} width={22.5} />
      </TouchableOpacity>
      <ApprovalMeetingIllustration width={responsiveWidth(80)} />
      <Text style={styles.Text}>
        Our team is checking your profile request. Please wait for us to verify your credentials.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  Text: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    textAlign: 'center',
    width: responsiveWidth(80)
  },
});
export default ApprovalScreen;
