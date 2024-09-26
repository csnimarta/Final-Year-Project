import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native'
import {
    responsiveFontSize,
    responsiveWidth,
    responsiveHeight
} from 'react-native-responsive-dimensions'

import {
    PRIMARY_COLOR,
    SHADOW_COLOR,
    SECONDARY_COLOR,
    TEXT_COLOR,
    BACKGROUND_COLOR
} from '../../constants/Colors'
import React from 'react'


const Termsandprivacy = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff"
        }}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../assets/images/arrow-back.png')}
                        style={{
                            width: responsiveWidth(8),
                            height: responsiveHeight(2),
                            tintColor: PRIMARY_COLOR,
                            top: responsiveHeight(2),
                            marginLeft: responsiveHeight(3)


                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{
                top: responsiveHeight(3),
            }}>
                <Text style={styles.TextContainer}>Terms and Privacy Policies</Text>

            </View>
            <View style={styles.viewContainer}>
                <ScrollView style={{
                    width: "100%",
                    height: "100%",
                    // flex: 1
                }}>
                    <View>
                        <Text style={styles.TextContainer2}>Privacy Policy</Text>
                        <Text style={styles.TextContainer3}>General Terms
                            By accessing and placing an order with UI Design, you confirm that you are in agreement with and bound by the terms and conditions contained in the Terms Of Use outlined below.
                            These terms apply to the entire website and any email or other type of communication between you and UI Design.
                        </Text>


                        <Text style={styles.TextContainer3}>
                            Regular License: Single Application License
                            Your use of the item is restricted to a single installation.
                            The item may not be redistributed or resold.
                        </Text>



                        <Text style={styles.TextContainer2}>Support</Text>
                        <Text style={styles.TextContainer3}>
                            We do, however offer support for errors and bugs pertaining to the templates.
                            We are also happy to walk customers through the template structure and answer any support queries in that regard.
                        </Text>


                        <Text style={styles.TextContainer2}>Security</Text>
                        <Text style={styles.TextContainer3}>
                            UI Design does not process any order payments through the website.
                            All payments are processed securely through PayPal, a third party online payment provider.
                        </Text>


                        <Text style={styles.TextContainer2}>Ownership</Text>
                        <Text style={styles.TextContainer3}>
                            UI Design does not process any order payments through the website.
                            All payments are processed securely through PayPal, a third party online payment provider.
                        </Text>


                        <Text style={styles.TextContainer2}>Terms and Conditions</Text>
                        <Text style={styles.TextContainer3}>
                            UI Design does not process any order payments through the website.
                            All payments are processed securely through PayPal, a third party online payment provider.
                        </Text>

                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    TextContainer: {
        color: PRIMARY_COLOR,
        fontSize: responsiveFontSize(2.5),
        alignSelf: 'center',
        fontWeight: 'bold',
    },

    TextContainer2: {
        color: TEXT_COLOR,
        fontSize: responsiveFontSize(2.5),
        // alignSelf: 'center',
        fontWeight: 'bold',
        marginLeft: responsiveHeight(2),
        marginVertical: responsiveHeight(2)
    },
    viewContainer: {
        top: responsiveHeight(5),
        marginBottom: responsiveHeight(11),
        justifyContent: 'center',

    },
    TextContainer3: {
        color: TEXT_COLOR,
        fontSize: responsiveFontSize(2),
        marginLeft: responsiveHeight(2)
        //justifyContent: 'center',

    }
})
export default Termsandprivacy;
