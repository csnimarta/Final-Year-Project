import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
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
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {useToast} from "react-native-toast-notifications";

const Makebooking = ({route}) => {
  const toast = useToast();

  const [images, setImages] = useState([
    require('../../assets/images/housecleaner.jpeg'),
    require('../../assets/images/image-cook.jpg'),
    require('../../assets/images/image-laundry.jpg'),
  ]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: null,
    time: null,
  });
  const [selected, setSelected] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMonthly, setIsMonthly] = useState(false);
  const [serviceProvider, setServiceProvider] = useState({
    title: "",
    budget: "",
    isAvailable: false,
    description: "",
    category: "",
    _id: "",
    monthlyBudget: "",
    durationType: "",
    area: "",
    gender: "",
    age: "",
    providerName: "",
    phoneNumber: ""
  });

  useEffect(() => {

    if (selectedDateTime.date) {
      generateTimeSlots(selectedDateTime.date);
    }
    if (route.params) {
      setIsMonthly(route.params.isMonthly);
      setServiceProvider(route.params.serviceProvider);
    }
  }, [selectedDateTime.date]);

  var now = moment();
  var hourToCheck = (now.day() !== 0) ? 16 : 15;
  var dateToCheck = now.hour(hourToCheck).minute(30);

  const navigation = useNavigation();

  const navigateToProfileScreen = () => {
    navigation.navigate('ProfileScreen');
  };

  const generateTimeSlots = (selectedDate) => {
    console.log(selectedDate);

    // Get the current date and time
    const currentDateTime = new Date();

    console.log(`${ moment().diff(selectedDate, 'days') > 0 ? currentDateTime.getHours() : 9
      }`);

    // Set the start time for the slots (you can adjust this as needed)
    const startTime = new Date(
      currentDateTime.getFullYear(),
      currentDateTime.getMonth(),
      currentDateTime.getDate(),
      9,
      0,
    ); // Assuming 9:00 AM as the start time

    // Set the end time to midnight of the next day
    const nextDay = new Date(currentDateTime);
    nextDay.setDate(nextDay.getDate() + 1);
    const endTime = new Date(
      nextDay.getFullYear(),
      nextDay.getMonth(),
      nextDay.getDate(),
      -5,
      0,
    );

    // Generate time slots with a 30-minute difference
    const slots = [];
    let currentSlot = new Date(startTime);

    while (currentSlot < endTime) {
      // Format the current slot as "HH:MM AM/PM" and push it to the array
      slots.push(
        currentSlot.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }),
      );

      // Increment the current slot by 30 minutes
      currentSlot.setMinutes(currentSlot.getMinutes() + 30);
    }

    // Update the state with the generated time slots
    setTimeSlots(slots);
  };
  const onDayPress = day => {
    const selectedDate = day.dateString;
    setSelectedDateTime({...selectedDateTime, date: selectedDate});
  };

  const onTimeSlotPress = timeSlot => {
    setSelectedDateTime({...selectedDateTime, time: timeSlot});
  };

  const confirmBooking = () => {
    if (selectedDateTime.date && selectedDateTime.time) {
      navigation.navigate("OrderConfirmationScreen", {serviceProvider, selectedDateTime, isMonthly});
    } else {
      console.log('Please select both date and time');
      toast.show("Please select both date and time");
    }
  };
  const closeModal = () => {
    setShowConfirmation(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/arrow-back.png')}
            style={{
              width: responsiveWidth(8),
              height: responsiveHeight(2),
              tintColor: PRIMARY_COLOR,
              marginLeft: responsiveHeight(3),
            }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: responsiveWidth(95),
          // backgroundColor: 'red',
          alignItems: 'center',
          alignSelf: 'center',
          paddingBottom: responsiveHeight(5)
        }}>
        <Text style={styles.detailsText}>Book Your Service</Text>
      </View>
      <View
        style={{
          //backgroundColor: 'red',
          width: responsiveWidth(80),
          alignSelf: 'center',
        }}>
        <Text style={styles.detailsText2}>Select Day & Date</Text>
        <Calendar
          initialDate={
            moment().isAfter(dateToCheck) ?
              moment().add(1, 'days').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
          }
          style={{backgroundColor: '#fff'}}
          current={
            moment().isAfter(dateToCheck) ?
              moment().add(1, 'days').format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
          }
          onDayPress={onDayPress}
          maxDate={moment().add(7, 'days').format('YYYY-MM-DD')}
          minDate={
            moment().add(1, 'days').format('YYYY-MM-DD')
          }
          enableSwipeMonths={true}
          markedDates={{
            [selectedDateTime?.date]: {
              selected: true,
              disableTouchEvent: true,
              selectedColor: PRIMARY_COLOR,
            },
          }}
        />
        <View
          style={{
            //   backgroundColor: 'red',
            width: '90%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: responsiveFontSize(2),
              fontWeight: 'bold',
              color: PRIMARY_COLOR,
              paddingTop: responsiveHeight(2)
            }}>
            Select Time Slot
          </Text>
        </View>
        <View style={styles.scrollviewContainer}>
          <ScrollView horizontal style={styles.scrollView}>
            {timeSlots.map((timeSlot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.scrollContainer,
                  selected === timeSlot
                    ? {
                      backgroundColor: PRIMARY_COLOR,
                      shadowColor: 'transparent',
                    }
                    : {backgroundColor: SHADOW_COLOR},
                ]}
                onPress={() => {
                  setSelected(timeSlot);
                  setSelectedSlot(timeSlot);
                  onTimeSlotPress(timeSlot); // Call onTimeSlotPress when a time slot is selected
                }}>
                <Text
                  style={[
                    styles.timeSlotText,
                    selected === timeSlot && {color: BACKGROUND_COLOR},
                  ]}>
                  {timeSlot}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.Button, {backgroundColor: selectedDateTime.date && selectedDateTime.time ? PRIMARY_COLOR : 'gray', marginTop: responsiveHeight(2.5)}]}
          onPress={confirmBooking}>
          <Text style={styles.ButtonText}>Book Slot</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showConfirmation}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Details!</Text>
              <Text style={{color: TEXT_COLOR}}>
                Date: {selectedDateTime.date}
              </Text>
              <Text style={{color: TEXT_COLOR}}>
                Time: {selectedDateTime.time}
              </Text>

              <TouchableOpacity onPress={closeModal} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsText: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    alignSelf: 'center',
    // backgroundColor: 'red'
  },

  detailsText2: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2),
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
  subheadingText: {
    color: SHADOW_COLOR,
    fontSize: responsiveFontSize(1.5),
  },
  scrollviewContainer: {
    height: responsiveHeight(10)
    //backgroundColor: 'red'
  },
  scrollContainer: {
    width: responsiveWidth(25),
    flex: 1,
    backgroundColor: 'red',
    alignSelf: 'center',
    shadowColor: '#000000',
    justifyContent: 'space-evenly',
    minHeight: responsiveHeight(6),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.17,
    shadowRadius: 2.54,
    elevation: 3,
    backgroundColor: SHADOW_COLOR,
    borderRadius: responsiveHeight(2),
    marginLeft: responsiveHeight(2),
    marginRight: responsiveHeight(2),
  },
  Container: {
    //  backgroundColor: 'red',
    // flexDirection: 'row',
  },
  timeSlotText: {
    color: PRIMARY_COLOR,
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Button: {
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveHeight(5),
    width: responsiveWidth(50),
    height: responsiveHeight(8),
    alignSelf: 'center',
  },
  ButtonText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    alignSelf: 'center',
    color: BACKGROUND_COLOR,
  },
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: responsiveWidth(70),
    height: responsiveHeight(30),
    padding: 60,
    borderRadius: responsiveHeight(3),
    alignItems: 'center',
  },
  modalText: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    marginBottom: 10,
    color: PRIMARY_COLOR,
  },
  modalButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 15,
    borderRadius: responsiveHeight(7),
    width: responsiveWidth(20),
    alignItems: 'center',
  },
  modalButtonText: {
    color: BACKGROUND_COLOR,
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
});

export default Makebooking;
