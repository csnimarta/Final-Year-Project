import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  PrivateValueStore,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  PRIMARY_COLOR,
  TEXT_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
  SECONDARY_COLOR,
} from '../../constants/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useToast} from 'react-native-toast-notifications';


const gender = [
  {label: 'Female', value: 'female'},
  {label: 'Male', value: 'male'},
];

const EditProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoChanged, setIsInfoChanged] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const toast = useToast();
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  };

  const {user, setUser} = React.useContext(UserContext);
  const [selectedArea, setSelectedArea] = useState(null);
  const navigation = useNavigation();
  const [error, setError] = useState('');
  const [areas, setAreas] = useState([]);
  const [areaValue, setAreaValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [genderisFocus, setgenderIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});

  React.useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${ baseUrl }/user/fetchUserById`, {
          params: {
            id: user.data.id
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.log("could not fetch user data: " + error);
        toast.show("Something went wrong!", {type: 'warning'});
      }
    };
    setAreaValue(user.data.area);
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${ baseUrl }/area/getArea`);
        // setAreas(response.data);
        setAreas(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAreas();
    fetchUserData();

    setIsLoading(false);

  }, [user.data.area]);

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const updateProfile = async () => {

    if (oldPassword && newPassword) {
      updatePassword();
    }


    if (areaValue !== user.data.area) {
      updateArea();
    }
  };

  const updatePassword = async () => {
    setIsLoading(true);
    if (!passwordRegex.test(newPassword)) {
      console.log(
        'Password is invalid. It must contain at least 8 characters, one letter, one number, and one special character.',
      );
      toast.show("Password must contain at least 8 characters, one letter, one number, and one special character");
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.patch(`${ baseUrl }/user/updateUserPassword`,
        {
          newPassword,
          oldPassword
        },
        {
          params: {
            _id: userData._id
          }
        }
      );
      if (response.status === 201) {
        setNewPassword('');
        setOldPassword('');
      }

      setIsLoading(false);
      toast.show(response.data.message, {type: response.status === 201 ? 'success' : ''});

    } catch (error) {
      console.log("Could not update password: " + error);
      toast.show("Something went wrong!", {type: 'warning'});
      setIsLoading(false);
    }
  };

  const updateArea = async () => {
    setIsLoading(true);
    let updatedUser = user;
    updatedUser.data.area = areaValue;
    try {
      const response = await axios.patch(`${ baseUrl }/user/updateUserLocation`, {
        area: areaValue
      },
        {params: {_id: user.data.id}}
      );
      setUser(updatedUser);
      await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
      toast.show("Area updated!", {type: 'success'});
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={{backgroundColor: PRIMARY_COLOR, height: responsiveHeight(17.5), position: 'relative', padding: responsiveHeight(1.5), justifyContent: 'space-between'}}>

        <View style={{flexDirection: 'row', width: responsiveWidth(100)}}>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }} style={{flex: 1}}>
            <MaterialIcons size={responsiveHeight(3.5)} name={'arrow-back-ios-new'} color={BACKGROUND_COLOR} />
          </TouchableOpacity>
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: BACKGROUND_COLOR, flex: 1, fontSize: responsiveFontSize(2.5), fontWeight: 'bold', }}>
              Edit Profile
            </Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', gap: responsiveWidth(4), alignItems: 'center', justifyContent: 'center'
        }}>

          <Text style={{
            fontSize: responsiveFontSize(3), color: BACKGROUND_COLOR,
            textTransform: 'capitalize'
          }}>
            {user.data ? user.data.full_name : ''}
          </Text>
        </View>

      </View>
      <ScrollView style={styles.scrollviewContainer}>
        <View
          style={{
            height: '100%',
            width: '100%',
          }}>
          <View style={styles.scrollContainer}>

            <View style={styles.inputFieldStyle}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                placeholder={user.data.email_address ? user.data.email_address : 'johndoe@email.com'}
                placeholderTextColor={TEXT_COLOR}
                keyboardType="email-address"
                style={styles.emailInput}
                editable={false} selectTextOnFocus={false}
              />
              <Text
                style={{
                  color: 'red',
                  fontSize: responsiveFontSize(1.5),
                }}>
                {validationMessage}
              </Text>
            </View>

            <View style={styles.inputFieldStyle}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                placeholder={user.data.phone_number ? user.data.phone_number : ''}
                placeholderTextColor={TEXT_COLOR}
                style={styles.nameInput}
                editable={false} selectTextOnFocus={false}
              />
            </View>

            <View style={{flexDirection: 'row', gap: responsiveWidth(2.5)}}>

              <View style={[styles.inputFieldStyle, {flex: 1}]}>
                <Text style={styles.inputLabel}>Gender</Text>
                <TextInput
                  placeholder={userData.gender ? userData.gender : ''}
                  placeholderTextColor={TEXT_COLOR}
                  style={styles.nameInput}
                  editable={false} selectTextOnFocus={false}
                />
              </View>
              <View style={[styles.inputFieldStyle, {flex: 1}]}>
                <Text style={styles.inputLabel}>Age</Text>
                <TextInput
                  placeholder={userData.age ? userData.age + "" : ''}
                  placeholderTextColor={TEXT_COLOR}
                  style={styles.nameInput}
                  editable={false} selectTextOnFocus={false}
                />
              </View>
            </View>

            <View style={styles.container}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                mode="modal"
                placeholderStyle={{
                  color: TEXT_COLOR,
                  fontSize: responsiveFontSize(1.5),
                }}
                selectedTextStyle={{
                  color: PRIMARY_COLOR,
                  fontSize: responsiveFontSize(1.5),
                }}
                inputSearchStyle={{
                  color: TEXT_COLOR,
                }}
                data={areas}
                search
                maxHeight={250}
                labelField="name"
                valueField="_id"
                placeholder={!isFocus ? 'Select your area' : 'select below'}
                searchPlaceholder="Search..."
                value={areaValue}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setAreaValue(item._id);
                  setIsFocus(false);
                }}
                iconColor={PRIMARY_COLOR}
                iconStyle={{
                  height: responsiveHeight(3),
                }}
                itemTextStyle={{
                  color: TEXT_COLOR,
                }}
                renderLeftIcon={(focused, color, size) => (
                  <Ionicons
                    style={{
                    }}
                    name={focused ? 'location' : 'location-outline'}
                    color={PRIMARY_COLOR}
                    size={25}
                  />
                )}
              />
            </View>


            <View style={styles.inputFieldStyle}>
              <Text style={styles.inputLabel}>Old Password</Text>
              <View style={[styles.nameInput, {flexDirection: 'row'}]}>
                <TextInput
                  style={{flex: 1}}
                  secureTextEntry={!showOldPassword}
                  value={oldPassword}
                  onChangeText={(text) => {
                    setOldPassword(text);
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowOldPassword(!showOldPassword);
                  }}
                  style={{width: responsiveWidth(7.5)}}>
                  {showOldPassword ?
                    <Ionicons name={'eye-off-outline'}
                      size={responsiveHeight(3)}
                    /> : <Ionicons name={'eye-outline'}
                      size={responsiveHeight(3)}
                    />
                  }
                </TouchableOpacity>
              </View>

            </View>

            <View style={styles.inputFieldStyle}>
              <Text style={styles.inputLabel}>New Password</Text>
              <View style={[styles.nameInput, {flexDirection: 'row'}]}>
                <TextInput
                  value={newPassword}
                  onChangeText={(text) => {
                    setNewPassword(text);
                  }}
                  style={{flex: 1}}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowNewPassword(!showNewPassword);
                  }}
                  style={{width: responsiveWidth(7.5)}}>
                  {showNewPassword ?
                    <Ionicons name={'eye-off-outline'}
                      size={responsiveHeight(3)}
                    /> : <Ionicons name={'eye-outline'}
                      size={responsiveHeight(3)}
                    />
                  }
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      <View
        style={{justifyContent: 'center', alignSelf: 'center', paddingBottom: responsiveHeight(2.5)}}>
        <TouchableOpacity style={[styles.button,]} onPress={() => {updateProfile();}}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Changes Saved!</Text>
            <TouchableOpacity onPress={toggleModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large" color={BACKGROUND_COLOR}
        />
      </View> : <></>}
    </View >
  );
};
const styles = StyleSheet.create({
  button: {
    width: responsiveWidth(70),
    height: responsiveHeight(8),
    backgroundColor: PRIMARY_COLOR,
    alignSelf: 'center',
    borderRadius: responsiveHeight(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: BACKGROUND_COLOR,
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  inputFieldStyle: {
    width: '100%',
    height: responsiveHeight(8),
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  inputLabel: {
    color: SECONDARY_COLOR,
    fontSize: responsiveFontSize(1.5),
  },
  SignUpContentContainer: {
    width: responsiveWidth(95),
    height: responsiveHeight(70),
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  nameInput: {
    color: TEXT_COLOR,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
  },
  emailInput: {
    color: TEXT_COLOR,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(5),
    marginVertical: responsiveHeight(5),
    width: responsiveWidth(90),
    flex: 1,
    alignSelf: 'center',
    shadowColor: '#000000',
    justifyContent: 'space-evenly',
    minHeight: responsiveHeight(59),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(2),
    gap: responsiveHeight(1),
  },
  areacontainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(8),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: responsiveHeight(1),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    flexDirection: 'row',
  },
  dropdown: {
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    borderRadius: responsiveHeight(1),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    alignSelf: 'center',
  },
  dropdown2: {
    height: responsiveHeight(8),
    width: responsiveWidth(80),
    borderRadius: responsiveHeight(1),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: responsiveWidth(60),
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    color: PRIMARY_COLOR,
  },
  modalButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: responsiveHeight(5),
  },
  modalButtonText: {
    color: BACKGROUND_COLOR,
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
  },
});

export default EditProfile;
