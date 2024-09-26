import {StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';
// import {Safepay} from '@sfpy/node-sdk';


const CardPaymentScreen = ({route}) => {

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (route.params) {
      setOrderData(route.params.orderData);
      console.log(orderData.cost);
    }
  }, []);

  // const safepay = new Safepay({
  //   environment: 'sandbox',
  //   apiKey: 'sec_asd12-2342s-1231s',
  //   v1Secret: 'bar',
  //   webhookSecret: 'foo'
  // });

  // const {token} = await safepay.payments.create({
  //   currency: "PKR",
  //   amount: 1000
  // });
  const handlePayment = () => {
    // const url = safepay.checkout.create({
    //   token,
    //   orderId: 'T800',
    //   cancelUrl: 'http://example.com/cancel',
    //   redirectUrl: 'http://example.com/success',
    //   source: 'custom',
    //   webhooks: true
    // });
    // console.log(url);
  };

  return (
    <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR, paddingHorizontal: responsiveWidth(6), paddingVertical: responsiveHeight(2)}}>

      <Text style={{fontSize: responsiveFontSize(3.5), fontWeight: 'bold', color: PRIMARY_COLOR}}>
        Online Payment
      </Text>

      <View style={{paddingVertical: responsiveHeight(2), gap: responsiveHeight(2)}}>
        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Card Number
          </Text>
          <TextInput
            placeholder={'XXXX XXXX XXXX XXXX'}
            keyboardType='numeric'
            value={cardNumber}
            onChangeText={text => {
              let number = text.replace(/[^0-9]/g, '');
              if (number.length <= 16) {
                setCardNumber(number.replace(/\d{4}(?=.)/g, '$& '));
              }
            }}
            style={styles.inputBox} />
        </View>


        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Card Holder Name
          </Text>
          <TextInput
            placeholder={'John Doe'}
            value={cardHolderName}
            onChangeText={text => {
              setCardHolderName(text);
            }}
            style={styles.inputBox} />
        </View>

        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Expiry Date
          </Text>
          <TextInput
            placeholder={'MM/YY'}
            keyboardType='numeric'
            value={cardExpiryDate}
            onChangeText={text => {
              let number = text.replace(/[^0-9]/g, '');
              if (number.length <= 5) {
                setCardExpiryDate(number.replace(/\d{2}(?=.)/g, '$&/'));
              }
            }}
            style={[styles.inputBox, {width: '25%', textAlign: 'center'}]} />
        </View>

        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            CVV
          </Text>
          <View style={{flexDirection: 'row', gap: responsiveWidth(3), textAlign: 'center'}}>
            <TextInput
              placeholder={'XYZ'}
              keyboardType='numeric'
              value={cvv}
              onChangeText={text => {
                let number = text.replace(/[^0-9]/g, '');
                if (number.length <= 3) {
                  setCvv(number);
                }
              }}
              style={[styles.inputBox, {width: '25%', textAlign: 'center'}]} />
            <Text style={{flex: 1, fontSize: responsiveFontSize(1.3), color: 'gray', textAlignVertical: 'center'}}>
              The CVV is a 3-digit number located on the back of your card, usually to the right of the signature strip.
            </Text>
          </View>
        </View>


        <View style={{gap: responsiveHeight(1)}}>
          <Text style={styles.inputLabel}>
            Amount
          </Text>
          <TextInput
            value={orderData ? orderData.cost.toString() : ''}
            editable={false} selectTextOnFocus={false}
            keyboardType='numeric'
            style={[styles.inputBox, {color: '#000'}]} />
        </View>


      </View>

      <Text style={{fontSize: responsiveFontSize(1.8), borderRadius: 8, padding: responsiveHeight(1.5), backgroundColor: '#F0F0F0', color: 'gray', marginVertical: responsiveHeight(1), fontWeight: 'bold'}}>
        Please be assured that your payment is secure with us. If you encounter any problems with our service at any point, you may be eligible for a full or partial refund, provided you present valid reasons.
      </Text>

      <View style={{flex: 1, justifyContent: 'flex-end', paddingVertical: responsiveHeight(2)}}>
        <TouchableOpacity
          onPress={() => {handlePayment();}}
          style={{backgroundColor: PRIMARY_COLOR, padding: responsiveHeight(1.5), borderRadius: 8}}>
          <Text style={{color: BACKGROUND_COLOR, textAlign: 'center', fontSize: responsiveFontSize(2.5)}}>
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardPaymentScreen;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: '#F0F0F0',
    height: responsiveHeight(6),
    color: 'gray',
    padding: responsiveWidth(3),
    fontSize: responsiveFontSize(2.125),
    borderRadius: 4
  },
  inputLabel: {
    fontSize: responsiveFontSize(2.125),
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
});