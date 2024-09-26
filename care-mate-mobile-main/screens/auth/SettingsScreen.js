import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Animated,
  ScrollView,
  DevSettings,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrivateValueStore, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';
import React, { useState } from 'react';
import UserContext from '../../context/UserProvider';
import { SvgUri } from 'react-native-svg';
import FemaleAvatar from '../../assets/images/female_avatar.svg';
import MaleAvatar from '../../assets/images/male_avatar.svg';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const navigateToWelcome = () => {
    navigation.navigate('Splash');
  };

  const [IsModalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };
  const { user, setUser } = React.useContext(UserContext);

  const closeModal = () => {
    setModalVisible(false);
  };
  console.log(user);

  const toggleModal = () => {
    setModalVisible(!IsModalVisible);
  };

  const navigateToTermsandPrivacy = () => {
    navigation.navigate('TermsandPrivacy');
  };
  const navigateToPersonalInfo = () => {
    navigation.navigate('EditProfile');
  };
  const navigateToNotificationSettings = () => {
    navigation.navigate('NotificationSettings');
  };

  const navigatetoForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const navigateToProviderHomeScreen = () => {
    navigation.navigate('ProviderHomeScreen');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          backgroundColor: PRIMARY_COLOR,
          width: responsiveWidth(100),
          height: responsiveHeight(35),
          alignSelf: 'center',
          justifyContent: 'center',
          marginBottom: responsiveHeight(5),
        }}
      >
        <Text style={styles.settingText}>Settings</Text>

        <View
          style={{
            paddingTop: responsiveHeight(3),
          }}
        >
          {user?.data?.gender === 'MALE' ? (
            <MaleAvatar
              style={{
                alignSelf: 'center',
                marginVertical: responsiveHeight(1.5),
              }}
              height={responsiveHeight(15)}
              width={responsiveHeight(15)}
            />
          ) : (
            <FemaleAvatar
              style={{
                alignSelf: 'center',
                marginVertical: responsiveHeight(1.5),
              }}
              height={responsiveHeight(15)}
              width={responsiveHeight(15)}
            />
          )}

          <Text style={styles.ProfileText}>
            Hello, {user.data ? user.data.full_name : ''}
          </Text>
          <Text style={styles.ProfileText2}>
            {user.data ? user.data.email_address : ''}
          </Text>
        </View>
      </View>

      <View style={styles.scrollviewContainer}>
        <ScrollView
          alwaysBounceVertical={true}
          contentContainerStyle={{
            paddingVertical: 15,
          }}
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          <View style={styles.scrollContainer}>
            <TouchableOpacity
              onPress={() => {
                navigateToPersonalInfo();
              }}
              style={styles.itemLine}
            >
              <MaterialCommunityIcons
                name="account-eye-outline"
                color={PRIMARY_COLOR}
                size={25}
                style={{
                  flex: 1,
                }}
              />

              <Text style={styles.Personalinfotext}>Personal Information</Text>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={23}
                color={PRIMARY_COLOR}
                style={{}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.itemLine}
              onPress={() => {
                navigatetoForgotPassword();
              }}
            >
              <MaterialCommunityIcons
                name="lock-outline"
                color={PRIMARY_COLOR}
                size={25}
                style={{
                  flex: 1,
                }}
              />

              <Text style={styles.Personalinfotext}>Change Password</Text>

              <TouchableOpacity>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={23}
                  color={PRIMARY_COLOR}
                  style={{}}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigateToTermsandPrivacy();
              }}
              style={styles.itemLine}
            >
              <MaterialCommunityIcons
                name="shield-lock-open-outline"
                color={PRIMARY_COLOR}
                size={25}
                style={{
                  flex: 1,
                }}
              />

              <Text style={styles.Personalinfotext}>
                Terms of use and Privacy Policies
              </Text>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={23}
                color={PRIMARY_COLOR}
                style={{}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserOrderHistory');
              }}
              style={styles.itemLine}
            >
              <Ionicons
                name="receipt-outline"
                color={PRIMARY_COLOR}
                size={24}
                style={{
                  flex: 1,
                }}
              />

              <Text style={styles.Personalinfotext}>Orders</Text>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={23}
                color={PRIMARY_COLOR}
                style={{}}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('UserComplaints');
              }}
              style={styles.itemLine}
            >
              <MaterialIcons
                name="report-problem"
                color={PRIMARY_COLOR}
                size={24}
                style={{
                  flex: 1,
                }}
              />

              <Text style={styles.Personalinfotext}>Complaints</Text>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={23}
                color={PRIMARY_COLOR}
                style={{}}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={styles.itemLine}>
              <MaterialIcons
                name="logout"
                color={PRIMARY_COLOR}
                size={23}
                style={{
                  flex: 1,
                }}
              />
              <Text style={styles.Personalinfotext}>Logout</Text>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={23}
                color={PRIMARY_COLOR}
                style={{}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={IsModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() => setModalVisible(false)}
            activeOpacity={1}
          >
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* modal content here */}
              <View style={styles.modal}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons
                    name="close-sharp"
                    size={26}
                    color={PRIMARY_COLOR}
                  />
                </TouchableOpacity>
                <Text style={styles.modalText}>
                  Are you sure want to logout your account?
                </Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.modalButton1}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalbutton1Text}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalbutton2}
                    onPress={async () => {
                      await AsyncStorage.removeItem('@user');
                      setUser({});
                      if (navigation.canGoBack()) {
                        navigation.popToTop();
                      }
                      navigation.navigate('Welcome');
                    }}
                  >
                    <Text style={styles.modalbutton2Text}>Yes, logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemLine: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
  },
  scrollContainer: {
    paddingVertical: responsiveHeight(2),
    gap: responsiveHeight(1),
    width: responsiveWidth(92),
    flex: 1,
    alignSelf: 'center',
    shadowColor: '#000000',
    justifyContent: 'space-evenly',
    minHeight: responsiveHeight(13),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(2),
  },

  settingText: {
    fontSize: responsiveFontSize(3.5),
    color: BACKGROUND_COLOR,
    fontWeight: 'bold',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: responsiveWidth(100),
    paddingVertical: responsiveHeight(1),
  },

  ProfileText: {
    fontSize: responsiveFontSize(3),
    color: BACKGROUND_COLOR,
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center',
  },

  ProfileText2: {
    fontSize: responsiveFontSize(2),
    color: BACKGROUND_COLOR,
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center',
    opacity: 0.8,
  },

  Container: {
    width: responsiveWidth(90),
    height: responsiveHeight(40),
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000000',

    minHeight: responsiveHeight(20),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: '#F0F0F0',
    borderRadius: responsiveHeight(2),
  },

  Personalinfotext: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    flex: 9,
    paddingHorizontal: responsiveWidth(2),
  },
  Container2: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },

  modal: {
    backgroundColor: 'white',
    borderRadius: 35,
    paddingTop: responsiveHeight(3),
    paddingBottom: 10,
    paddingHorizontal: responsiveWidth(4),
    height: '30%',
    width: '80%',
    position: 'absolute',
    justifyContent: 'center',
    gap: responsiveHeight(1),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
    padding: '4%',
  },

  modalButton1: {
    flex: 1,
    height: '100%',
    width: responsiveWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: responsiveHeight(3),
  },
  modalbutton2: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: responsiveHeight(3),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  modalbutton1Text: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },

  modalbutton2Text: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 25,
    height: 30,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 20,
  },

  modalText: {
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(6.5),
    alignSelf: 'center',
    gap: responsiveWidth(2),
  },
});

export default SettingsScreen;
