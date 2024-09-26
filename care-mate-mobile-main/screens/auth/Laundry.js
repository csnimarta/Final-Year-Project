import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from 'react-native-responsive-dimensions'
import LottieView from 'lottie-react-native'
import {
    PRIMARY_COLOR,
    TEXT_COLOR,
    BACKGROUND_COLOR,
    SHADOW_COLOR,
    SECONDARY_COLOR
} from '../../constants/Colors'




const Laundry = () => {
    const navigation = useNavigation();
    const navigateToProfileScreen = () => {
        navigation.navigate("ProfileScreen")
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#fff"
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
                    <TouchableOpacity onPress={() => {
                        navigateToProfileScreen();
                    }}>
                        <Image
                            source={require('../../assets/images/vineeta.jpg')}
                            style={{
                                width: "20%",
                                height: "50%",
                                alignSelf: "center",
                                marginLeft: "92%"


                            }}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View style={{
                flexDirection: 'row',
                // backgroundColor: 'red',
                width: responsiveWidth(95),
                height: responsiveHeight(8),
                top: responsiveHeight(-6)
            }}>
                <Text style={styles.Text}>Laundry Service Providers</Text>
                <LottieView style={{
                    height: "130%",
                    width: "70%",
                    top: responsiveHeight(-3)
                }} source={require('../../assets/animations/cloths.json')} autoPlay
                    loop={true}
                />
            </View>
            <View style={styles.scrollviewContainer}>
                <ScrollView
                    style={{
                        height: "100%",
                        width: "100%",
                    }}>

                    <View style={styles.scrollContainer}>
                        <View style={styles.Container}>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/images/vineeta.jpg')}
                                    style={{
                                        width: responsiveWidth(30),
                                        height: responsiveHeight(12),
                                        top: responsiveHeight(4),
                                        flexDirection: 'row'
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                // backgroundColor: 'green',
                                alignSelf: 'center',
                                flexDirection: 'column',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                width: responsiveWidth(65),
                                height: responsiveHeight(30),
                                justifyContent: 'space-evenly',
                            }}>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Name : </Text>Payal</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Gender : </Text>Female</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Age : </Text>22</Text>
                                    <Text style={styles.detailsText}> <Text style={styles.boldText}>Phone number : </Text>1234567890</Text>
                                </View>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Service type : </Text>Laundry</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Area : </Text>Shara-e-Faisal</Text>


                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Amount :</Text> 10$</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Working days : </Text>Mon-Sat</Text>

                                </View>

                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.scrollContainer}>
                        <View style={styles.Container}>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/images/vineeta.jpg')}
                                    style={{
                                        width: responsiveWidth(30),
                                        height: responsiveHeight(12),
                                        top: responsiveHeight(4),
                                        flexDirection: 'row'
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                // backgroundColor: 'green',
                                alignSelf: 'center',
                                flexDirection: 'column',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                width: responsiveWidth(65),
                                height: responsiveHeight(30),
                                justifyContent: 'space-evenly',
                            }}>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Name : </Text>Payal</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Gender : </Text>Female</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Age : </Text>22</Text>
                                    <Text style={styles.detailsText}> <Text style={styles.boldText}>Phone number : </Text>1234567890</Text>
                                </View>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Service type : </Text>Laundry</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Area : </Text>Shara-e-Faisal</Text>


                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Amount :</Text> 10$</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Working days : </Text>Mon-Sat</Text>

                                </View>

                            </TouchableOpacity>
                        </View>

                    </View>



                    <View style={styles.scrollContainer}>
                        <View style={styles.Container}>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/images/vineeta.jpg')}
                                    style={{
                                        width: responsiveWidth(30),
                                        height: responsiveHeight(12),
                                        top: responsiveHeight(4),
                                        flexDirection: 'row'
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                // backgroundColor: 'green',
                                alignSelf: 'center',
                                flexDirection: 'column',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                width: responsiveWidth(65),
                                height: responsiveHeight(30),
                                justifyContent: 'space-evenly',
                            }}>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Name : </Text>Payal</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Gender : </Text>Female</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Age : </Text>22</Text>
                                    <Text style={styles.detailsText}> <Text style={styles.boldText}>Phone number : </Text>1234567890</Text>
                                </View>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Service type : </Text>Laundry</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Area : </Text>Shara-e-Faisal</Text>


                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Amount :</Text> 10$</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Working days : </Text>Mon-Sat</Text>

                                </View>

                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={styles.scrollContainer}>
                        <View style={styles.Container}>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/images/vineeta.jpg')}
                                    style={{
                                        width: responsiveWidth(30),
                                        height: responsiveHeight(12),
                                        top: responsiveHeight(4),
                                        flexDirection: 'row'
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                // backgroundColor: 'green',
                                alignSelf: 'center',
                                flexDirection: 'column',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                width: responsiveWidth(65),
                                height: responsiveHeight(30),
                                justifyContent: 'space-evenly',
                            }}>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Name : </Text>Payal</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Gender : </Text>Female</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Age : </Text>22</Text>
                                    <Text style={styles.detailsText}> <Text style={styles.boldText}>Phone number : </Text>1234567890</Text>
                                </View>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Service type : </Text>Laundry</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Area : </Text>Shara-e-Faisal</Text>


                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Amount :</Text> 10$</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Working days : </Text>Mon-Sat</Text>

                                </View>

                            </TouchableOpacity>
                        </View>

                    </View>


                    <View style={styles.scrollContainer}>
                        <View style={styles.Container}>
                            <TouchableOpacity>
                                <Image
                                    source={require('../../assets/images/vineeta.jpg')}
                                    style={{
                                        width: responsiveWidth(30),
                                        height: responsiveHeight(12),
                                        top: responsiveHeight(4),
                                        flexDirection: 'row'
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                // backgroundColor: 'green',
                                alignSelf: 'center',
                                flexDirection: 'column',
                                // justifyContent: 'center',
                                alignItems: 'center',
                                width: responsiveWidth(65),
                                height: responsiveHeight(30),
                                justifyContent: 'space-evenly',
                            }}>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Name : </Text>Payal</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Gender : </Text>Female</Text>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Age : </Text>22</Text>
                                    <Text style={styles.detailsText}> <Text style={styles.boldText}>Phone number : </Text>1234567890</Text>
                                </View>

                                <View style={styles.detailsContainer}>
                                    <Text style={styles.detailsText}><Text style={styles.boldText}>Service type : </Text>Laundry</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Area : </Text>Shara-e-Faisal</Text>


                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Amount :</Text> 10$</Text>

                                    <Text style={styles.detailsText}>
                                        <Text style={styles.boldText}>Working days : </Text>Mon-Sat</Text>

                                </View>

                            </TouchableOpacity>
                        </View>

                    </View>





                </ScrollView>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    Text: {
        fontSize: responsiveFontSize(2),
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginLeft: responsiveHeight(2)
    },
    scrollviewContainer: {
        top: responsiveHeight(-2),
        height: responsiveHeight(80),
    },
    scrollContainer: {
        width: responsiveWidth(95),
        flex: 1,
        // backgroundColor: 'red',
        alignSelf: 'center',
        shadowColor: "#000000",
        justifyContent: 'space-evenly',

        minHeight: responsiveHeight(30),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: responsiveHeight(2),
        top: responsiveHeight(3),
        marginBottom: responsiveHeight(11),
    },
    Container: {
        height: responsiveHeight(20),
        flexDirection: 'row'
    },
    detailsContainer: {
        width: responsiveWidth(60),
        height: responsiveHeight(13),
        justifyContent: 'space-evenly',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 2.5,
        backgroundColor: "#fff",
        borderRadius: responsiveHeight(2),
    },
    detailsText: {
        color: PRIMARY_COLOR,
        marginRight: responsiveHeight(5),
        marginLeft: responsiveHeight(2),
        fontSize: responsiveFontSize(1.7),
    },
    boldText: {
        fontWeight: 'bold'
    }


})

export default Laundry;