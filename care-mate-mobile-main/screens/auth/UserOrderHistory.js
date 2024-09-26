import {
  StyleSheet,
  Modal,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR,
  BACKGROUND_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';
import axios from 'axios';
import { baseUrl } from '../../IPConfig';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../context/UserProvider';
import { useToast } from 'react-native-toast-notifications';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Linking } from 'react-native';
import SlideButton from 'rn-slide-button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HappyIcon from '../../assets/images/rating-icon-happy.svg';
import SmileIcon from '../../assets/images/rating-icon-smile.svg';
import SadIcon from '../../assets/images/rating-icon-sad.svg';
import AngryIcon from '../../assets/images/rating-icon-angry.svg';
import NeutralIcon from '../../assets/images/rating-icon-neutral.svg';
import BottomSheet, {
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const UserOrderHistory = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const toast = useToast();
  const navigation = useNavigation();
  const [ratingSelected, setRatingSelected] = useState(0);
  const [currentOrder, setCurrentOrder] = useState({});
  const [isProblemBottomSheetOpen, setIsProblemBottomSheetOpen] =
    useState(false);
  const snapPoints = ['25%'];
  const sheetRef = useRef(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/order/getOrders`);

        const orders = response.data.filter((order) => {
          return user.data.id == order.serviceConsumer;
        });

        let tempCompleteOrders = [];
        let tempPendingOrders = [];
        orders.forEach((order) => {
          if (order.markedComplete || order.orderCancel) {
            tempCompleteOrders.push(order);
          } else {
            tempPendingOrders.push(order);
          }
        });

        setCompleteOrders(tempCompleteOrders.reverse());
        setPendingOrders(tempPendingOrders.reverse());
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching orders: ' + error);
        toast.show('Could not retrieve data at the moment', {
          type: 'warning',
        });
        setIsLoading(false);
      }
    };
    fetchOrder();
  }, [currentOrder]);

  const [openReviewModal, setOpenReviewModal] = useState(false);

  const handleReview = async () => {
    setIsLoading(true);

    const {
      serviceProvider,
      serviceConsumer,
      orderDate,
      deliveryDate,
      cost,
      durationType,
      markedComplete,
      orderCancel,
      paymentType,
      exactAddress,
      serviceProviderName,
      serviceConsumerName,
      serviceCategoryName,
      serviceProviderPhone,
      hasReceivedFeedback,
      serviceConsumerPhone,
    } = currentOrder;
    try {
      const response = await axios.put(
        `${baseUrl}/order/updateOrder`,
        {
          serviceProvider,
          serviceConsumer,
          orderDate,
          deliveryDate,
          cost,
          durationType,
          markedComplete,
          orderCancel,
          paymentType,
          exactAddress,
          serviceProviderName,
          serviceConsumerName,
          serviceCategoryName,
          serviceProviderPhone,
          serviceConsumerPhone,
          hasReceivedFeedback: ratingSelected,
        },
        {
          params: {
            id: currentOrder._id,
          },
        },
      );
      console.log(response.data);
      setIsLoading(false);
      setRatingSelected(0);
      setCurrentOrder({});
    } catch (error) {
      setIsLoading(false);
      console.log('Could not add review: ' + error);
    }
  };
  const handleOrderComplaint = async () => {
    navigation.navigate('ComplaintScreen', { order: currentOrder });
    setCurrentOrder({});
  };
  const handleOrderCancel = async () => {
    setIsLoading(true);

    const {
      serviceProvider,
      serviceConsumer,
      orderDate,
      deliveryDate,
      cost,
      durationType,
      markedComplete,
      orderCancel,
      paymentType,
      exactAddress,
      serviceProviderName,
      serviceConsumerName,
      serviceCategoryName,
      serviceProviderPhone,
      hasReceivedFeedback,
      serviceConsumerPhone,
    } = currentOrder;

    try {
      const response = await axios.put(
        `${baseUrl}/order/updateOrder`,
        {
          serviceProvider,
          serviceConsumer,
          orderDate,
          deliveryDate,
          cost,
          durationType,
          markedComplete,
          orderCancel: true,
          paymentType,
          exactAddress,
          serviceProviderName,
          serviceConsumerName,
          serviceCategoryName,
          serviceProviderPhone,
          serviceConsumerPhone,
          hasReceivedFeedback,
        },
        {
          params: {
            id: currentOrder._id,
          },
        },
      );
      setIsLoading(false);
      setCurrentOrder({});
    } catch (error) {
      setIsLoading(false);
      console.log('Could not add review: ' + error);
    }
  };

  const handleOpenFeedback = (order) => {
    setCurrentOrder(order);
    setOpenReviewModal(true);
  };

  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <ScrollView>
        {pendingOrders.length > 0 ? (
          <View style={styles.orderSection}>
            <View>
              <Text style={styles.orderHeading}>Pending Orders</Text>
            </View>
            <View style={{ gap: responsiveHeight(1) }}>
              {pendingOrders.map((order, index) => {
                return (
                  <View style={[styles.orderCard]} key={index}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.5),
                        fontWeight: 'bold',
                      }}
                    >
                      Order ID: {order._id.substr(order._id.length - 7)}
                    </Text>
                    <Text style={styles.orderCardTitle}>
                      {order.serviceProviderName.trim()} -{' '}
                      {order.serviceCategoryName}
                    </Text>
                    <Text style={styles.orderCardText}>
                      Delivery: {order.deliveryDate}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                      }}
                    >
                      <Text style={styles.orderCardText}>
                        Cost: {order.cost}
                      </Text>
                      <Text style={styles.orderCardText}>
                        Payment: {order.paymentType.toUpperCase()}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          Linking.openURL(`tel:${order.serviceProviderPhone}`);
                        }}
                      >
                        <MaterialIcons
                          color={'green'}
                          size={responsiveWidth(6)}
                          name={'phone'}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          setCurrentOrder(order);
                          setIsProblemBottomSheetOpen(true);
                        }}
                      >
                        <MaterialIcons
                          color={'red'}
                          size={responsiveWidth(6)}
                          name={'error'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : null}

        {completeOrders.length > 0 ? (
          <View style={styles.orderSection}>
            <View>
              <Text style={styles.orderHeading}>Complete Orders</Text>
            </View>
            <View style={{ gap: responsiveHeight(1) }}>
              {completeOrders.map((order, index) => {
                return (
                  <View style={[styles.orderCard]} key={index}>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.5),
                        fontWeight: 'bold',
                      }}
                    >
                      Order ID: {order._id.substr(order._id.length - 7)}
                    </Text>
                    {order.orderCancel ? (
                      <Text
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          padding: responsiveHeight(2),
                          zIndex: 10,
                          fontSize: responsiveFontSize(1.5),
                          color: 'red',
                          fontWeight: 'bold',
                        }}
                      >
                        cancelled
                      </Text>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setCurrentOrder(order);
                          setIsProblemBottomSheetOpen(true);
                        }}
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          padding: responsiveHeight(2),
                          zIndex: 10,
                        }}
                      >
                        <MaterialIcons
                          color={'red'}
                          size={20}
                          name="report-problem"
                        />
                      </TouchableOpacity>
                    )}

                    <Text style={styles.orderCardTitle}>
                      {order.serviceProviderName} - {order.serviceCategoryName}
                    </Text>
                    <Text style={styles.orderCardText}>
                      Delivery: {order.deliveryDate}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flex: 1,
                      }}
                    >
                      <Text style={styles.orderCardText}>
                        Cost: {order.cost}
                      </Text>
                      <Text style={styles.orderCardText}>
                        Payment: {order.paymentType.toUpperCase()}
                      </Text>
                    </View>

                    {order.orderCancel ??
                    order.hasReceivedFeedback > 0 ? null : (
                      <SlideButton
                        autoReset={true}
                        onSlideEnd={() => {
                          handleOpenFeedback(order);
                        }}
                        containerStyle={{ backgroundColor: 'green' }}
                        title={'Slide to provide feedback'}
                        height={responsiveHeight(6)}
                        titleStyle={{ fontSize: responsiveHeight(1.75) }}
                        underlayStyle={{ backgroundColor: 'green' }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ) : null}
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={isProblemBottomSheetOpen}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={[styles.modalContainer]}>
          <View
            style={[
              styles.modalContent,
              { gap: responsiveHeight(1), paddingVertical: 28 },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setIsProblemBottomSheetOpen(false);
              }}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                padding: responsiveHeight(2),
                zIndex: 10,
              }}
            >
              <MaterialIcons color={PRIMARY_COLOR} size={24} name="cancel" />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                paddingBottom: responsiveHeight(1),
              }}
            >
              How can we help you?
            </Text>

            <TouchableOpacity
              onPress={() => {
                handleOrderCancel();
                setIsProblemBottomSheetOpen(false);
              }}
              style={[
                styles.modalButton,
                {
                  flexDirection: 'row',
                  gap: responsiveWidth(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  backgroundColor: '#C43D00',
                },
              ]}
            >
              <MaterialCommunityIcons
                name={'cancel'}
                color={BACKGROUND_COLOR}
                size={24}
              />
              <Text style={styles.modalButtonText}>Cancel Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleOrderComplaint();
                setIsProblemBottomSheetOpen(false);
              }}
              style={[
                styles.modalButton,
                {
                  flexDirection: 'row',
                  gap: responsiveWidth(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80%',
                  backgroundColor: '#FFC35D',
                },
              ]}
            >
              <MaterialCommunityIcons
                name={'cancel'}
                color={BACKGROUND_COLOR}
                size={24}
              />
              <Text style={styles.modalButtonText}>Place a complaint</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={openReviewModal}
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, {}]}>
            <Text style={{ fontSize: responsiveFontSize(2) }}>
              What did you feel about this service?
            </Text>

            <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
              <TouchableOpacity
                onPress={() => {
                  setRatingSelected(1);
                }}
                style={{
                  backgroundColor: '#e63946',
                  borderWidth: responsiveWidth(0.75),
                  borderColor: ratingSelected === 1 ? '#000' : '#e63946',
                  padding: responsiveHeight(1),
                  borderRadius: 8,
                }}
              >
                <AngryIcon
                  height={responsiveWidth(6)}
                  width={responsiveWidth(6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRatingSelected(2);
                }}
                style={{
                  backgroundColor: '#f7b801',
                  borderWidth: responsiveWidth(0.75),
                  borderColor: ratingSelected === 2 ? '#000' : '#f7b801',

                  padding: responsiveHeight(1),
                  borderRadius: 8,
                }}
              >
                <SadIcon
                  height={responsiveWidth(6)}
                  width={responsiveWidth(6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRatingSelected(3);
                }}
                style={{
                  backgroundColor: '#6c757d',
                  borderWidth: responsiveWidth(0.75),
                  borderColor: ratingSelected === 3 ? '#000' : '#6c757d',

                  padding: responsiveHeight(1),
                  borderRadius: 8,
                }}
              >
                <NeutralIcon
                  height={responsiveWidth(6)}
                  width={responsiveWidth(6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRatingSelected(4);
                }}
                style={{
                  backgroundColor: '#a7c957',
                  borderWidth: responsiveWidth(0.75),
                  borderColor: ratingSelected === 4 ? '#000' : '#a7c957',
                  padding: responsiveHeight(1),
                  borderRadius: 8,
                }}
              >
                <SmileIcon
                  height={responsiveWidth(6)}
                  width={responsiveWidth(6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setRatingSelected(5);
                }}
                style={{
                  backgroundColor: '#386641',
                  borderWidth: responsiveWidth(0.75),
                  borderColor: ratingSelected === 5 ? '#000' : '#386641',
                  padding: responsiveHeight(1),
                  borderRadius: 8,
                }}
              >
                <HappyIcon
                  height={responsiveWidth(6)}
                  width={responsiveWidth(6)}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                setOpenReviewModal(false);
                handleReview();
              }}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

export default UserOrderHistory;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  orderSection: {
    paddingHorizontal: responsiveWidth(6),
    paddingTop: responsiveHeight(4),
    paddingBottom: responsiveHeight(2),
    gap: responsiveHeight(2),
  },
  orderHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  orderCard: {
    borderWidth: 1,
    borderColor: SHADOW_COLOR,
    padding: responsiveHeight(2),
    borderRadius: 8,
    gap: responsiveHeight(1),
  },
  orderCardTitle: {
    fontSize: responsiveFontSize(2.5),
  },
  orderCardText: {
    fontSize: responsiveFontSize(1.75),
    color: 'rgba(0,0,0,0.6)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: responsiveWidth(80),
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    gap: responsiveHeight(2),
  },
  modalText: {
    fontSize: responsiveFontSize(2),
    marginBottom: 20,
    textAlign: 'center',
    color: PRIMARY_COLOR,
  },
  modalButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: responsiveHeight(1.25),
    paddingHorizontal: responsiveWidth(6),
    borderRadius: responsiveHeight(2),
  },
  modalButtonText: {
    color: BACKGROUND_COLOR,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});
