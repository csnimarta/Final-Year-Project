import BottomSheet, {
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {
  BaseButton,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Linking,
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
import QuestionMarkIcon from '../../assets/images/question-mark.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';
import moment from 'moment';
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import { baseUrl } from '../../IPConfig';
import { useNavigation } from '@react-navigation/native';
import NotificationsContext from '../../context/NotificationsProvider';

const OrderConfirmationScreen = ({ route }) => {
  const { user } = useContext(UserContext);
  const { notifications, setNotifications } = useContext(NotificationsContext);
  const navigation = useNavigation();
  const toast = useToast();
  const [isMonthly, setIsMonthly] = useState(false);
  const [serviceProvider, setServiceProvider] = useState({
    title: '',
    budget: '',
    isAvailable: false,
    description: '',
    category: '',
    _id: '',
    monthlyBudget: '',
    durationType: '',
    area: '',
    gender: '',
    age: '',
    providerName: '',
    phoneNumber: '',
  });

  const [address, setAddress] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDateTime, setSelectedDateTime] = useState({
    date: null,
    time: null,
  });

  useEffect(() => {
    if (route.params) {
      setServiceProvider(route.params.serviceProvider);
      setSelectedDateTime(route.params.selectedDateTime);
      setIsMonthly(route.params.isMonthly);
    }
    var currentTime = moment();
    var formattedTime = moment(currentTime, 'HH:mm').format('hh:mm A');
    setOrderTime(formattedTime);
  }, []);

  const [openPaymentSheet, setOpenPaymentSheet] = useState(false);
  const snapPoints = ['25%'];
  const sheetRef = useRef(null);
  const [orderDataObj, setOrderDataObj] = useState({});

  const confirmOrderCall = async (order) => {
    setIsLoading(true);
    try {
      console.log(serviceProvider.serviceProvider);
      const response = await axios.post(`${baseUrl}/order/createOrder`, order);
      toast.show('Order Placed!', {
        type: 'success',
      });

      // Notification for consumer
      const noticationResponse = await axios.post(`${baseUrl}/notifications/`, {
        title: 'Order Placed!',
        user: user.data.id,
        message: `Your order has been confirmed with a ${order.serviceCategoryName} for ${order.deliveryDate} - Check orders screen for details.`,
      });

      // Notification for provider
      await axios.post(`${baseUrl}/notifications/`, {
        title: 'Congrats! You have received a new order!',
        user: serviceProvider.serviceProvider,
        message: `${order.serviceConsumerName} has ordered your services. Please check your orders list for information regarding this order.`,
      });

      // Sending push notification to active user
      await axios.post(`https://app.nativenotify.com/api/notification`, {
        appId: 21735,
        appToken: 'vkSek1vvIqDI5SO1tPG56H',
        title: 'Order Placed!',
        body: `Your order has been confirmed!${
          order.paymentType === 'cod' ? '' : ' Waiting for payment confirmation'
        }`,
        dateSent: moment(),
      });

      // Updating Notifications List
      setNotifications([...notifications, noticationResponse.data]);

      setIsLoading(false);
      navigation.navigate('Main');
    } catch (error) {
      setIsLoading(false);
      toast.show('Could not place order, please try again.', {
        type: 'warning',
      });
      console.log('error creating order: ' + error);
    }
  };

  const handleConfirmOrder = async () => {
    setOrderDataObj({});
    const orderDT = moment(
      orderTime + ' ' + moment().format('DD MMM YY'),
      'HH:MM A DD MMM YY',
    ).format('HH:MM A DD MMM YY');

    const deliveryDT = moment(
      selectedDateTime.time + ' ' + selectedDateTime.date,
      'HH:MM A YYYY-MM-DD',
    ).format('HH:MM A DD MMM YY');

    const orderData = {
      serviceProvider: serviceProvider._id,
      serviceConsumer: user.data.id,
      orderDate: orderDT,
      deliveryDate: deliveryDT,
      cost: serviceProvider.budget,
      durationType: serviceProvider.durationType,
      markedComplete: false,
      orderCancel: false,
      paymentType: 'cod',
      exactAddress: address,
      cancellationReason: '',
      serviceCategoryName: serviceProvider.title,
      serviceProviderName: serviceProvider.providerName,
      serviceConsumerName: user.data.full_name,
      serviceProviderPhone: serviceProvider.phoneNumber,
      serviceConsumerPhone: user.data.phone_number,
      hasReceivedFeedback: false,
    };

    if (!address) {
      toast.show('Address field cannot be empty');
      return;
    } else if (address.length <= 8) {
      toast.show('Address field cannot that short');
      return;
    } else if (isMonthly) {
      setOpenPaymentSheet(true);
      setOrderDataObj(orderData);
      return;
    }
    await confirmOrderCall(orderData);
  };

  const cashPayment = async () => {
    const orderDT = moment(
      orderTime + ' ' + moment().format('DD MMM YY'),
      'HH:MM A DD MMM YY',
    ).format('HH:MM A DD MMM YY');

    const deliveryDT = moment(
      selectedDateTime.time + ' ' + selectedDateTime.date,
      'HH:MM A YYYY-MM-DD',
    ).format('HH:MM A DD MMM YY');

    const orderData = {
      serviceProvider: serviceProvider._id,
      serviceConsumer: user.data.id,
      orderDate: orderDT,
      deliveryDate: deliveryDT,
      cost: serviceProvider.monthlyBudget,
      durationType: serviceProvider.durationType,
      markedComplete: false,
      orderCancel: false,
      paymentType: 'cod',
      exactAddress: address,
      cancellationReason: '',
      serviceCategoryName: serviceProvider.title,
      serviceProviderName: serviceProvider.providerName,
      serviceConsumerName: user.data.full_name,
      serviceProviderPhone: serviceProvider.phoneNumber,
      serviceConsumerPhone: user.data.phone_number,
      hasReceivedFeedback: false,
    };

    await confirmOrderCall(orderData);
  };

  const cardPayment = async () => {
    setIsLoading(true);
    const orderDT = moment(
      orderTime + ' ' + moment().format('DD MMM YY'),
      'HH:MM A DD MMM YY',
    ).format('HH:MM A DD MMM YY');

    const deliveryDT = moment(
      selectedDateTime.time + ' ' + selectedDateTime.date,
      'HH:MM A YYYY-MM-DD',
    ).format('HH:MM A DD MMM YY');

    const orderData = {
      serviceProvider: serviceProvider._id,
      serviceConsumer: user.data.id,
      orderDate: orderDT,
      deliveryDate: deliveryDT,
      cost: serviceProvider.monthlyBudget,
      durationType: serviceProvider.durationType,
      markedComplete: false,
      orderCancel: false,
      paymentType: 'online',
      exactAddress: address,
      cancellationReason: '',
      serviceCategoryName: serviceProvider.title,
      serviceProviderName: serviceProvider.providerName,
      serviceConsumerName: user.data.full_name,
      serviceProviderPhone: serviceProvider.phoneNumber,
      serviceConsumerPhone: user.data.phone_number,
      hasReceivedFeedback: false,
    };

    try {
      const response = await axios.post(`${baseUrl}/order/payOnline`, {
        amount: orderData.cost,
      });
      const url = response.data.url;
      confirmOrderCall(orderData);
      await Linking.openURL(url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('could not pay online' + error);
      toast.show('Cannot pay online at the moment!');
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: openPaymentSheet ? 'gray' : '#fff',
        paddingVertical: responsiveHeight(2),
        alignItems: 'center',
      }}
    >
      <View
        style={{
          marginHorizontal: responsiveWidth(6),
          height: responsiveHeight(14),
          width: responsiveHeight(14),
          backgroundColor: PRIMARY_COLOR,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: responsiveHeight(4),
        }}
      >
        <AntDesign
          color={'#fff'}
          name={'question'}
          size={responsiveHeight(12)}
        />
      </View>

      <View style={styles.subsection}>
        <View style={styles.textLine}>
          <Text style={styles.label}>Service Provider:</Text>
          <Text style={styles.value}>{serviceProvider.providerName}</Text>
        </View>

        <View style={styles.textLine}>
          <Text style={styles.label}>Service Type:</Text>
          <Text style={styles.value}>{serviceProvider.title}</Text>
        </View>
      </View>

      <View style={styles.subsection}>
        <View style={styles.textLine}>
          <Text style={styles.label}>Order Time:</Text>
          <Text style={styles.value}>
            {orderTime + ' ' + moment().format('DD MMM YY')}
          </Text>
        </View>

        <View style={styles.textLine}>
          <Text style={styles.label}>Expected Delivery:</Text>
          <Text style={styles.value}>
            {selectedDateTime.time +
              ' - ' +
              moment(selectedDateTime.date).format('DD MMM YY')}
          </Text>
        </View>

        <View style={styles.textLine}>
          <Text style={styles.label}>Mode of payment:</Text>
          <Text style={styles.value}>COD</Text>
        </View>
        <View style={styles.textLine}>
          <Text style={styles.label}>Expected Amount*:</Text>
          <Text style={styles.value}>
            {isMonthly ? serviceProvider.monthlyBudget : serviceProvider.budget}
            rs
          </Text>
        </View>
      </View>

      <View
        style={{
          paddingVertical: responsiveHeight(2),
          paddingHorizontal: responsiveWidth(6),
        }}
      >
        <Text
          style={{
            fontSize: responsiveFontSize(1.75),
            color: 'rgba(0,0,0,0.5)',
          }}
        >
          <Text
            style={{
              fontSize: responsiveFontSize(1.75),
              color: 'rgba(0,0,0,0.5)',
              fontWeight: 'bold',
            }}
          >
            Note:
          </Text>{' '}
          The amount mentioned above is not the final amount, the final cost may
          vary according to the situation. At any point, if you feel unsatisfied
          with any service, please contact us.
        </Text>
      </View>

      <View style={{ width: '100%', flexDirection: 'row' }}>
        <TextInput
          value={address}
          onChangeText={(text) => {
            setAddress(text);
          }}
          multiline={true}
          numberOfLines={4}
          placeholder={
            'Write your exact address here. Make sure to mention building name and street.'
          }
          style={{
            marginHorizontal: responsiveWidth(6),
            flex: 1,
            borderWidth: 0.5,
            borderColor: 'rgba(0,0,0,0.5)',
            padding: 8,
            textAlignVertical: 'top',
            borderRadius: 8,
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(4),
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity
          onPress={handleConfirmOrder}
          style={[
            styles.button,
            {
              backgroundColor: address.length >= 8 ? 'green' : 'grey',
            },
          ]}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {openPaymentSheet ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => {
            setOpenPaymentSheet(false);
          }}
        >
          <BottomSheetView style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                padding: responsiveWidth(3),
              }}
            >
              <TouchableOpacity
                onPress={cashPayment}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  margin: responsiveHeight(1),
                  borderRadius: 8,
                  borderColor: SHADOW_COLOR,
                }}
              >
                <FontAwesome
                  name="money"
                  color={PRIMARY_COLOR}
                  size={responsiveHeight(12)}
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                  }}
                >
                  Cash
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={cardPayment}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  margin: responsiveHeight(1),
                  borderRadius: 8,
                  borderColor: SHADOW_COLOR,
                }}
              >
                <AntDesign
                  name="creditcard"
                  color={PRIMARY_COLOR}
                  size={responsiveHeight(12)}
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                  }}
                >
                  Credit/Debit Card
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>
        </BottomSheet>
      ) : null}
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
    </GestureHandlerRootView>
  );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
  subsection: {
    width: responsiveWidth(100),
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(6),
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  textLine: {
    flexDirection: 'row',
    paddingVertical: responsiveHeight(1),
    justifyContent: 'spaceBetween',
    width: '100%',
    alignItems: 'flex-end',
  },
  label: {
    fontSize: responsiveFontSize(2.25),
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  value: {
    fontSize: responsiveFontSize(2),
    textAlign: 'right',
    // width: '100%',
    flex: 1,
    color: TEXT_COLOR,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 8,
    paddingVertical: responsiveHeight(1),
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.5),
    textAlign: 'center',
  },
});
