import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { BACKGROUND_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../../constants/Colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { useNavigation } from '@react-navigation/native'


const NoResultsscreen = () => {
    const navigation = useNavigation();


    const navigateToHomeScreen = () => {
        navigation.navigate("Main")
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: TEXT_COLOR,


        }}>
            <View style={styles.animationContainer} >
                <LottieView style={{
                    width: "80%",
                    height: "100%"
                }} source={require('../../assets/animations/no-results-found.json')} autoPlay />
                <Text style={styles.TextContainer}>No Results Found :( </Text>
                <TouchableOpacity onPress={() => {
                    navigateToHomeScreen();
                }}>
                    <Text style={styles.Text1Container}>Try again </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    animationContainer: {
        width: responsiveWidth(80),
        height: responsiveHeight(90),
        alignItems: 'center',
        alignSelf: 'center',
        top: responsiveHeight(40)


    },

    TextContainer: {
        fontSize: responsiveFontSize(4),
        fontWeight: 'bold',
        color: BACKGROUND_COLOR,
        top: responsiveHeight(-90),
        alignSelf: 'center'
    },
    Text1Container: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        alignSelf: 'center',
        top: responsiveHeight(-90)
    }

})

export default NoResultsscreen;
