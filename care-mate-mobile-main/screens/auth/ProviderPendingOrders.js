import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SlideButton from 'rn-slide-button';
import { baseUrl } from '../../IPConfig';
import axios from 'axios';
import moment from 'moment';
import UserContext from '../../context/UserProvider';
import NotificationsContext from '../../context/NotificationsProvider';

const ProviderPendingOrders = ({ route }) => {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const { notifications, setNotifications } =
    React.useContext(NotificationsContext);

  React.useEffect(() => {
    if (route.params) {
      setOrders(route.params.pendingOrders);
    }
  }, [route]);

  const handleOrderComplete = async (order) => {
    setIsLoading(true);
    console.log(order._id);
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
    } = order;

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
          markedComplete: true,
          orderCancel,
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
            id: order._id,
          },
        },
      );
      console.log(response.data);
      const tempOrders = orders.filter((item) => {
        return item._id != order._id;
      });
      setOrders(tempOrders);

      // send notification to provider
      const noticationResponse = await axios.post(`${baseUrl}/notifications/`, {
        title: `Congrats On Delivery!`,
        user: user.data.id,
        message: `You have completed order no: ${order._id.substr(
          order._id.length - 7,
        )} with ${serviceConsumerName}`,
      });

      // send notification to consumer
      await axios.post(`${baseUrl}/notifications/`, {
        title: 'Your order has been marked complete!',
        user: serviceConsumer,
        message: `${serviceProviderName} - ${serviceCategoryName} has completed your order, please go to orders screen to provide valuable feedback.`,
      });

      // send notification to provider via native-notify
      await axios.post(`https://app.nativenotify.com/api/notification`, {
        appId: 21735,
        appToken: 'vkSek1vvIqDI5SO1tPG56H',
        title: 'Congrats On Delivery!',
        body: `You have completed order no: ${order._id.substr(
          order._id.length - 7,
        )} with ${serviceConsumerName}`,
        dateSent: moment(),
      });

      // Updating Notifications List
      setNotifications([...notifications, noticationResponse.data]);

      setIsLoading(false);
    } catch (error) {
      console.log('could not complete the order! - ' + error);
      setIsLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.mainContainer}>
      <ScrollView>
        <Text
          style={{
            color: PRIMARY_COLOR,
            fontSize: responsiveFontSize(2.5),
            fontWeight: 'bold',
            paddingHorizontal: responsiveWidth(6),
            paddingVertical: responsiveHeight(3),
          }}
        >
          Orders in queue
        </Text>

        <View
          style={{
            paddingHorizontal: responsiveWidth(6),
          }}
        >
          {orders.length > 0 ? (
            <></>
          ) : (
            <Text
              style={{
                paddingVertical: responsiveHeight(2),
                fontSize: responsiveFontSize(2),
                textAlign: 'center',
                flex: 1,
              }}
            >
              No orders in queue. :)
            </Text>
          )}

          {orders.map((order, index) => {
            return (
              <View style={[styles.orderCard]} key={index}>
                <Text style={styles.orderCardTitle}>
                  {order.serviceConsumerName}
                </Text>
                <Text style={styles.orderCardText}>
                  Delivery: {order.deliveryDate}
                </Text>

                <Text style={styles.orderCardText}>
                  Payment: {order.paymentType.toUpperCase()}
                </Text>

                <Text style={styles.orderCardText}>
                  Address: {order.exactAddress.toUpperCase()}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    padding: responsiveHeight(2),
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`tel:${order.serviceConsumerPhone}`);
                    }}
                  >
                    <MaterialIcons
                      color={'green'}
                      size={responsiveWidth(6)}
                      name={'phone'}
                    />
                  </TouchableOpacity>
                </View>
                {moment(order.deliveryDate, 'HH:MM A DD MMM YY').diff(
                  moment(),
                  'hours',
                ) <= 0 ? (
                  <SlideButton
                    onSlideEnd={() => {
                      handleOrderComplete(order);
                    }}
                    containerStyle={{ backgroundColor: 'green' }}
                    title="Mark Complete"
                    height={responsiveHeight(6)}
                    titleStyle={{ fontSize: responsiveHeight(2.25) }}
                    underlayStyle={{ backgroundColor: 'green' }}
                  />
                ) : null}
              </View>
            );
          })}
        </View>
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
    </GestureHandlerRootView>
  );
};

export default ProviderPendingOrders;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: BACKGROUND_COLOR,
    flex: 1,
  },
  orderCard: {
    borderWidth: 1,
    borderColor: SHADOW_COLOR,
    padding: responsiveHeight(2),
    borderRadius: 8,
    gap: responsiveHeight(1),
    marginBottom: responsiveHeight(2),
  },
  orderCardTitle: {
    fontSize: responsiveFontSize(2.5),
  },
  orderCardText: {
    fontSize: responsiveFontSize(1.75),
    color: 'rgba(0,0,0,0.6)',
  },
});
