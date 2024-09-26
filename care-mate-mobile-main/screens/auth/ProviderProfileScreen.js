import {View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, FlatList, Modal} from 'react-native';
import {useState, useEffect, useContext, useRef} from 'react';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from 'react-native-responsive-dimensions';
import {
    GestureHandlerRootView
} from 'react-native-gesture-handler';
import {
    PRIMARY_COLOR,
    TEXT_COLOR,
    BACKGROUND_COLOR,
    SHADOW_COLOR,
    SECONDARY_COLOR
} from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Video from 'react-native-video';
import {useNavigation} from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';
import BottomSheet, {BottomSheetView, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {Linking} from 'react-native';

const ProviderProfileScreen = ({route}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const bottomSheetRef = useRef(null);
    const snapPoints = ["25%"];
    const navigation = useNavigation();
    const [rating, setRating] = useState(null);

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

    const [areaName, setAreaName] = useState('');

    useEffect(() => {
        setIsLoading(true);
        if (route.params) {
            setServiceProvider(route.params.serviceProvider);
            console.log(route.params.serviceProvider);
        }

        const fetchAreas = async () => {
            try {
                const response = await axios.get(`${ baseUrl }/area/getArea`);
                response.data.data.forEach((item) => {
                    if (item._id === serviceProvider.area) {
                        setAreaName(item.name);
                    }
                });
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };

        const fetchOrdersRating = async () => {
            try {
                const response = await axios.get(`${ baseUrl }/order/getOrdersByServiceProvider`, {
                    params: {
                        user: serviceProvider._id
                    }
                });
                let count = 0;
                let score = 0;
                response.data.forEach((order) => {
                    if (order.hasReceivedFeedback > 0) {
                        count++;
                        score = score + order.hasReceivedFeedback;
                    }
                });
                if (score > 0) {
                    const tempRating = score / count;
                    setRating(tempRating);
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchAreas();
        if (serviceProvider._id) {
            fetchOrdersRating();
        }
    }, [route, serviceProvider]);

    const handleBook = async () => {
        if (serviceProvider.durationType === 'once') {
            handleOneTimeBooking();
        } else {
            setIsBottomSheetOpen(true);
        }
    };

    const handleOneTimeBooking = async () => {
        navigation.navigate("Makebooking", {serviceProvider, isMonthly: false});
    };
    const handleMonthlyBooking = async () => {
        navigation.navigate("Makebooking", {serviceProvider, isMonthly: true});
    };

    return (
        <GestureHandlerRootView style={{flex: 1, backgroundColor: isBottomSheetOpen ? '#000' : BACKGROUND_COLOR}}>
            <BottomSheetModalProvider>
                <ScrollView style={[styles.mainContainer, {opacity: isBottomSheetOpen ? 0.25 : 1, }]}>
                    <View style={{justifyContent: 'center', alignItems: 'center', gap: responsiveHeight(1), paddingVertical: responsiveHeight(2)}}>
                        <Image
                            height={responsiveHeight(15)}
                            width={responsiveHeight(15)}
                            source={{uri: 'https://cdn-icons-png.freepik.com/512/3607/3607444.png'}} />
                        <Text style={{fontSize: responsiveFontSize(4), color: PRIMARY_COLOR, fontWeight: 'bold'}}>{serviceProvider.providerName}</Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: responsiveWidth(2), paddingVertical: responsiveHeight(1), alignItems: 'center'}}>
                        <Text style={styles.fieldLabel}>
                            Service Type:
                        </Text>

                        <Text style={styles.fieldValue}>
                            {serviceProvider.title}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', gap: responsiveWidth(2)}}>
                        <View style={{flexDirection: 'row', gap: responsiveWidth(2), paddingVertical: responsiveHeight(1), alignItems: 'center'}}>
                            <Text style={styles.fieldLabel}>
                                Gender
                            </Text>

                            <Text style={styles.fieldValue}>
                                {serviceProvider.gender}
                            </Text>
                        </View>
                        <View style={{flexDirection: 'row', gap: responsiveWidth(2), paddingVertical: responsiveHeight(1), alignItems: 'center'}}>
                            <Text style={styles.fieldLabel}>
                                Age:
                            </Text>

                            <Text style={styles.fieldValue}>
                                {serviceProvider.age}
                            </Text>
                        </View>
                    </View>

                    <View style={{gap: responsiveHeight(0.5), paddingVertical: responsiveHeight(1)}}>
                        <Text style={styles.fieldLabel}>
                            Description:
                        </Text>

                        <Text style={styles.fieldValue}>
                            {serviceProvider.description}
                        </Text>
                    </View>

                    <View style={{flexDirection: 'row', gap: responsiveWidth(2), paddingVertical: responsiveHeight(1), alignItems: 'center'}}>
                        <Text style={styles.fieldLabel}>
                            Approximate Cost:
                        </Text>

                        <Text style={styles.fieldValue}>
                            {serviceProvider.budget}rs
                        </Text>
                    </View>
                    {
                        serviceProvider.durationType === 'both' ? (<View style={{flexDirection: 'row', gap: responsiveWidth(2), paddingVertical: responsiveHeight(1), alignItems: 'center'}}>
                            <Text style={styles.fieldLabel}>
                                Approximate Monthly Cost:
                            </Text>

                            <Text style={styles.fieldValue}>
                                {serviceProvider.monthlyBudget}rs
                            </Text>
                        </View>) : null
                    }
                    <View style={{gap: responsiveHeight(0.5), paddingVertical: responsiveHeight(1)}}>
                        <Text style={styles.fieldLabel}>
                            Contact:
                        </Text>
                        <Text style={styles.fieldValue}>
                            {serviceProvider.phoneNumber} - {serviceProvider.emailAddress}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: responsiveWidth(2), paddingVertical: responsiveHeight(1), alignItems: 'center'}}>
                        <Text style={styles.fieldLabel}>
                            Area of service:
                        </Text>
                        <Text style={styles.fieldValue}>
                            {areaName}
                        </Text>
                    </View>
                    <View style={{gap: responsiveHeight(0.5), paddingVertical: responsiveHeight(1), }}>
                        <Text style={styles.fieldLabel}>
                            Availability:
                        </Text>
                        <Text style={[styles.fieldValue, {flexWrap: 'wrap'}]}>
                            {serviceProvider.durationType === 'both' ? 'Available for one time and monthly gigs' : 'Only available for one time jobs'}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: responsiveWidth(2), paddingVertical: responsiveHeight(1), alignItems: 'center'}}>
                        <Text style={styles.fieldLabel}>
                            Rating:
                        </Text>
                        <Text style={styles.fieldValue}>
                            {rating ? rating : 'No Reviews yet'}
                        </Text>
                        <MaterialIcons name='star' size={responsiveHeight(2.5)} color={'orange'} />
                    </View>
                    <View style={{flexDirection: 'row', gap: responsiveWidth(2), paddingVertical: responsiveHeight(1), alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            handleBook();
                        }} style={{backgroundColor: PRIMARY_COLOR, width: '100%', padding: responsiveHeight(2), justifyContent: 'center', borderRadius: 8}}>
                            <Text style={{color: BACKGROUND_COLOR, textAlign: 'center'}}>
                                Book
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{position: 'absolute', right: 0, top: 0}}
                        onPress={() => {
                            console.log(serviceProvider);
                            Linking.openURL(`tel:${ serviceProvider.phoneNumber }`);
                        }}
                    >
                        <MaterialIcons color={'green'} size={responsiveWidth(8)} name={'phone'} />
                    </TouchableOpacity>
                </ScrollView>
                {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator
                        size="large" color={BACKGROUND_COLOR}
                    />
                </View> : <></>}
                {
                    isBottomSheetOpen ? <BottomSheet
                        ref={bottomSheetRef}
                        snapPoints={snapPoints}
                        enablePanDownToClose={true}
                        onClose={() => {setIsBottomSheetOpen(false);}}
                    >
                        <BottomSheetView style={{flex: 1, justifyContent: 'center'}}>
                            <View style={{paddingHorizontal: responsiveWidth(4), gap: responsiveHeight(2), alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity
                                    onPress={handleMonthlyBooking}
                                    style={{height: responsiveHeight(6), width: '100%', borderRadius: 8, backgroundColor: PRIMARY_COLOR, color: BACKGROUND_COLOR, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: BACKGROUND_COLOR, fontSize: responsiveFontSize(2)}}>
                                        Book monthly
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleOneTimeBooking}
                                    style={{height: responsiveHeight(6), width: '100%', borderRadius: 8, backgroundColor: PRIMARY_COLOR, color: BACKGROUND_COLOR, justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={{color: BACKGROUND_COLOR, fontSize: responsiveFontSize(2)}}>
                                        Book Once
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </BottomSheetView>
                    </BottomSheet> : null
                }
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BACKGROUND_COLOR,
        flex: 1,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(6),
    },
    fieldLabel: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2.25),
    },
    fieldValue: {
        fontSize: responsiveFontSize(2),
        color: TEXT_COLOR
    },
});

export default ProviderProfileScreen;