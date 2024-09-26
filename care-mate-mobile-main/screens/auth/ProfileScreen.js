import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Modal,
} from 'react-native';
import {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  PRIMARY_COLOR,
  TEXT_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
  SECONDARY_COLOR,
} from '../../constants/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
// import Share from 'react-native-share';
import {MenuProvider} from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuItem,
} from 'react-native-popup-menu';

const handleOptionSelect = value => {
  console.log(`Selected option: ${value}`);
  // Perform actions based on the selected option
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'fourth item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'fifth',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

// const ImageCard = () => {
//   return (
//     <View
//       style={{
//         height: responsiveHeight(15),
//         width: responsiveWidth(32),
//         marginBottom: 12,
//         marginRight: 5,
//         alignSelf: 'center',
//       }}>
//       <Image
//         source={require('../../assets/images/housecleaner.jpeg')}
//         style={{
//           height: responsiveHeight(12),
//           width: responsiveWidth(31),
//           marginBottom: 12,
//           marginRight: 10,
//           marginLeft: 10,
//           //justifyContent: 'space-evenly',
//           // marginRight: 5,
//           alignSelf: 'center',
//           borderRadius: responsiveHeight(1.5),
//           top: responsiveHeight(2),
//         }}
//       />
//     </View>
//   );
// };

// const FirstRoute = () => (
//   <View
//     style={[
//       styles.scene,
//       {
//         padding: 5,
//         alignItems: 'center',
//         marginBottom: responsiveHeight(6),
//       },
//     ]}>
//     <FlatList
//       data={DATA}
//       renderItem={({item}) => <ImageCard />}
//       keyExtractor={item => item.id}
//       numColumns={3}
//       horizontal={false}
//     />
//   </View>
// );

// const VideoCard = () => {
//   return (
//     <View
//       style={{
//         height: responsiveHeight(17),
//         width: responsiveWidth(30),
//         marginBottom: 5,
//         //alignSelf: 'center',
//         //backgroundColor: 'red',
//         //  borderWidth: 1,
//         borderColor: PRIMARY_COLOR,
//         marginHorizontal: responsiveHeight(0.5),
//       }}>

//     </View>
//   );
// };

// const SecondRoute = () => (
//   <View
//     style={[
//       styles.scene,

//       {
//         padding: 7,
//         alignItems: 'center',
//         marginBottom: responsiveHeight(9),
//         backgroundColor: SHADOW_COLOR,
//       },
//     ]}>
//     <FlatList
//       data={DATA}
//       renderItem={({item}) => <VideoCard />}
//       keyExtractor={item => item.id}
//       numColumns={3}
//       horizontal={false}
//     />
//   </View>
// );

const ProfileScreen = () => {
  // const [IsModalVisible, setModalVisible] = useState(false);
  // const openModal = () => {
  //   setModalVisible(true);
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  // const toggleModal = () => {
  //   setModalVisible(!IsModalVisible);
  // };
  const navigation = useNavigation();
  // const navigateToSignUp = () => {
  //   navigation.navigate('SignUp');
  // };

  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  // const [index, setIndex] = useState(0);
  // const [routes] = useState([
  //   {key: 'first', title: 'Images'},
  //   {key: 'second', title: 'Videos'},
  // ]);

  // const renderScene = SceneMap({
  //   first: FirstRoute,
  //   second: SecondRoute,
  // });
  // const renderTabBar = () => (
  //   <TabBar
  //     indicatorStyle={{color: 'black'}}
  //     style={{backgroundColor: BACKGROUND_COLOR}}
  //     labelStyle={{color: TEXT_COLOR}}
  //   />
  // );
  // const handleOptionSelect = value => {
  //   console.log(`Selected option: ${value}`);
  //   // Perform actions based on the selected option
  // };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/vineeta.jpg')}
          style={{
            width: '40%',
            height: '40%',
            alignSelf: 'center',
            marginTop: responsiveHeight(1),
            marginLeft: responsiveHeight(1),
          }}
        />
        <View>
          <Text style={styles.ProfileText1}>Vineeta Chawla</Text>
          <Text style={styles.ProfileText2}>Teen Talwar | Female </Text>
        </View>
      </View>
      {/* <View
        style={{
          height: responsiveHeight(10),
          width: responsiveWidth(37),
          // backgroundColor: 'red',
          alignSelf: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          marginLeft: responsiveHeight(27),
          top: responsiveHeight(-19),
        }}>
        <MenuProvider>
          <Menu>
            <MenuTrigger>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={27}
                color={PRIMARY_COLOR}
                style={{
                  marginLeft: responsiveHeight(15),
                  top: responsiveHeight(2),
                }}
              />
            </MenuTrigger>

            <MenuOptions
              style={{
                padding: 10,
              }}>
              <ScrollView
                style={{
                  width: '100%',
                  height: '100%',
                  marginVertical: responsiveHeight(-3),
                  // minHeight: responsiveHeight(7),
                  top: responsiveHeight(4),
                }}>
                <MenuOption onSelect={() => handleOptionSelect('Option 1')}>
                  <Text
                    style={{
                      color: TEXT_COLOR,
                    }}>
                    Upload Images
                  </Text>
                </MenuOption>

                <MenuOption onSelect={() => handleOptionSelect('Option 2')}>
                  <Text
                    style={{
                      color: TEXT_COLOR,
                    }}>
                    Upload Videos
                  </Text>
                </MenuOption>
                <MenuOption onSelect={() => handleOptionSelect('Option 3')}>
                  <Text
                    style={{
                      color: TEXT_COLOR,
                    }}>
                    views
                  </Text>
                </MenuOption>
                <MenuOption onSelect={() => handleOptionSelect('Option 4')}>
                  <Text
                    style={{
                      color: TEXT_COLOR,
                    }}>
                    Add bio
                  </Text>
                </MenuOption>
              </ScrollView>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </View> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button1}
          onPress={() => {
            navigateToEditProfile();
          }}>
          <FontAwesome
            name="edit"
            size={20}
            color={BACKGROUND_COLOR}
            style={{
              marginRight: responsiveHeight(-2),
            }}
          />

          <Text style={styles.button1Text}>Edit profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            const options = {
              message:
                'Hello from CareMate it is me hina I am a cook in karachi near teen talwar',
            };

            // Share.open(options)
            //   .then(res => {
            //     console.log(res);
            //   })
            //   .catch(err => {
            //     err && console.log(err);
            //   });
          }}>
          <Ionicons
            name="person"
            size={20}
            color={PRIMARY_COLOR}
            style={{
              marginRight: responsiveHeight(-1.5),
            }}
          />

          <Text style={styles.button2Text}>Share profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollviewContainer: {
    top: responsiveHeight(4),
    height: responsiveHeight(63),
  },

  scene: {
    flex: 1,
  },
  scrollContainer: {
    width: responsiveWidth(92),
    flex: 1,
    alignSelf: 'center',
  },

  ProfileText1: {
    color: TEXT_COLOR,
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  ProfileText2: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: SHADOW_COLOR,
    alignSelf: 'center',
  },

  buttonContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
  },

  button1: {
    borderRadius: responsiveHeight(4),
    backgroundColor: PRIMARY_COLOR,
    width: responsiveWidth(35),
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button2: {
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(4),
    width: responsiveWidth(35),
    height: responsiveHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button1Text: {
    color: BACKGROUND_COLOR,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  button2Text: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
  },
  // modal: { //no usage here leave it
  //   backgroundColor: 'red',
  //   borderRadius: 35,
  //   padding: 10,
  //   height: '30%',
  //   width: '80%',
  //   position: 'absolute',
  //   marginBottom: '6%',

  //   shadowColor: '#000000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 5,
  //   },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 5.62,
  //   elevation: 7,
  //   padding: '4%',
  // },

  // modalButton1: {
  //   flex: 1,
  //   height: '100%',
  //   width: responsiveWidth(20),
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: PRIMARY_COLOR,
  //   marginHorizontal: 5,
  //   borderRadius: responsiveHeight(3),
  // },
  // modalbutton2: {
  //   flex: 1,
  //   height: '100%',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: BACKGROUND_COLOR,
  //   marginHorizontal: 5,
  //   borderRadius: responsiveHeight(3),
  //   borderWidth: 1,
  //   borderColor: PRIMARY_COLOR,
  // },
  // modalbutton1Text: {
  //   color: '#fff',
  //   fontSize: responsiveFontSize(2),
  //   fontWeight: 'bold',
  // },

  // modalbutton2Text: {
  //   color: PRIMARY_COLOR,
  //   fontSize: responsiveFontSize(2),
  //   fontWeight: 'bold',
  //   //  marginHorizontal: 9,
  // },
  // modalCloseButton: {
  //   position: 'absolute',
  //   top: 18,
  //   right: 18,
  //   width: 25,
  //   height: 30,
  // },

  // modalText: {
  //   fontSize: responsiveFontSize(2.5),
  //   marginVertical: responsiveHeight(6),
  //   marginHorizontal: 20,
  //   textAlign: 'center',
  //   color: PRIMARY_COLOR,
  //   fontWeight: 'bold',
  // },
  buttonsContainer: {
    flexDirection: 'row',
    height: responsiveHeight(6),
    width: responsiveWidth(75),
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    //backgroundColor: 'red'
  },

  imageContainer: {
    top: responsiveHeight(4),
    //backgroundColor: 'red',
    width: responsiveWidth(70),
    alignSelf: 'center',
    height: responsiveHeight(20),
  },
  // SignInButton: {
  //   backgroundColor: 'red',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderRadius: responsiveHeight(2),
  //   width: responsiveWidth(90),
  //   height: responsiveHeight(8),
  //   marginTop: responsiveHeight(-2),
  // },
});

export default ProfileScreen;
