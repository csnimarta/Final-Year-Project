import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  PRIMARY_COLOR,
  TEXT_COLOR,
  SECONDARY_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';
import LottieView from 'lottie-react-native';
import {PROVIDER_DEFAULT} from 'react-native-maps';
import {useRoute} from '@react-navigation/native';

const ServiceListing = () => {
  const route = useRoute();
  const title = route.params.screenTitle;

  // const title = "vineeta"

  console.log('hello', route.params);
  const navigation = useNavigation();

  const navigateToProfileScreen = () => {
    navigation.navigate('ProfileScreen');
  };

  const navigateToMakebooking = () => {
    navigation.navigate('Makebooking');
  };

  const navigateToProviderProfile = () => {
    navigation.navigate('ProviderProfile');
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
          //backgroundColor: 'red',
          height: responsiveHeight(20),
        }}>
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

        <TouchableOpacity
          onPress={() => {
            navigateToProfileScreen();
          }}>
          <Image
            source={require('../../assets/images/vineeta.jpg')}
            style={{
              width: '20%',
              height: '30%',
              alignSelf: 'center',
              marginLeft: '82%',
              top: responsiveHeight(2),
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: responsiveWidth(95),
          height: responsiveHeight(8),
          top: responsiveHeight(-6),
        }}>
        <Text style={styles.Text}>{title}</Text>
      </View>

      <View style={styles.scrollviewContainer}>
        <ScrollView
          style={{
            height: '100%',
            width: '100%',
          }}>
          <View style={styles.scrollContainer}>
            <View style={styles.Container}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/vineeta.jpg')}
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(12),
                    top: responsiveHeight(4),
                    flexDirection: 'row',
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: responsiveWidth(65),
                  height: responsiveHeight(30),
                  justifyContent: 'space-evenly',
                }}
                onPress={() => {
                  navigateToMakebooking();
                }}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Name : </Text>Payal
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Gender : </Text>Female
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Age : </Text>22
                  </Text>
                  <Text style={styles.detailsText}>
                    {' '}
                    <Text style={styles.boldText}>Phone number : </Text>
                    1234567890
                  </Text>
                </View>

                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Service type : </Text>Cook
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Area : </Text>Shara-e-Faisal
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Amount :</Text> 10$
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Working days : </Text>Mon-Sat
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.scrollContainer}>
            <View style={styles.Container}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/12.jpg')}
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(12),
                    top: responsiveHeight(4),
                    flexDirection: 'row',
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: responsiveWidth(65),
                  height: responsiveHeight(30),
                  justifyContent: 'space-evenly',
                }}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Name : </Text>Ramu Kaka
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Gender : </Text>Male
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Age : </Text>25
                  </Text>
                  <Text style={styles.detailsText}>
                    {' '}
                    <Text style={styles.boldText}>Phone number : </Text>
                    1234567890
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Service type : </Text>Cook
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Area : </Text>Teen Talwar
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Amount :</Text> 15$
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Working days : </Text>Mon-Sun
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.scrollContainer}>
            <View style={styles.Container}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/vineeta.jpg')}
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(12),
                    top: responsiveHeight(4),
                    flexDirection: 'row',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  // backgroundColor: 'green',
                  alignSelf: 'center',
                  flexDirection: 'column',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  width: responsiveWidth(65),
                  height: responsiveHeight(30),
                  justifyContent: 'space-evenly',
                }}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Name : </Text>Payal
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Gender : </Text>Female
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Age : </Text>22
                  </Text>
                  <Text style={styles.detailsText}>
                    {' '}
                    <Text style={styles.boldText}>Phone number : </Text>
                    1234567890
                  </Text>
                </View>

                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Service type : </Text>Cook
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Area : </Text>Shara-e-Faisal
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Amount :</Text> 10$
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Working days : </Text>Mon-Sat
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.scrollContainer}>
            <View style={styles.Container}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/12.jpg')}
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(12),
                    top: responsiveHeight(4),
                    // marginLeft: responsiveHeight(2),
                    flexDirection: 'row',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: responsiveWidth(65),
                  height: responsiveHeight(30),
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Name : </Text>Ramu Kaka
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Gender : </Text>Male
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Age : </Text>25
                  </Text>
                  <Text style={styles.detailsText}>
                    {' '}
                    <Text style={styles.boldText}>Phone number : </Text>
                    1234567890
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Service type : </Text>Cook
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Area : </Text>Teen Talwar
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Amount :</Text> 15$
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Working days : </Text>Mon-Sun
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.scrollContainer}>
            <View style={styles.Container}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/vineeta.jpg')}
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(12),
                    top: responsiveHeight(4),
                    flexDirection: 'row',
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: responsiveWidth(65),
                  height: responsiveHeight(30),
                  justifyContent: 'space-evenly',
                }}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Name : </Text>Payal
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Gender : </Text>Female
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Age : </Text>22
                  </Text>
                  <Text style={styles.detailsText}>
                    {' '}
                    <Text style={styles.boldText}>Phone number : </Text>
                    1234567890
                  </Text>
                </View>

                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Service type : </Text>Cook
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Area : </Text>Shara-e-Faisal
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Amount :</Text> 10$
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Working days : </Text>Mon-Sat
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.scrollContainer}>
            <View style={styles.Container}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/12.jpg')}
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(12),
                    top: responsiveHeight(4),
                    // marginLeft: responsiveHeight(2),
                    flexDirection: 'row',
                  }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: responsiveWidth(65),
                  height: responsiveHeight(30),
                  justifyContent: 'space-evenly',
                }}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Name : </Text>Ramu Kaka
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Gender : </Text>Male
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Age : </Text>25
                  </Text>
                  <Text style={styles.detailsText}>
                    {' '}
                    <Text style={styles.boldText}>Phone number : </Text>
                    1234567890
                  </Text>
                </View>
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Service type : </Text>Cook
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Area : </Text>Teen Talwar
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Amount :</Text> 15$
                  </Text>

                  <Text style={styles.detailsText}>
                    <Text style={styles.boldText}>Working days : </Text>Mon-Sun
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  scrollviewContainer: {
    top: responsiveHeight(-7),
    height: responsiveHeight(80),
  },
  scrollContainer: {
    width: responsiveWidth(95),
    flex: 1,
    // backgroundColor: 'red',
    alignSelf: 'center',
    shadowColor: '#000000',
    justifyContent: 'space-evenly',

    minHeight: responsiveHeight(30),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(2),
    top: responsiveHeight(3),
    marginBottom: responsiveHeight(7),
  },
  Text: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
    top: responsiveHeight(-4),
    marginLeft: responsiveHeight(2),
    alignItems: 'center',
    alignSelf: 'center',
    // justifyContent: 'center'
  },

  Container: {
    //backgroundColor: 'red',
    height: responsiveHeight(20),
    flexDirection: 'row',
  },
  detailsContainer: {
    width: responsiveWidth(60),
    height: responsiveHeight(13),
    justifyContent: 'space-evenly',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 2.5,
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(2),
  },
  detailsText: {
    color: PRIMARY_COLOR,
    marginRight: responsiveHeight(5),
    marginLeft: responsiveHeight(2),
    fontSize: responsiveFontSize(1.7),
    //fontWeight: 'bold'
  },

  boldText: {
    fontWeight: 'bold',
  },
});

export default ServiceListing;
