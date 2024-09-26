import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
} from '../../constants/Colors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { baseUrl } from '../../IPConfig';
import moment from 'moment';

const SearchScreen = ({ route }) => {
  const navigation = useNavigation();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      Alert.alert('Search Query is empty', 'Please enter a search query');
      return;
    }
    let tempServiceProvider = [];
    const formattedQuery = searchQuery.trim().toLowerCase();
    allServiceProviders.forEach((item) => {
      if (item.title.toLowerCase() === formattedQuery) {
        const date = moment(item.bannedTill, 'DD-MMM-YYYY');
        if (moment().diff(date, 'hours') > 0) {
          tempServiceProvider.push(item);
        }
      } else if (item.providerName.toLowerCase().includes(formattedQuery)) {
        const date = moment(item.bannedTill, 'DD-MMM-YYYY');
        if (moment().diff(date, 'hours') > 0) {
          tempServiceProvider.push(item);
        }
      }
    });
    if (tempServiceProvider.length > 0) {
      setServiceProviders(tempServiceProvider);
    } else {
      toast.show(`Cannot find services with "${formattedQuery}" query`, {
        duration: 1500,
      });
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const [serviceProviders, setServiceProviders] = useState([]);
  const [allServiceProviders, setAllServiceProviders] = useState([]);

  React.useEffect(() => {
    if (route.params) {
      setServiceProviders(route.params.serviceProviders);
    }
    const fetchAllServiceProviders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${baseUrl}/service/getServicesWithProviders`,
        );
        setAllServiceProviders(response.data);
      } catch (error) {
        toast.show('Something went wrong', { type: 'warning' });
      }
      setIsLoading(false);
    };
    fetchAllServiceProviders();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchbardesign}>
          <TextInput
            placeholder="Search Services e.g., Maid, Cook, etc)"
            placeholderTextColor={TEXT_COLOR}
            cursorColor={PRIMARY_COLOR}
            style={[
              {
                color: searchQuery ? TEXT_COLOR : '#F5F5F5',
                flex: 1,
                fontSize: searchQuery
                  ? responsiveFontSize(2)
                  : responsiveFontSize(1.75),
              },
            ]}
            autoCapitalize="none"
            autoCorrect={false}
            value={searchQuery}
            onChangeText={(query) => setSearchQuery(query)}
          />
          <TouchableOpacity onPress={handleClear} style={{ padding: 2 }}>
            <Ionicons color={PRIMARY_COLOR} size={20} name="close-outline" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={serviceProviders}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProviderProfileScreen', {
                serviceProvider: item,
              });
            }}
            style={styles.serviceItem}
          >
            <View
              style={{
                width: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{
                  borderRadius: 100,
                }}
                height={responsiveHeight(10)}
                width={responsiveHeight(10)}
                source={{
                  uri: item.profilePicture
                    ? item.profilePicture
                    : 'https://cdn-icons-png.freepik.com/512/3607/3607444.png',
                }}
              />
            </View>
            <Text
              style={[
                styles.text,
                {
                  width: '50%',
                  fontSize: responsiveFontSize(3),
                  fontWeight: 'bold',
                },
              ]}
            >
              {item.providerName ? item.providerName : ''}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  width: '33%',
                  textAlign: 'center',
                  paddingVertical: responsiveHeight(1),
                },
              ]}
            >
              Type: {item.title ? item.title : ''}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  width: '33%',
                  textAlign: 'center',
                  paddingVertical: responsiveHeight(1),
                },
              ]}
            >
              Budget: {item.budget ? item.budget + '' : ''}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  width: '33%',
                  textAlign: 'center',
                  paddingVertical: responsiveHeight(1),
                },
              ]}
            >
              Age: {item.age ? item.age + '' : ''}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
      {/* <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity> */}

      {isLoading ? (
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={BACKGROUND_COLOR} />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(3),
  },
  searchbardesign: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    width: responsiveWidth(75),
    alignSelf: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 7,
    backgroundColor: '#F5F5F5',
    padding: responsiveHeight(1),
  },
  serviceItem: {
    padding: responsiveHeight(2),
    flexWrap: 'wrap',
    minHeight: responsiveHeight(8),
    width: responsiveWidth(90),
    marginVertical: responsiveHeight(3),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: responsiveHeight(1),
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 7,
    backgroundColor: BACKGROUND_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  searchButton: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: responsiveWidth(15),
    alignSelf: 'center',
    paddingVertical: responsiveHeight(1),
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  notext: {
    fontSize: responsiveFontSize(1.5),
    color: 'red',
    alignSelf: 'center',
  },
  text: {
    fontSize: responsiveFontSize(1.5),
    color: PRIMARY_COLOR,
  },
});

export default SearchScreen;
