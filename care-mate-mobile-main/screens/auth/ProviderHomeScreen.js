import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  DevSettings,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { Modal } from 'react-native';
import { baseUrl } from '../../IPConfig';
import {
  PRIMARY_COLOR,
  TEXT_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
  SECONDARY_COLOR,
} from '../../constants/Colors';
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServiceContext from '../../context/ServiceProvider';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment';

const ProviderHomeScreen = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { service, setService } = useContext(ServiceContext);
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [completeOrders, setCompleteOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [isBanned, setIsBanned] = useState(false);
  const [bannedHours, setBannedHours] = useState(0);

  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  const navigateToCreateservice = () => {
    navigation.navigate('CreateService');
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchService = async () => {
      if (user.data) {
        try {
          const response = await axios.get(`${baseUrl}/service/serviceById`, {
            params: {
              user: user.data.id,
            },
          });
          setService(response.data.service);
          const date = moment(service.bannedTill, 'DD-MMM-YYYY');
          if (moment().diff(date, 'hours') < 0) {
            setIsBanned(true);
            setBannedHours(moment().diff(date, 'hours'));
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    };
    fetchService();
    console.log(service._id);

    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/order/getOrders`);

        let tempCompleteOrders = [];
        let tempPendingOrders = [];

        const orders = response.data.filter((order) => {
          return order.serviceProvider == service._id;
        });

        orders.forEach((order) => {
          if (order.markedComplete || order.orderCancel) {
            tempCompleteOrders.push(order);
          } else {
            tempPendingOrders.push(order);
          }
        });

        setCompleteOrders(tempCompleteOrders);
        setPendingOrders(tempPendingOrders);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching orders: ' + error);
        toast.show('Could not retrieve data at the moment', {
          type: 'warning',
        });
        setIsLoading(false);
      }
    };
    if (service._id) {
      fetchOrder();
    }
  }, [user, service._id]);

  if (!user) {
    return <View></View>;
  }

  const getPendingOrderText = (count) => {
    if (count === 1) {
      return `${count} Order Pending.`;
    } else if (count <= 5) {
      return `${count} Orders Pending.`;
    } else if (count > 5) {
      return `5+ Orders Pending.`;
    } else if (count > 10) {
      return `10+ Orders Pending.`;
    } else if (count > 25) {
      return `25+ Orders Pending.`;
    } else if (count > 50) {
      return `50+ Orders Pending.`;
    } else {
      return 'No order in queue.';
    }
  };

  const getCompleteOrdersText = (count) => {
    if (count === 1) {
      return `${count} Order Complete.`;
    } else if (count <= 5 && count > 1) {
      return `${count} Orders Complete.`;
    } else if (count > 5 && count < 10) {
      return `5+ Orders Complete.`;
    } else if (count > 10 && count < 25) {
      return `10+ Orders Complete.`;
    } else if (count > 25 && count < 50) {
      return `25+ Orders Complete.`;
    } else if (count > 50) {
      return `50+ Orders Complete.`;
    } else {
      return `You haven't completed any orders yet.`;
    }
  };

  const handlePendingOrders = () => {
    if (pendingOrders.length > 0) {
      navigation.navigate('ProviderPendingOrders', { pendingOrders });
    } else {
      toast.show('You do not have any orders pending.');
    }
  };

  const handleCompleteOrder = () => {
    if (completeOrders.length > 0) {
      navigation.navigate('ProviderCompleteOrders', { completeOrders });
    } else {
      toast.show('You have not completed any orders yet.');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: responsiveWidth(2),
        gap: responsiveHeight(3),
        paddingVertical: responsiveHeight(3),
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{}}>
          <Text style={styles.welcomeuserText}>
            Welcome{' '}
            {user.data ? user.data.full_name.trim() : 'Service Provider'}!
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: responsiveWidth(2),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigateToNotifications();
            }}
          >
            <Ionicons
              name="notifications-circle-outline"
              size={30}
              color={PRIMARY_COLOR}
              style={{}}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal}>
            <MaterialIcons name="logout" color={PRIMARY_COLOR} size={28} />
          </TouchableOpacity>
        </View>
      </View>

      {service._id ? (
        <View style={styles.createServiceContainer}>
          <Text style={styles.text1}>Service: {service.title}</Text>
          <Text
            style={[
              styles.text2,
              {
                paddingVertical: responsiveHeight(1),
                color: isBanned ? 'red' : service.isAvailable ? 'green' : 'red',
              },
            ]}
          >
            {isBanned
              ? `Banned for ${-bannedHours}h`
              : service.isAvailable
              ? 'Available'
              : 'Offline'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ServiceDetails');
            }}
            style={styles.button}
          >
            <Text style={styles.text3}>View Details</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.createServiceContainer}>
          <View style={{}}>
            <Text style={styles.text1}>Become a service seller!</Text>
            <Text
              style={[styles.text2, { paddingVertical: responsiveHeight(1) }]}
            >
              Get more money using your skill
            </Text>
            <Animatable.View
              style={{ alignItems: 'center' }}
              animation="bounceInLeft"
              duration={1500}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  navigateToCreateservice();
                }}
              >
                <Text style={styles.text3}>Create Now</Text>
                <Ionicons
                  name="arrow-forward"
                  size={25}
                  color={BACKGROUND_COLOR}
                />
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.createServiceContainer, { gap: responsiveHeight(2) }]}
        onPress={handlePendingOrders}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(2),
          }}
        >
          <MaterialIcons
            name="pending-actions"
            size={responsiveWidth(12)}
            color={PRIMARY_COLOR}
          />
          <Text style={styles.text1}>Pending Orders</Text>
        </View>
        <Text style={{ color: 'red', fontSize: responsiveFontSize(2) }}>
          {getPendingOrderText(pendingOrders.length)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleCompleteOrder}
        style={[styles.createServiceContainer, { gap: responsiveHeight(2) }]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(2),
          }}
        >
          <MaterialIcons
            name="task-alt"
            size={responsiveWidth(12)}
            color={PRIMARY_COLOR}
          />
          <Text style={styles.text1}>Complete Orders</Text>
        </View>
        <Text style={{ color: 'green', fontSize: responsiveFontSize(2) }}>
          {getCompleteOrdersText(completeOrders.length)}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProviderEditProfile');
        }}
        style={[styles.createServiceContainer]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveWidth(2),
          }}
        >
          <AntDesign
            name="user"
            size={responsiveWidth(12)}
            color={PRIMARY_COLOR}
          />
          <Text style={styles.text1}>Edit your profile</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() => setModalVisible(false)}
            activeOpacity={1}
          >
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {/* modal content here */}
              <View style={styles.modal}>
                <TouchableOpacity
                  style={styles.modalCloseButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons
                    name="close-sharp"
                    size={26}
                    color={PRIMARY_COLOR}
                  />
                </TouchableOpacity>
                <Text style={styles.modalText}>
                  Are you sure want to logout your account?
                </Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.modalButton1}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalbutton1Text}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalbutton2}
                    onPress={() => {
                      if (navigation.canGoBack()) {
                        navigation.popToTop();
                      }
                      navigation.navigate('Welcome');
                      setTimeout(async () => {
                        await AsyncStorage.removeItem('@user');
                        setUser({});
                      }, 1000);
                    }}
                  >
                    <Text style={styles.modalbutton2Text}>Yes, logout</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

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
  createServiceContainer: {
    height: responsiveHeight(12),
    borderRadius: 10,
    shadowColor: '#000000',
    marginHorizontal: responsiveWidth(3),
    minHeight: responsiveHeight(19),
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
  },
  text1: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    // backgroundColor: 'red'
    textAlign: 'center',
  },
  text2: {
    textAlign: 'center',
    fontSize: responsiveFontSize(1.7),
    color: SHADOW_COLOR,
    fontWeight: 'bold',
  },
  text3: {
    fontSize: responsiveFontSize(2),
    color: BACKGROUND_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: responsiveHeight(7),
    backgroundColor: PRIMARY_COLOR,
    width: responsiveWidth(40),
    height: responsiveHeight(6),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  boxContainer: {
    width: responsiveWidth(95),
    height: responsiveHeight(12),
    borderRadius: 10,
    alignSelf: 'center',
    shadowColor: '#000000',

    minHeight: responsiveHeight(40),
    // shadowOffset: {
    //     width: 0,
    //     height: 2,
    // },
    // shadowOpacity: 0.17,
    // shadowRadius: 2.54,
    // elevation: 3,
    // backgroundColor: '#fff',
    // borderRadius: responsiveHeight(2),
    top: responsiveHeight(9),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 4,
  },
  boxContainer2: {
    width: responsiveWidth(30),
    height: responsiveHeight(20),
    borderRadius: responsiveHeight(2),
    // minHeight: responsiveHeight(15),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 7,
    backgroundColor: '#fff',
    //top: responsiveHeight(2),
  },
  otherContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(17),
    // backgroundColor: 'red',
    alignSelf: 'center',
    top: responsiveHeight(-8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallcontainer: {
    width: responsiveWidth(25),
    height: responsiveHeight(15),
    borderRadius: responsiveHeight(2),
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 7,
    backgroundColor: '#fff',
  },
  servicesText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    alignSelf: 'center',
    textAlign: 'center',
    top: responsiveHeight(2),
  },
  servicesText2: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(5),
    alignSelf: 'center',
    marginVertical: responsiveHeight(3),
  },
  welcomeuserText: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    marginLeft: responsiveHeight(2),
  },

  modal: {
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 10,
    height: '30%',
    width: '80%',
    position: 'absolute',
    marginBottom: '6%',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.62,
    elevation: 7,
    padding: '4%',
  },

  modalButton1: {
    flex: 1,
    height: '100%',
    width: responsiveWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
    marginHorizontal: 5,
    borderRadius: responsiveHeight(3),
  },
  modalbutton2: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BACKGROUND_COLOR,
    marginHorizontal: 5,
    borderRadius: responsiveHeight(3),
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  modalbutton1Text: {
    color: '#fff',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },

  modalbutton2Text: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 18,
    right: 18,
    width: 25,
    height: 30,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingBottom: 20,
  },

  modalText: {
    fontSize: responsiveFontSize(2.5),
    marginVertical: responsiveHeight(6),
    marginHorizontal: 20,
    textAlign: 'center',
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: responsiveHeight(6.5),
    width: responsiveWidth(75),
    alignSelf: 'center',
  },
});

export default ProviderHomeScreen;
