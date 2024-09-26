import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  TEXT_COLOR,
} from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import UserList from '../UserList';
import { baseUrl } from '../../IPConfig';
import axios from 'axios';
import { useToast } from 'react-native-toast-notifications';

const AdminHomescreen = () => {
  const navigation = useNavigation();
  const toast = useToast();

  const navigateToHistory = () => {
    navigation.navigate('AdminHistory');
  };

  const navigateToAdminComplaint = () => {
    navigation.navigate('AdminComplaint');
  };

  const navigateToUserRequest = () => {
    navigation.navigate('UserRequest');
  };
  const [showAllUsers, setShowAllUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/complaint/all`);
        setComplaints(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.show('Could not fetch complaints at the moment', {
          type: 'warning',
        });
        console.log('Could not fetch data: ' + error);
        setIsLoading(false);
      }
    };
    fetchComplaints();
    axios
      .get(`${baseUrl}/user/service-providers`)
      .then((response) => {
        const filteredData = response.data.filter(
          (item) => item.isActive !== true,
        );
        setUserData(filteredData);
        console.log(userData);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.response.data.status == 401) {
          toast.show('Failed', error.response.data.message);
        }
        setIsLoading(false);
        toast.show('Something went wrong, please try again.', {
          type: 'danger',
        });
        console.log('Error:', error.response.data.message);
      });
    fetchComplaints();
  }, []);

  const getCountText = (count) => {
    if (count === 1) {
      return `${count}`;
    } else if (count <= 5) {
      return `${count}`;
    } else if (count > 5) {
      return `5+`;
    } else if (count > 10) {
      return `10+`;
    } else if (count > 25) {
      return `25+`;
    } else if (count > 50) {
      return `50+`;
    } else {
      return '0';
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        // flexDirection: 'row'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={styles.textdesign}>Dashboard</Text>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.popToTop();
            }
            navigation.navigate('Welcome');
          }}
        >
          <MaterialIcons
            style={{
              marginLeft: responsiveWidth(30),
              paddingVertical: responsiveHeight(3),
              paddingHorizontal: responsiveHeight(1),
            }}
            name="logout"
            color={PRIMARY_COLOR}
            size={28}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headertext}>Overview</Text>

          <TouchableOpacity
            onPress={() => {
              navigateToUserRequest();
            }}
          >
            <View style={styles.smallContainer}>
              <MaterialIcons
                name="supervised-user-circle"
                size={24}
                color={PRIMARY_COLOR}
              />

              <Text style={styles.userrequestdesign}>User Requests</Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: TEXT_COLOR,
                  fontWeight: 'bold',
                }}
              >
                {getCountText(userData.length)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToAdminComplaint}>
            <View style={styles.smallContainer}>
              <MaterialIcons
                name="feedback"
                size={27}
                color={PRIMARY_COLOR}
                style={{
                  alignSelf: 'center',
                }}
              />

              <Text style={styles.userrequestdesign}>Complaints</Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  color: TEXT_COLOR,
                  fontWeight: 'bold',
                }}
              >
                {getCountText(complaints.length)}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToHistory}>
            <View style={styles.smallContainer}>
              <TouchableOpacity>
                <MaterialIcons
                  name="history"
                  size={30}
                  color={PRIMARY_COLOR}
                  style={{
                    alignSelf: 'center',
                  }}
                />

                <Text style={styles.userrequestdesign}>History</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewallcontainer}>
          <TouchableOpacity
            onPress={() => {
              navigateToUserRequest();
            }}
          >
            <Text style={styles.viewtext}>
              {showAllUsers ? 'View less' : 'View all'}
            </Text>
          </TouchableOpacity>
        </View>
        {userData.slice(0, 3).map((user) => (
          <UserList
            key={user._id}
            name={user.full_name}
            serviceType={user.email_address}
            requestTime={user.dateCreated}
          />
        ))}
      </ScrollView>
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
  textdesign: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(3),
    paddingVertical: responsiveHeight(3),
    paddingHorizontal: responsiveHeight(2),
  },
  container: {
    gap: responsiveHeight(2),
    width: responsiveWidth(90),
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingVertical: responsiveHeight(3),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: '#F5F5F5',
    borderRadius: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
  },

  smallContainer: {
    borderRadius: 10,
    shadowColor: '#000000',
    marginHorizontal: responsiveWidth(3),
    minHeight: responsiveHeight(17.5),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: responsiveHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    gap: responsiveHeight(1),
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headertext: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },

  userrequestdesign: {
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.5),
    color: PRIMARY_COLOR,
    // justifyContent: 'space-evenly'
  },
  viewtext: {
    fontSize: responsiveFontSize(1.5),
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    marginLeft: responsiveHeight(40),
  },
  viewallcontainer: {},
});
export default AdminHomescreen;
