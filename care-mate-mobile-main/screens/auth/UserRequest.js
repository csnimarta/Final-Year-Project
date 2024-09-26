import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SHADOW_COLOR,
  TEXT_COLOR,
} from '../../constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../../IPConfig';
import axios from 'axios';
// import firebase from 'firebase';
import { firebase } from '../UserCnicScreen/manageCnicUpload';
import CheckNo from '../../assets/images/check-no.svg';
import { useToast } from 'react-native-toast-notifications';

const UserRequest = () => {
  const [imageUrl, setImageUrl] = useState(undefined);
  const [showCnic, setShowCnic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);
  const navigation = useNavigation();

  const [userData, setUserData] = useState([]);
  const toast = useToast();

  const handleConfirm = (id) => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/user/approve-user`, {
        params: {
          _id: id,
        },
      })
      .then((response) => {
        console.log(response);
        const updatedList = userData.filter((item) => item._id !== id);
        setUserData(updatedList);
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
  };

  const handleViewInfo = (id) => {
    console.log(id);
    setIsLoading(true);
    firebase
      .storage()
      .ref('/' + id) //name in storage in firebase console
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setImageUrl(url);
        setShowCnic(true);
        setIsLoading(false);
      })
      .catch((e) => console.log('Errors while downloading => ', e));
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/user/delete-user`, {
        params: {
          _id: id,
        },
      })
      .then((response) => {
        console.log(response);
        const updatedList = userData.filter((item) => item._id !== id);
        setUserData(updatedList);
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
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${baseUrl}/user/service-providers`)
      .then((response) => {
        console.log(response.data);
        const filteredData = response.data.filter(
          (item) => item.isActive !== true,
        );
        setUserData(filteredData);
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
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
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
          <Text style={styles.usertext}>User Requests</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Name</Text>
        <Text style={styles.topBarText}>Status</Text>
        <Text style={styles.topBarText}>Actions</Text>
      </View>

      {!showAllUsers && (
        <TouchableOpacity onPress={() => setShowAllUsers(true)}>
          <Text style={styles.seeAllButtonText}>View all</Text>
        </TouchableOpacity>
      )}

      {showAllUsers && (
        <TouchableOpacity onPress={() => setShowAllUsers(false)}>
          <Text style={styles.seeAllButtonText}>View less</Text>
        </TouchableOpacity>
      )}

      <ScrollView>
        {showAllUsers
          ? userData.map((user) => (
              <View key={user._id} style={styles.userContainer}>
                <View>
                  <Text style={styles.userName}>{user.full_name}</Text>
                  <Text style={styles.userName}>
                    {user._id.substr(user._id.length - 7)}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={() => handleConfirm(user._id)}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.viewButton]}
                    onPress={() => handleViewInfo(user.cnic_image)}
                  >
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>
                  <View style={styles.Container}>
                    <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={() => handleDelete(user._id)}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          : // Show only a subset of users initially
            userData.slice(0, 5).map((user) => (
              <View key={user._id} style={styles.userContainer}>
                <View>
                  <Text style={styles.userName}>{user.full_name}</Text>
                  <Text style={styles.userName}>
                    {user._id.substr(user._id.length - 7)}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={() => handleConfirm(user._id)}
                  >
                    <Text style={styles.buttonText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.viewButton]}
                    onPress={() => handleViewInfo(user.cnic_image)}
                  >
                    <Text style={styles.buttonText}>View</Text>
                  </TouchableOpacity>
                  <View style={styles.Container}>
                    <TouchableOpacity
                      style={[styles.button, styles.deleteButton]}
                      onPress={() => handleDelete(user._id)}
                    >
                      <FontAwesome name="trash-o" size={20} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
      </ScrollView>

      {showCnic ? (
        <View
          style={{
            height: responsiveHeight(100),
            width: responsiveWidth(100),
            backgroundColor: 'rgba(0,0,0,0.75)',
            position: 'absolute',
            top: 0,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            height={responsiveHeight(50)}
            width={responsiveWidth(80)}
            source={{ uri: imageUrl }}
          />
          <TouchableOpacity
            onPress={() => {
              setImageUrl(undefined);
              setShowCnic(false);
            }}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              padding: 5,
              margin: 15,
              backgroundColor: 'red',
              borderRadius: 100,
            }}
          >
            <CheckNo height={25} width={25} />
          </TouchableOpacity>
        </View>
      ) : (
        <></>
      )}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: responsiveHeight(5),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    width: responsiveWidth(95),
    alignSelf: 'center',
    height: responsiveHeight(5),
    top: responsiveHeight(3),
    alignItems: 'center',
    paddingHorizontal: responsiveHeight(2),
    shadowColor: SHADOW_COLOR,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 7,
    marginBottom: responsiveHeight(3),
  },
  topBarText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },

  userContainer: {
    backgroundColor: BACKGROUND_COLOR,
    minHeight: responsiveHeight(7),
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: 5,
    marginBottom: responsiveHeight(3),
  },

  userName: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },

  serviceType: {
    fontSize: responsiveFontSize(1.5),
    color: PRIMARY_COLOR,
  },

  usertext: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    marginLeft: responsiveHeight(18),
    color: PRIMARY_COLOR,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginHorizontal: responsiveHeight(13),
    top: responsiveHeight(1),
  },

  button: {
    padding: 3,
    borderRadius: responsiveHeight(8),
    marginTop: responsiveHeight(-5),
    borderRadius: 5,
    marginLeft: responsiveHeight(2),
  },
  confirmButton: {
    backgroundColor: PRIMARY_COLOR,
    width: responsiveWidth(18),
    height: responsiveHeight(3.5),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: 'green',
    width: responsiveWidth(13),
    height: responsiveHeight(3.5),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  // buttonText: {
  //     color: BACKGROUND_COLOR,
  //     //  fontWeight: 'bold',
  //     alignItems: 'center'
  // },
  Container: {
    flexDirection: 'row',
    marginLeft: responsiveHeight(4),
  },

  editButton: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },

  deleteButton: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginLeft: responsiveHeight(6),
  },

  buttonText: {
    color: BACKGROUND_COLOR,
    fontWeight: 'bold',
    alignItems: 'center',
    alignSelf: 'center',
  },
  seeAllButtonText: {
    fontSize: responsiveFontSize(1.5),
    color: PRIMARY_COLOR,
    marginLeft: responsiveHeight(41.5),
    paddingVertical: responsiveHeight(1),
  },
});
export default UserRequest;
