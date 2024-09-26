import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  DevSettings,
  ActivityIndicator,
  TextInput
} from 'react-native';
import {useState, useEffect, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Modal} from 'react-native';
import {baseUrl} from '../../IPConfig';
import {
  PRIMARY_COLOR,
  TEXT_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
  SECONDARY_COLOR,
} from '../../constants/Colors';
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import {useToast} from 'react-native-toast-notifications';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import {firebase} from "../UserCnicScreen/manageCnicUpload";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ProviderEditProfile = () => {

  const navigation = useNavigation();
  const {user, setUser} = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const toast = useToast();
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [areas, setAreas] = useState([]);
  const [areaValue, setAreaValue] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://cdn-icons-png.flaticon.com/512/3607/3607444.png");
  const [isImageSelected, setIsImageSelected] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${ baseUrl }/user/fetchUserById`, {
          params: {
            id: user.data.id
          }
        });
        setUserData(response.data);
        setImageUrl(response.data.profilePicture);
      } catch (error) {
        console.log("could not fetch user data: " + error);
        toast.show("Something went wrong!", {type: 'warning'});
      }
    };

    setAreaValue(user.data.area);
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${ baseUrl }/area/getArea`);
        setAreas(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
    fetchAreas();
    setIsLoading(false);

  }, [user.data]);

  if (!userData) {
    return <></>;
  }

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
      setIsLoading(false);

      toast.show(response.data.message);

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

  const handleProfileChange = () => {
    openImageLibrary();
  };

  const uploadImageToCloud = async (imageUri) => {
    setIsLoading(true);

    const {uri} = await FileSystem.getInfoAsync(imageUri);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = (e) => {
        reject(new TypeError('Network Error'));
        toast.show("Network error, please make sure your internet is working", {
          type: 'danger'
        });
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);

    });
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const ref = firebase.storage().ref().child(filename);
    await ref.put(blob);
    if (ref._delegate._location.path_) {
      let updatedUser = user;
      try {
        firebase.storage()
          .ref('/' + ref._delegate._location.path_) //name in storage in firebase console
          .getDownloadURL()
          .then(async (url) => {
            console.log(url);
            const response = await axios.patch(`${ baseUrl }/user/updateUserProfilePic`, {
              profileUrl: url
            },
              {params: {_id: user.data.id}}
            );
            updatedUser.data.profilePicture = url;

            setUser(updatedUser);
            await AsyncStorage.setItem("@user", JSON.stringify(updatedUser));
            toast.show("Profile picture updated!", {type: 'success'});
            setImageUrl(url);
            setIsLoading(false);
          })
          .catch((e) => {
            console.log('Errors while downloading => ', e);
            toast.show("Error downloading profile picture");
          });
        // firebase.storage()
        //   .ref('/' + ref._delegate._location.path_) //name in storage in firebase console
        //   .getDownloadURL()
        //   .then((url) => {
        //     setImageUrl(url);
        //   })
        //   .catch((e) => console.log('Errors while downloading => ', e));
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.show("Something went wrong.", {
        type: 'warning'
      });
    }
    setIsLoading(false);

  };

  const openImageLibrary = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);
    console.log('result: ', result.assets);
    setIsImageSelected(true);
    if (result.assets[0].uri) {
      uploadImageToCloud(result.assets[0].uri);
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={{backgroundColor: BACKGROUND_COLOR, flex: 1, }} >
      <View style={{backgroundColor: PRIMARY_COLOR, height: responsiveHeight(17.5), position: 'relative', padding: responsiveHeight(1.5), justifyContent: 'space-between'}}>

        <View style={{flexDirection: 'row', width: responsiveWidth(100)}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{flex: 1}}>
            <MaterialIcons size={responsiveHeight(3.5)} name={'arrow-back-ios-new'} color={BACKGROUND_COLOR} />
          </TouchableOpacity>
          <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: BACKGROUND_COLOR, flex: 1, fontSize: responsiveFontSize(2.5), fontWeight: 'bold', }}>
              Edit Profile
            </Text>
          </View>
        </View>

        <View style={{
          flexDirection: 'row', gap: responsiveWidth(4), alignItems: 'center',
          transform: [{translateY: responsiveHeight(4)}],
        }}>
          <TouchableOpacity
            style={{backgroundColor: PRIMARY_COLOR, borderRadius: 100, justifyContent: 'center', alignItems: 'center', height: responsiveHeight(12), width: responsiveHeight(12)}}
            onPress={handleProfileChange}>
            <Image
              style={{borderWidth: 2, borderColor: SHADOW_COLOR, borderRadius: 100, zIndex: 10}}
              height={responsiveHeight(12)}
              width={responsiveHeight(12)}
              source={{uri: imageUrl ? imageUrl : 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'}} />

          </TouchableOpacity>

          <Text style={{fontSize: responsiveFontSize(3), color: BACKGROUND_COLOR}}>{userData.full_name}</Text>
        </View>

      </View>

      <View style={{paddingHorizontal: responsiveWidth(6), paddingTop: responsiveHeight(5), paddingBottom: responsiveHeight(1), gap: responsiveHeight(2)}}>
        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Your Email Address
          </Text>
          <TextInput
            editable={false} selectTextOnFocus={false} value={userData.email_address}
            style={styles.inputBox} />
        </View>
        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Your Phone Number
          </Text>
          <TextInput
            editable={false} selectTextOnFocus={false} value={userData.phone_number}
            style={styles.inputBox} />
        </View>
        <View style={{flexDirection: 'row', gap: responsiveWidth(3)}}>
          <View style={{gap: responsiveHeight(1), flex: 1}}>
            <Text style={styles.inputLabel}>
              Your Gender
            </Text>
            <TextInput
              editable={false} selectTextOnFocus={false} value={userData.gender}
              style={styles.inputBox} />
          </View>
          <View style={{gap: responsiveHeight(1), flex: 1}}>
            <Text style={styles.inputLabel}>
              Your Age
            </Text>
            <TextInput
              editable={false} selectTextOnFocus={false} value={userData.age + ""}
              style={styles.inputBox} />
          </View>
        </View>

        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Your Area
          </Text>
          <Dropdown
            style={[styles.inputBox, isFocus && {borderColor: 'blue'}]}
            mode="modal"
            placeholderStyle={{
              color: TEXT_COLOR,
              fontSize: responsiveFontSize(1.5),
              marginLeft: responsiveHeight(1),
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
              marginRight: responsiveHeight(2),
              height: responsiveHeight(3),
            }}
            itemTextStyle={{
              color: TEXT_COLOR,
            }}
            renderLeftIcon={(focused, color, size) => (
              <Ionicons
                style={{
                  marginLeft: responsiveHeight(1),
                }}
                name={focused ? 'location' : 'location-outline'}
                color={PRIMARY_COLOR}
                size={25}
              />
            )}
          />
        </View>

        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Your Old Password
          </Text>
          <View
            style={[styles.inputBox, {flexDirection: 'row'}]}>
            <TextInput
              secureTextEntry={!showOldPassword}
              style={{flex: 1}}
              value={oldPassword}
              onChangeText={(text) => {
                setOldPassword(text);
              }} >
            </TextInput>
            <TouchableOpacity
              onPress={() => {
                setShowOldPassword(!showOldPassword);
              }}
              style={{width: responsiveWidth(10)}}>
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

        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Your New Password
          </Text>
          <View
            style={[styles.inputBox, {flexDirection: 'row'}]}>
            <TextInput
              secureTextEntry={!showNewPassword}
              style={{flex: 1}}
              value={newPassword}
              onChangeText={(text) => {
                setNewPassword(text);
              }} >
            </TextInput>
            <TouchableOpacity
              onPress={() => {
                setShowNewPassword(!showNewPassword);
              }}
              style={{width: responsiveWidth(10)}}>
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

        <TouchableOpacity
          onPress={updateProfile}
          style={styles.button}>
          <Text style={styles.buttonText}>
            Update
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large" color={BACKGROUND_COLOR}
        />
      </View> : <></>}
    </ScrollView >
  );
};

export default ProviderEditProfile;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#F0F0F0',
    height: responsiveHeight(6),
    fontSize: responsiveFontSize(2),
    color: 'gray',
    padding: responsiveWidth(3),
    borderRadius: 4,
    position: 'relative',
  },
  inputLabel: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    height: responsiveHeight(6),
    padding: responsiveWidth(3),
    borderRadius: 4,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: responsiveFontSize(2),
    color: BACKGROUND_COLOR,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});