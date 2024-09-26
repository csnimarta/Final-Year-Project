import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { PRIMARY_COLOR, TEXT_COLOR } from '../../constants/Colors';
import LottieView from 'lottie-react-native';
import StarRating from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native';



const ComplaintSuccessful = ({ route }) => {
    const { message, complaintDetails } = route.params;
    const [rating, setRating] = useState(0);
    const navigation = useNavigation();

    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1
        }}>
            {/* <StarRating
                disabled={false}
                maxStars={5}
                starSize={30}
                fullStarColor={PRIMARY_COLOR}
                emptyStarColor={TEXT_COLOR}
                rating={rating}
              onChange={(rating) => setRating(rating)}
            /> */}

            <Text style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: 'bold',
                color: PRIMARY_COLOR,
                alignSelf: 'center',
                paddingVertical: responsiveHeight(3)
            }}>{message}</Text>

            <View style={{
                // backgroundColor: "red",
                width: responsiveWidth(60),
                height: responsiveHeight(30),
                paddingVertical: responsiveHeight(3),
                alignSelf: 'center'
            }}>
                <LottieView
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                    source={require('../../assets/animations/partypopper.json')}
                    autoPlay={true}
                />
            </View>


            <Text style={{
                fontSize: responsiveFontSize(2),
                color: TEXT_COLOR,
                alignSelf: 'center',
                paddingHorizontal: responsiveHeight(5),

            }}>{}</Text>

            <Text style={styles.Text}>Would you like to rate your experience?</Text>

        </View>
    )
}
const styles = StyleSheet.create({
    Text: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: TEXT_COLOR,
        alignSelf: 'center',
        paddingVertical: responsiveHeight(5)
    }

})
export default ComplaintSuccessful