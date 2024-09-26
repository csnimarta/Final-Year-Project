import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  BACKGROUND_COLOR,
  TEXT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {Picker} from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';
import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {baseUrl} from '../../IPConfig';
import {useRoute} from '@react-navigation/native';

const DEFAULT_POSITION = {
  latitude: 24.8607,
  longitude: 67.0011,
  latitudeDelta: 0.0043,
  longitudeDelta: 0.0034,
};

const AreaSelection = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedAreaId, setSelectedAreaId] = useState('');
  const route = useRoute();

  const [allAreas, setAllAreas] = useState([]);

  const mapRef = useRef();
  const [userRole, setUserRole] = useState(route.params.userRole);
  const [signUpData, setSignUpData] = useState(route.params.signUpData);

  const onRegionCHange = area => {


    mapRef?.current?.animateToRegion({
      latitude: area.latitude,
      longitude: area.longitude,
      // latitudeDelta: 0.1,
      // longitudeDelta: 0.1,

      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034,

      // latitudeDelta: 0.0922,
      // longitudeDelta: 0.0421,
    });
    console.log(signUpData);

  };

  const updateArea = area => {
    setSelectedArea(area);
    console.log('selected: ', selectedArea);
    setSelectedAreaId(area._id);
    onRegionCHange(area);
  };



  const navigation = useNavigation();
  const navigationToNext = () => {
    console.log('selectedArea: ', selectedArea);
    if (signUpData.userType === 'SERVICE_PROVIDER') {
      navigation.navigate('UserCnic', {
        signUpData: {
          gender: signUpData.gender,
          email_address: signUpData.email_address,
          full_name: signUpData.full_name,
          password: signUpData.password,
          phone_number: signUpData.phone_number,
          userType: signUpData.userType,
          age: signUpData.age,
          preferences: signUpData.preferences,
          area: selectedArea,
        },
      });
    } else {
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
          area: selectedArea,
        },
      });
    }
  };

  useEffect(() => {
    const getAllAreas = async () => {
      try {
        const apiResponse = await axios.get(`${ baseUrl }/area/getArea`);
        console.log('api response:', apiResponse.data);

        setAllAreas(apiResponse.data.data);
      } catch (error) {
        console.log('error: ', error);
      }
    };
    getAllAreas();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/* <MapView
                provider={PROVIDER_GOOGLE}
                style={{
                    width: "100%",
                    height: "100%"
                }}
                initialRegion={{
                    latitude: 24.8270,
                    longitude: 67.0251,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            /> */}

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

        <Text style={styles.areaText}>What's Your Area?</Text>
        <Text style={styles.subHeadingText}>
          Select Your Preferable Area Below
        </Text>

        <View style={styles.areacontainer}>
          <Picker
            mode="dropdown"
            selectedValue={selectedArea}
            onValueChange={updateArea}
            style={{
              width: responsiveWidth(85),
              height: responsiveHeight(10),
              top: responsiveHeight(0.1),
              color: TEXT_COLOR,
              alignSelf: 'center',
            }}
            dropdownIconColor={'#3465d9'}
            dropdownIconRippleColor={PRIMARY_COLOR}>
            {allAreas?.map((area, index) => {
              return (
                <Picker.Item label={area.name} value={area} key={area._id} />
              );
            })}
          </Picker>
        </View>
        <View style={styles.MapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            // showsTraffic={true}
            showsUserLocation
            // zoomControlEnabled={true}
            // minZoomLevel={18}
            scrollEnabled={false}
            maxZoomLevel={18}
            style={{
              width: '100%',
              height: '100%',
            }}
            initialRegion={{
              latitude: selectedArea?.latitude
                ? selectedArea?.latitude
                : DEFAULT_POSITION.latitude,
              longitude: selectedArea?.longitude
                ? selectedArea?.longitude
                : DEFAULT_POSITION.longitude,
              // latitude: selectedArea.latitude,
              // longitude: selectedArea.longitude,
              // latitude: 24.8270,
              // longitude: 67.0251,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={{
                latitude: selectedArea?.latitude
                  ? selectedArea?.latitude
                  : DEFAULT_POSITION.latitude,
                longitude: selectedArea?.longitude
                  ? selectedArea?.longitude
                  : DEFAULT_POSITION.longitude,
                // latitude: selectedArea.latitude,
                // longitude: selectedArea.longitude,
                // latitude: 24.8270,
                // longitude: 67.0251,
              }}
              title={selectedArea?.name}
              description={'Your selected area'}
            />
          </MapView>
        </View>

        <TouchableOpacity
          style={styles.Nextbutton}
          onPress={() => {
            navigationToNext();
          }}>
          <Text style={styles.NextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AreaSelection;

const styles = StyleSheet.create({
  areaText: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(4),
    textAlign: 'center',
    alignSelf: 'center',
    color: TEXT_COLOR,
    top: responsiveHeight(7),
  },
  subHeadingText: {
    fontSize: responsiveFontSize(2),
    alignSelf: 'center',
    textAlign: 'center',
    top: responsiveHeight(8),
    color: SHADOW_COLOR,
  },

  areacontainer: {
    // backgroundColor: 'red',
    top: responsiveHeight(15),
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: responsiveHeight(2),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },

  MapContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(30),
    alignSelf: 'center',
    top: responsiveHeight(25),
    backgroundColor: 'red',
  },
  Nextbutton: {
    // backgroundColor: 'red',
    backgroundColor: PRIMARY_COLOR,
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    alignItems: 'center',
    marginTop: responsiveHeight(39),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: responsiveHeight(2),
  },
  NextButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    alignItems: 'center',
    color: BACKGROUND_COLOR,
  },
});
