import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  TEXT_COLOR,
  SHADOW_COLOR,
  BACKGROUND_COLOR,
} from '../../constants/Colors';
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useToast } from 'react-native-toast-notifications';
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import { baseUrl } from '../../IPConfig';
import moment from 'moment';
import Checkbox from 'expo-checkbox';

const AdminComplaintResolve = ({ route }) => {
  const { complaint } = route.params;
  const [complaintData, setComplaintData] = useState(complaint);
  const [order, setOrder] = useState({});
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [banDays, setBanDays] = useState('0');
  const [message, setMessage] = useState(
    complaint.adminResponse ? complaint.adminResponse : '',
  );
  const [isResolved, setIsResolved] = useState(
    complaint.status === 'Resolved' ? true : false,
  );

  function handleBackButtonClick() {
    navigation.goBack();
    navigation.goBack();
    navigation.navigate('AdminComplaint');
    return true;
  }

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/order/getOrderById`, {
          params: {
            id: complaint.order,
          },
        });
        setOrder(response.data);
      } catch (error) {
        console.log('Could not fetch order: ' + error);
      }
    };
    const updateComplaint = async () => {
      try {
        const response = await axios.put(
          `${baseUrl}/complaint/update`,
          {
            adminResponse: '',
            status:
              complaint.status === 'Pending' ? 'Opened' : complaint.status,
          },
          {
            params: {
              _id: complaint._id,
            },
          },
        );
        setComplaintData(response.data);
      } catch (error) {
        console.log('Could not fetch order: ' + error);
      }
    };
    setComplaintData(complaint);

    fetchOrderDetails();
    if (complaint.status === 'Pending') {
      updateComplaint();
    }

    if (route.name === 'AdminComplaintResolve') {
      BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          handleBackButtonClick,
        );
      };
    }
  }, []);

  const handleResolveComplaint = async () => {
    setIsLoading(true);
    if (message || isResolved) {
      try {
        const response = await axios.put(
          `${baseUrl}/complaint/update`,
          {
            adminResponse: message,
            status: isResolved ? 'Resolved' : 'Opened',
          },
          {
            params: {
              _id: complaintData._id,
            },
          },
        );
        setComplaintData(response.data);
      } catch (error) {
        console.log('Could not fetch order: ' + error);
      }
    }
    if (isResolved) {
      sendNotificationToConsumer();
    }
    if (message.length > 0 || banDays > 0) {
      sendNotificationToProvider();
    }

    setIsLoading(false);
  };

  const sendNotificationToProvider = async () => {
    try {
      const serviceResponse = await axios.get(
        `${baseUrl}/service/getServiceById`,
        { params: { id: order.serviceProvider } },
      );
      const serviceProviderId = serviceResponse.data.user;
      if (message.length > 0) {
        await axios.post(`${baseUrl}/notifications/`, {
          title: 'You have received a warning!',
          user: serviceProviderId,
          message: `We have received a warning for your order ${order._id.substr(
            order._id.length - 7,
          )} and admin has this message for you "${message}"`,
        });
      }
      if (banDays > 0) {
        await axios.post(`${baseUrl}/notifications/`, {
          title: `You've been banned!`,
          user: serviceProviderId,
          message: `We have decided to ban your account for ${banDays} days because you violated our policies.`,
        });
        const bannedDate = moment().add(banDays, 'days').format('DD-MMM-YYYY');
        console.log(bannedDate);
        await axios.put(
          `${baseUrl}/service/banServiceById`,
          {
            bannedTill: bannedDate,
          },
          {
            params: { id: order.serviceProvider },
          },
        );
      }
    } catch (error) {
      console.log('Could not send notification: ' + error);
    }
  };

  const sendNotificationToConsumer = async () => {
    // Notification for provider
    try {
      await axios.post(`${baseUrl}/notifications/`, {
        title: 'Our team has resolved your complaint.',
        user: order.serviceConsumer,
        message: `We have resolved your complaint regarding ${order._id}, we will make sure you don't face such issue again in the future.`,
      });
    } catch (error) {
      console.log('Could not send notification: ' + error);
    }
  };

  if (!complaint) {
    <View
      style={{
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Something went wrong</Text>
    </View>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: BACKGROUND_COLOR }}>
      <ScrollView
        style={{
          paddingVertical: responsiveHeight(2),
          paddingHorizontal: responsiveWidth(6),
        }}
        automaticallyAdjustKeyboardInsets={true}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              handleBackButtonClick();
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
              fontSize: responsiveFontSize(3),
              fontWeight: 'bold',
              color: PRIMARY_COLOR,
            }}
          >
            Resolve Complaint
          </Text>
        </View>

        <Text
          style={[styles.textShort, { paddingVertical: responsiveHeight(1) }]}
        >
          <Text style={styles.textEmphasis}>Order ID:</Text>
          {' ' + complaintData.order.substr(complaintData.order.length - 7)}
        </Text>
        <Text
          style={[styles.textNormal, { paddingVertical: responsiveHeight(1) }]}
        >
          <Text style={styles.textEmphasis}>Title:</Text>
          {' ' + complaintData.title}
        </Text>
        <Text
          style={[styles.textNormal, { paddingVertical: responsiveHeight(1) }]}
        >
          <Text style={styles.textEmphasis}>Details:</Text>
          {' ' + complaintData.description}
        </Text>
        <View
          style={{
            paddingVertical: responsiveHeight(1),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={[styles.textShort, styles.textEmphasis]}>
              Order Date:
            </Text>
            <Text style={[styles.textShort]}>{order.orderDate}</Text>
          </View>
          <View>
            <Text style={[styles.textShort, styles.textEmphasis]}>
              Delivery Date:
            </Text>
            <Text style={[styles.textShort]}>{order.deliveryDate}</Text>
          </View>
        </View>

        <Text
          style={[styles.textNormal, { paddingVertical: responsiveHeight(1) }]}
        >
          <Text style={styles.textEmphasis}>Service Provider:</Text>
          {' ' + order.serviceProviderName}
        </Text>

        <Text
          style={[
            styles.textNormal,
            styles.textEmphasis,
            { paddingTop: responsiveHeight(1) },
          ]}
        >
          Message for service provider.
        </Text>
        <TextInput
          value={message}
          placeholder={'Write a note for service provider.'}
          style={{
            borderWidth: 1,
            borderColor: SHADOW_COLOR,
            borderRadius: 8,
            padding: responsiveHeight(1),
            minHeight: responsiveHeight(20),
            textAlign: 'left',
            textAlignVertical: 'top',
            marginVertical: responsiveHeight(1),
          }}
          multiline={true}
          onChangeText={(text) => {
            setMessage(text);
          }}
        />
        <Text
          style={[
            styles.textNormal,
            styles.textEmphasis,
            { paddingTop: responsiveHeight(1) },
          ]}
        >
          Ban service provider
        </Text>
        <TextInput
          placeholder={'How many days you want to ban for?'}
          style={{
            borderWidth: 1,
            borderColor: SHADOW_COLOR,
            borderRadius: 8,
            padding: responsiveHeight(1),
            marginVertical: responsiveHeight(1),
          }}
          keyboardType="numeric"
          value={banDays}
          onChangeText={(text) => {
            let number = Number(text.replace(/[^0-9]/g, ''));
            if (number <= 30) {
              setBanDays(number);
            } else {
              toast.show('You can set a maximum budget of 100000');
            }
          }}
        />

        <Text
          style={[
            styles.textNormal,
            styles.textEmphasis,
            { paddingTop: responsiveHeight(1) },
          ]}
        >
          Issue Resolved?
        </Text>
        <TouchableOpacity
          onPress={() => {
            setIsResolved(!isResolved);
          }}
          style={{
            marginVertical: responsiveHeight(1),
            flexDirection: 'row',
            gap: responsiveWidth(3),
            alignItems: 'center',
          }}
        >
          <Checkbox
            value={isResolved}
            onValueChange={setIsResolved}
            color={isResolved ? PRIMARY_COLOR : '#000'}
          />
          <Text style={styles.textShort}>
            Select this when you want to close the complaint.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleResolveComplaint}
          style={{
            backgroundColor: PRIMARY_COLOR,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: responsiveHeight(7.5),
            marginVertical: responsiveHeight(1),
          }}
        >
          <Text
            style={{
              color: BACKGROUND_COLOR,
              fontSize: responsiveFontSize(2.25),
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
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

export default AdminComplaintResolve;

const styles = StyleSheet.create({
  textShort: {
    fontSize: responsiveFontSize(2),
  },
  textNormal: {
    fontSize: responsiveFontSize(2.25),
  },
  textEmphasis: {
    fontWeight: 'bold',
  },
});
