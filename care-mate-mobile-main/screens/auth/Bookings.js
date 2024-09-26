import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from 'react-native-responsive-dimensions'
import {
    PRIMARY_COLOR,
    TEXT_COLOR,
    SECONDARY_COLOR,
    BACKGROUND_COLOR,
    SHADOW_COLOR
} from '../../constants/Colors'

const Bookings = () => {
    const navigation = useNavigation();
    const navigateToProfileScreen = () => {
        navigation.navigate("ProfileScreen")
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            <View style={{
                flexDirection: 'row',
                //  backgroundColor: 'red', 
                height: responsiveHeight(20)
            }}>

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
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => {
                navigateToProfileScreen();
            }}>
                <Image
                    source={require('../../assets/images/vineeta.jpg')}
                    style={{
                        width: "15%",
                        height: "25%",
                        alignSelf: "center",
                        marginLeft: "77%",
                        top: "-73%"
                    }}
                />
            </TouchableOpacity>




        </View>
    )
}
export default Bookings;