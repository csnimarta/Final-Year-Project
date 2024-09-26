import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Button,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  BACKGROUND_COLOR,
  SECONDARY_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';

import {useNavigation} from '@react-navigation/native';
import {useSafeAreaFrame} from 'react-native-safe-area-context';

import {Chip} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';

const preferences = [
  {
    id: 1,
    title: 'Cook',
    iconName: 'bowl-mix',
  },
  {
    id: 2,
    title: 'Maid',
    iconName: 'broom',
  },

  {
    id: 3,
    title: 'Elderly Care',
    iconName: 'cards-heart',
  },

  {
    id: 4,
    title: 'Baby Sitter',
    iconName: 'baby-carriage',
  },
];

UserInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [signUpData, setSignUpData] = useState(route.params.signUpData);

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateToSignIn = () => {
    if (navigation.canGoBack()) {
      navigation.popToTop();
    }
    navigation.navigate('Welcome');
    navigation.navigate('SignIn');
  };

  const navigateToAreaSelection = () => {
    navigation.navigate('AreaSelection');
  };

  const navigateToPreferences = () => {
    navigation.navigate('Preferences');
  };

  const navigateToRegistered = () => {
    navigation.navigate('Registered');
  };

  const [AgeSelection, setSelectedAge] = useState(signUpData.age);
  const [GenderSelection, setSelectedGender] = useState(signUpData.gender);
  const [EmailAddress, setEmailAddress] = useState(
    signUpData.email_address,
  );
  const [Phonenumber, setPhoneNumber] = useState(
    signUpData.phone_number,
  );
  const [Usertype, setUserType] = useState(signUpData.userType);
  const [Password, setPassword] = useState(signUpData.password);
  const [Fullname, setFullName] = useState(signUpData.full_name);
  const [selectedcnic, setSelectedCnic] = useState(signUpData.cnic_image);
  const [selectedArea, setSelectedArea] = useState(signUpData.area.name);
  const [userPreferences, setUserPreferences] = useState(
    signUpData.preferences,
  );

  const [IsModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const registerUser = async () => {

    try {
      const bodyData = {
        email_address: EmailAddress,
        password: Password,
        full_name: Fullname,
        phone_number: Phonenumber,
        gender: GenderSelection,
        area: signUpData.area?._id,
        age: signUpData.age ? signUpData.age : 25,
        cnic_image: signUpData.cnic_image,
        preferences: userPreferences,
        userType: Usertype,
      };
      console.log('bodyData: ', bodyData);
      const apiResponse = await axios
        .post(`${ baseUrl }/user/signup`, bodyData)
        .then(onSuccess => {
          console.log('onSuccess: ', onSuccess.data);
          setModalVisible(true);
        })
        .catch(onError => {
          console.log('on error: ', onError.response.data);
          if (onError.response.data.status == 409) {
            Alert.alert('Ohh no!', onError.response.data.message);
          }
        });
    } catch (error) {
      console.log('error in register user: ', error);
    }
  };

  const toggleModal = () => {
    console.log('route.params?.preferences: ', signUpData.preferences);
    setModalVisible(!IsModalVisible);
  };

  React.useEffect(() => {
    console.log(signUpData.age);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={styles.Container}>
        <ScrollView
          style={{
            flex: 1,
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

            <View style={styles.sectionContainer}>
              <Text
                style={styles.sectionHeading}
                onPress={() => {
                  navigateToSignUp();
                }}>
                Personal Details
              </Text>
              <Text style={styles.sectiontextStyle}>Name: {Fullname}</Text>

              <Text style={styles.sectiontextStyle}>
                Phonenumber: {Phonenumber}
              </Text>

              <Text style={styles.sectiontextStyle}>Age: {AgeSelection}</Text>

              <Text style={styles.sectiontextStyle}>
                Gender: {GenderSelection}
              </Text>

              <Text style={styles.sectiontextStyle}>Usertype: {Usertype}</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text
                style={styles.sectionHeading}
                onPress={() => {
                  navigateToSignIn();
                }}>
                Account Details
              </Text>

              <Text style={styles.sectiontextStyle}>
                Emailaddress: {EmailAddress}
              </Text>

              <Text style={styles.sectiontextStyle}>Password: {Password}</Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text
                style={styles.sectionHeading}
                onPress={() => {
                  navigateToAreaSelection();
                }}>
                Selected Area
              </Text>

              <Text style={styles.sectiontextStyle}>Area: {selectedArea}</Text>
            </View>

            {route.params.userRole == 'SERVICE_PROVIDER' && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeading}>User's CNIC</Text>
                {selectedcnic && (
                  <Image
                    style={{
                      backgroundColor: 'red',
                      width: '100%',
                      height: 300,
                      borderRadius: 10,
                    }}
                    source={{uri: selectedcnic}}
                    resizeMode="cover"
                  />
                )}
              </View>
            )}
          </View>
          <View>
            <Modal isVisible={IsModalVisible}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View
                  style={{
                    top: responsiveHeight(1),
                    backgroundColor: 'white',
                    padding: 12,
                    height: responsiveHeight(45),
                    width: responsiveWidth(90),
                    borderRadius: responsiveHeight(5),
                  }}>
                  <View style={styles.header}>
                    <TouchableOpacity onPress={toggleModal}>
                      <Ionicons
                        name="close-sharp"
                        size={26}
                        color={PRIMARY_COLOR}
                        style={{
                          top: responsiveHeight(2),
                        }}
                      />
                    </TouchableOpacity>

                    <View style={styles.animationContainer}>
                      <LottieView
                        style={{
                          width: '100%',
                          height: '100%',
                          //  backgroundColor: 'red'
                        }}
                        source={require('../../assets/animations/registered-successfully.json')}
                        autoPlay
                        onAnimationFinish={() => {
                          console.log('finished');
                        }}
                        loop={false}></LottieView>

                      <Animatable.View
                        style={styles.container}
                        animation="zoomIn"
                        duration={1500}>
                        <TouchableOpacity
                          style={styles.Continuebutton}
                          onPress={() => {
                            navigateToSignIn();
                          }}>
                          <Text style={styles.ContinueText}>
                            Continue To Sign-In!
                          </Text>
                        </TouchableOpacity>
                      </Animatable.View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={styles.Registerbutton}
              onPress={registerUser}>
              <Text style={styles.RegisterbuttonText}>Register Yourself</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },

  sectionContainer: {
    width: responsiveWidth(90),
    top: responsiveHeight(6),
    marginVertical: responsiveHeight(1),
    marginBottom: responsiveHeight(4),
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000000',
    flex: 1,
    minHeight: responsiveHeight(15),

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
  sectiontextStyle: {
    color: TEXT_COLOR,
    fontSize: responsiveFontSize(1.5),
    marginTop: responsiveHeight(0.1),
    fontWeight: 'bold',
    marginVertical: responsiveHeight(0.5),
  },

  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 5,
    color: '#0070BB',
  },

  chipsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },

  chip: {
    marginRight: 10,
    marginBottom: 6,
    height: responsiveHeight(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },

  Registerbutton: {
    backgroundColor: PRIMARY_COLOR,
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    marginTop: responsiveHeight(4),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: responsiveHeight(2),
    alignItems: 'center',
    marginBottom: responsiveHeight(2),
  },

  RegisterbuttonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: BACKGROUND_COLOR,
    alignItems: 'center',
    fontSize: responsiveFontSize(2.5),
  },

  animationContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(25),
    alignSelf: 'center',
    top: responsiveHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },

  header: {
    alignItems: 'flex-end',
    paddingHorizontal: responsiveHeight(2),
  },

  Continuebutton: {
    backgroundColor: PRIMARY_COLOR,
    width: responsiveWidth(37),
    height: responsiveHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: responsiveHeight(2),
    top: responsiveHeight(3),
  },

  ContinueText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    color: BACKGROUND_COLOR,
  },
});

export default UserInfo;
