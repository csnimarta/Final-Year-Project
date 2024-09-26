import {View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import React, {useState, useCallbac, useRef, useEffect} from "react";
import LottieView from "lottie-react-native";
import BottomSheet, {BottomSheetView, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  SHADOW_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from "../../constants/Colors";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import {useNavigation} from "@react-navigation/native";
import {useRoute} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import {
  BaseButton,
  GestureHandlerRootView
} from 'react-native-gesture-handler';
import CameraIcon from '../../assets/images/camera-sheet.svg';
import MediaIcon from '../../assets/images/gallery-sheet.svg';
import {Camera, CameraType} from 'expo-camera';
import UserCnicContext from '../../context/UserCnicProvider';
import {firebase} from "./manageCnicUpload";
import * as FileSystem from 'expo-file-system';
import {useToast} from "react-native-toast-notifications";



const UserCnic = () => {

  const [permission, requestPermission] = Camera.useCameraPermissions();
  const {userCnic, setUserCnic} = React.useContext(UserCnicContext);
  const sheetRef = useRef(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const snapPoints = ["25%"];
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigation = useNavigation();
  const route = useRoute();
  const [signUpData, setSignUpData] = useState(route.params.signUpData);


  const navigateToUserInfo = async () => {
    setIsLoading(true);

    const {uri} = await FileSystem.getInfoAsync(imageUrl);
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
    const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const ref = firebase.storage().ref().child(filename);
    await ref.put(blob);
    if (ref._delegate._location.path_) {
      setIsLoading(false);
      navigation.navigate('UserInfo', {
        signUpData: {
          gender: signUpData.gender,
          email_address: signUpData.email_address,
          full_name: signUpData.full_name,
          password: signUpData.password,
          phone_number: signUpData.phone_number,
          userType: signUpData.userType,
          age: signUpData.age,
          preferences: signUpData.preferences,
          area: signUpData.area,
          cnic_image: ref._delegate._location.path_,
        },
      });
    } else {
      toast.show("Something went wrong.", {
        type: 'warning'
      });
    }
  };

  const [imageUrl, setImageUrl] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (userCnic && userCnic != "") {
      setImageUrl(userCnic);
      setIsImageSelected(true);
    }
  }, [userCnic]);


  const openImageLibrary = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);
    console.log('result: ', result.assets);
    setImageUrl(result.assets[0].uri);
    // setUserCnic
    setIsImageSelected(true);
    setIsSheetOpen(false);
  };



  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
          }}
        >
          <View style={{
            backgroundColor: isSheetOpen ? 'gray' : "#fff",
          }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require("../../assets/images/arrow-back.png")}
                style={{
                  width: responsiveWidth(8),
                  height: responsiveHeight(2),
                  tintColor: PRIMARY_COLOR,
                  top: responsiveHeight(2),
                  marginLeft: responsiveHeight(3),
                }}
              />
            </TouchableOpacity>

            <Text style={styles.CnicText}>Verify Your CNIC</Text>
            <Text style={styles.CnicText2}>Upload your Nadra verified CNIC</Text>

            {isImageSelected ? (
              <TouchableOpacity onPress={() => {
                setIsSheetOpen(true);
              }}>
                <View style={styles.imageContainer}>
                  <Image
                    style={{
                      width: "100%",
                      height: "125%",
                      borderRadius: 10,
                    }}
                    source={{
                      uri: `${ imageUrl }`,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.animationContainer}
                onPress={() => {
                  setIsSheetOpen(true);
                }}
              >
                <LottieView
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: isSheetOpen ? 0.5 : 1,
                  }}
                  source={require("../../assets/animations/user-verification.json")}
                  autoPlay
                  onAnimationFinish={() => {
                    console.log("finished");
                  }}
                  loop={false}
                />

                {errorMessage ? (
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.buttonContainer, {
                backgroundColor: isImageSelected ? PRIMARY_COLOR : SECONDARY_COLOR,
              }]}
              onPress={() => {
                if (!isImageSelected) {
                  setErrorMessage("Please select an Cnic image");
                } else {
                  navigateToUserInfo();
                }
              }}
            >
              <Text style={styles.UploadButtonText}>Upload CNIC</Text>
            </TouchableOpacity>
          </View>

          {
            isSheetOpen ? <BottomSheet
              ref={sheetRef}
              snapPoints={snapPoints}
              enablePanDownToClose={true}
              onClose={() => {setIsSheetOpen(false);}}
            >
              <BottomSheetView>

                <View style={{flexDirection: "row"}}>
                  {/* Camera Open Button */}
                  <View style={{width: responsiveWidth(50), }}>
                    <TouchableOpacity onPress={() => {
                      requestPermission();
                      navigation.navigate("UserCnicCamera");
                      setIsSheetOpen(false);
                      console.log("Camera");
                    }}>
                      <CameraIcon height={responsiveHeight(15)} width={responsiveWidth(50)} />
                      <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2)}}>Open Camera</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Gallery Open Button */}
                  <View style={{width: responsiveWidth(50), }}>
                    <TouchableOpacity onPress={() => {
                      openImageLibrary();
                    }} >
                      <MediaIcon height={responsiveHeight(15)} width={responsiveWidth(50)} />
                      <Text style={{textAlign: 'center', fontSize: responsiveFontSize(2)}}>
                        Open Gallery
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </BottomSheetView>
            </BottomSheet> : null
          }

          {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              size="large" color={BACKGROUND_COLOR}
            />
          </View> : <></>}

        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default UserCnic;

const styles = StyleSheet.create({
  CnicText: {
    fontWeight: "bold",
    textAlign: "center",
    color: TEXT_COLOR,
    fontSize: responsiveFontSize(3.25),
    top: responsiveHeight(7),
  },

  CnicText2: {
    fontSize: responsiveFontSize(2),
    color: SHADOW_COLOR,
    alignSelf: "center",
    justifyContent: "center",
    top: responsiveHeight(8),
  },

  imageContainer: {
    width: responsiveWidth(80),
    height: responsiveHeight(40),
    alignSelf: "center",
    top: responsiveHeight(20),
    borderRadius: 10,
  },
  animationContainer: {
    // backgroundColor: 'red',
    width: responsiveWidth(80),
    height: responsiveHeight(40),
    alignSelf: "center",
    top: responsiveHeight(20),
  },
  buttonContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: responsiveHeight(39),
    borderRadius: responsiveHeight(2),
  },
  UploadButtonText: {
    fontWeight: "bold",
    fontSize: responsiveFontSize(2.5),
    alignSelf: "center",
    color: BACKGROUND_COLOR,
  },
  errorMessage: {
    fontSize: responsiveFontSize(2),
    color: "red",
    alignSelf: "center",
    alignItems: "center",
  },
});
