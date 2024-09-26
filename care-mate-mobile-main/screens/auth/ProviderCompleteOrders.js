import {StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
    PRIMARY_COLOR,
    TEXT_COLOR,
    BACKGROUND_COLOR,
    SHADOW_COLOR,
    SECONDARY_COLOR,
} from '../../constants/Colors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SlideButton from 'rn-slide-button';
import {baseUrl} from '../../IPConfig';
import axios from 'axios';
import HappyIcon from '../../assets/images/rating-icon-happy.svg';
import SmileIcon from '../../assets/images/rating-icon-smile.svg';
import SadIcon from '../../assets/images/rating-icon-sad.svg';
import AngryIcon from '../../assets/images/rating-icon-angry.svg';
import NeutralIcon from '../../assets/images/rating-icon-neutral.svg';


const ProviderCompleteOrders = ({route}) => {


    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (route.params) {
            setOrders(route.params.completeOrders);
        }
    }, [route]);

    const getFeedbackIcon = (rating) => {
        console.log(rating);
        if (rating === 1) {
            return (<TouchableOpacity
                style={{
                    backgroundColor: '#e63946',
                    padding: responsiveHeight(0.75), borderRadius: 100
                }}
            >
                <AngryIcon height={responsiveWidth(5)} width={responsiveWidth(5)} />
            </TouchableOpacity>);
        } else if (rating === 2) {
            return (<TouchableOpacity
                style={{
                    backgroundColor: '#f7b801',
                    padding: responsiveHeight(0.75), borderRadius: 100
                }}
            >
                <SadIcon height={responsiveWidth(5)} width={responsiveWidth(5)} />
            </TouchableOpacity>);
        } else if (rating === 3) {
            return (<TouchableOpacity
                style={{
                    backgroundColor: '#6c757d',
                    padding: responsiveHeight(0.75), borderRadius: 100
                }}
            >
                <NeutralIcon height={responsiveWidth(5)} width={responsiveWidth(5)} />
            </TouchableOpacity>);
        } else if (rating === 4) {
            return (<TouchableOpacity
                style={{
                    backgroundColor: '#a7c957',
                    padding: responsiveHeight(0.75), borderRadius: 100
                }}
            >
                <SmileIcon height={responsiveWidth(5)} width={responsiveWidth(5)} />
            </TouchableOpacity>);
        } else if (rating === 5) {
            return (<TouchableOpacity
                style={{
                    backgroundColor: '#386641',
                    padding: responsiveHeight(0.75), borderRadius: 100
                }}
            >
                <HappyIcon height={responsiveWidth(5)} width={responsiveWidth(5)} />
            </TouchableOpacity>);
        }

    };

    return (
        <GestureHandlerRootView style={styles.mainContainer}>
            <ScrollView>

                <Text style={{
                    color: PRIMARY_COLOR,
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: 'bold',
                    paddingHorizontal: responsiveWidth(6),
                    paddingVertical: responsiveHeight(3)
                }}>Orders in queue</Text>

                <View style={{
                    paddingHorizontal: responsiveWidth(6),
                }}>

                    {orders.length > 0 ? <></> : <Text style={{paddingVertical: responsiveHeight(2), fontSize: responsiveFontSize(2), textAlign: 'center', flex: 1}}>
                        No orders in queue. :)
                    </Text>}

                    {orders.map((order, index) => {
                        return (
                            <View style={[styles.orderCard]} key={index}>

                                <Text style={styles.orderCardTitle}>
                                    {order.serviceProviderName} - {order.serviceCategoryName}
                                </Text>

                                <Text style={styles.orderCardText}>
                                    Order On: {order.orderDate}
                                </Text>


                                <Text style={styles.orderCardText}>
                                    Delivery: {order.deliveryDate}
                                </Text>

                                <Text style={styles.orderCardText}>
                                    Payment: {order.paymentType.toUpperCase()}
                                </Text>

                                <View style={{position: 'absolute', right: 0, top: 0, padding: responsiveHeight(1.5)}}>
                                    {getFeedbackIcon(order.hasReceivedFeedback)}
                                </View>
                            </View>
                        );
                    })}
                </View>

            </ScrollView>
            {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    size="large" color={BACKGROUND_COLOR}
                />
            </View> : <></>}
        </GestureHandlerRootView>
    );
};

export default ProviderCompleteOrders;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BACKGROUND_COLOR,
        flex: 1
    },
    orderCard: {
        borderWidth: 1,
        borderColor: SHADOW_COLOR,
        padding: responsiveHeight(2),
        borderRadius: 8,
        gap: responsiveHeight(1),
        marginBottom: responsiveHeight(2),
        
    },
    orderCardTitle: {
        fontSize: responsiveFontSize(2.5)
    },
    orderCardText: {
        fontSize: responsiveFontSize(1.75),
        color: 'rgba(0,0,0,0.6)'
    },
});