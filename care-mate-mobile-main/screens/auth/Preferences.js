import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {
  BACKGROUND_COLOR,
  SHADOW_COLOR,
  TEXT_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
} from '../../constants/Colors';

import {useNavigation} from '@react-navigation/native';
import {Chip} from 'react-native-paper';
import {useState, useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';

export default function Preferences() {
  const navigation = useNavigation();
  const route = useRoute();

  const [signUpData, setSignUpData] = useState(route.params.signUpData);


  const navigateToAreaSelection = () => {
    navigation.navigate('AreaSelection', {
      signUpData: {
        gender: signUpData.gender,
        email_address: signUpData.email_address,
        full_name: signUpData.full_name,
        password: signUpData.password,
        phone_number: signUpData.phone_number,
        userType: signUpData.userType,
        age: signUpData.age,
        preferences: allPreferences,
      },
    });
  };

  const [allPreferences, setAllPreferences] = useState([]);

  const getAllInterests = async () => {
    try {
      const apiResponse = await axios
        .get(`${ baseUrl }/interest/getAllInterests`)
        .then(response => {
          console.log('response.data: ', response.data);
          setAllPreferences(response.data);
        })
        .catch(onError => {
          console.log('on error: ', onError);
        });
    } catch (error) {
      console.log('error in getting all interests: ', error);
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleChipSelection = itemId => {
    const isSelected = selectedItems.includes(itemId);
    if (isSelected) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      if (selectedItems.length < 3) {
        setSelectedItems([...selectedItems, itemId]);
      } else {
        // Handle maximum selection limit (in this case, 3)
        console.log('Maximum selection limit reached');
      }
    }
  };

  const renderItem = ({item}) => {
    return (
      <Chip
        icon={selectedItems.includes(item.id) ? null : item.iconName}
        style={style.chip}
        key={item.id}
        onPress={() => handleChipPress(item)}>
        {item.title}
      </Chip>
    );
  };

  useEffect(() => {
    console.log('route data preferences: ', route.params);
    getAllInterests();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffff',
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

        <Text style={style.Text}>Select up to 3 interests</Text>
        <Text style={style.subText}>
          Personalize Your Experience By Choosing Your Interests
        </Text>

        <View style={style.chipsContainer}>
          {allPreferences.map(item => {
            return (
              <Chip
                style={style.chip}
                key={item._id}
                selected={selectedItems.includes(item._id) ? true : false}
                onPress={() => toggleChipSelection(item._id)}>
                {item.name}
              </Chip>
            );
          })}
        </View>

        <TouchableOpacity
          style={style.Nextbutton}
          onPress={() => {
            navigateToAreaSelection();
          }}>
          <Text style={style.NextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  Text: {
    fontSize: responsiveFontSize(4),
    fontWeight: 'bold',
    alignSelf: 'center',
    alignItems: 'center',
    color: TEXT_COLOR,
    top: responsiveHeight(7),
    width: responsiveWidth(90),
    textAlign: 'center',
  },
  subText: {
    fontSize: responsiveFontSize(2),
    color: SHADOW_COLOR,
    alignSelf: 'center',
    width: responsiveWidth(80),
    textAlign: 'center',
    top: responsiveHeight(8),
  },

  chipsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    top: responsiveHeight(15),
    alignSelf: 'center',
    width: responsiveWidth(93),
    // backgroundColor: 'red',
    height: responsiveHeight(50),
  },
  chip: {
    margin: 7,
    height: responsiveHeight(4.5),
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: PRIMARY_COLOR,
    fontWeight: 'bold',
  },

  Nextbutton: {
    backgroundColor: PRIMARY_COLOR,
    width: responsiveWidth(90),
    height: responsiveHeight(8),
    alignItems: 'center',
    marginTop: responsiveHeight(25),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: responsiveHeight(2),
  },
  NextButtonText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: BACKGROUND_COLOR,
    alignItems: 'center',
    fontSize: responsiveFontSize(2.5),
  },
});
