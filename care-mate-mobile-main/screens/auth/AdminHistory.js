import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  SHADOW_COLOR,
} from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';
import { baseUrl } from '../../IPConfig';
import moment from 'moment';

const AdminHistory = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/order/getOrders`);

        const orders = response.data;

        let tempOrders = [];
        orders.forEach((order) => {
          if (!order.markedComplete) {
            tempOrders.push(order);
          } else {
          }
        });

        let sortedOrders = tempOrders.sort(function (a, b) {
          return moment(b.createdAt) - moment(a.createdAt);
        });

        setOrders(sortedOrders);
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
  }, []);

  return (
    <View
      style={{
        backgroundColor: BACKGROUND_COLOR,
        flex: 1,
      }}
    >
      <ScrollView
        style={{
          paddingHorizontal: responsiveWidth(6),
          paddingVertical: responsiveHeight(2),
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              color={PRIMARY_COLOR}
              size={24}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              fontWeight: 'bold',
              color: PRIMARY_COLOR,
            }}
          >
            History Orders
          </Text>
        </View>
        <View
          style={{
            paddingBottom: responsiveHeight(4),
            paddingTop: responsiveHeight(2),
          }}
        >
          {orders.map((order) => {
            return (
              <View style={styles.orderCard} key={order._id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Text style={styles.smallText}>
                    Order ID: {order._id.substr(order._id.length - 7)}
                  </Text>
                  <Text style={styles.smallText}>
                    {moment(order.createdAt).fromNow()}
                  </Text>
                </View>

                <Text style={styles.normalText}>
                  <Text style={styles.boldText}>Service Provider: </Text>
                  {order.serviceProviderName}
                </Text>
                <Text style={styles.normalText}>
                  <Text style={styles.boldText}>Service Consumer: </Text>
                  {order.serviceConsumerName}
                </Text>

                <Text style={styles.normalText}>
                  <Text style={styles.boldText}>Delivery: </Text>{' '}
                  {order.deliveryDate}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.normalText}>Cost: {order.cost}</Text>
                    {order.paymentType.toUpperCase() === 'ONLINE' ? (
                      <MaterialIcons
                        style={{ marginLeft: 5 }}
                        color={'green'}
                        name="done-all"
                        size={20}
                      />
                    ) : (
                      ''
                    )}
                  </View>

                  <Text style={styles.normalText}>
                    Payment: {order.paymentType.toUpperCase()}
                  </Text>
                </View>
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
    </View>
  );
};

export default AdminHistory;

const styles = StyleSheet.create({
  orderCard: {
    borderWidth: 1,
    borderColor: SHADOW_COLOR,
    borderRadius: 8,
    padding: responsiveHeight(1),
    marginVertical: responsiveHeight(1),
    gap: responsiveHeight(0.5),
  },
  smallText: {
    fontSize: responsiveFontSize(1.5),
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold',
  },
  normalText: {
    fontSize: responsiveFontSize(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
});
