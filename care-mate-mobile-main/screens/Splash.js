import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {BACKGROUND_COLOR, PRIMARY_COLOR, SECONDARY_COLOR, SHADOW_COLOR, TEXT_COLOR} from "../constants/Colors";

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import UserContext from './../context/UserProvider';


const Splash = ({navigation}) => {

    const {user} = React.useContext(UserContext);
    const [isLoading, setIsLoading] = React.useState(false);

    useEffect(() => {
        if (user.role === 'CONSUMER') {
            if (navigation.canGoBack()) {
                navigation.popToTop();
            }
            navigation.navigate("Main");
        } else if (user.role === 'SERVICE_PROVIDER') {
            if (navigation.canGoBack()) {
                navigation.popToTop();
            }
            navigation.navigate("ProviderHomeScreen");
        } else {
            navigation.navigate("Welcome");
        }
    }, [user]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: BACKGROUND_COLOR,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.image}
                    source={require("../assets/images/logo-v2.png")}
                />
            </View>
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    logoContainer: {
        width: responsiveWidth(90),
        height: responsiveHeight(30),
        borderColor: SHADOW_COLOR,
        top: responsiveHeight(-8)
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
    }
});