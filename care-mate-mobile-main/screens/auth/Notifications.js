import {View, Text, StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {BACKGROUND_COLOR, PRIMARY_COLOR, SHADOW_COLOR, TEXT_COLOR} from '../../constants/Colors';
import LottieView from 'lottie-react-native';
import NotificationsContext from '../../context/NotificationsProvider';
import moment from 'moment';

const Notifications = () => {

    const {notifications} = useContext(NotificationsContext);
    const [notificationList, setNotificationList] = useState([]);
    console.log(notifications);


    useEffect(() => {
        setNotificationList(notifications);
    }, [notifications]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            <View style={styles.container}>
                <Text style={styles.headerText}>Notifications</Text>
                {notificationList.length > 0 ? (<ScrollView style={styles.notificationList}>
                    {/* Notification items */}
                    {notifications.map((notification) => {
                        return (
                            <View key={notification._id}
                                style={styles.notificationItem}>

                                <View style={styles.notificationContent}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <Text style={[styles.notificationTitle,{flex:1}]}>
                                            {notification.title}

                                        </Text>
                                        <Text style={[styles.notificationText, {flex: 1, textAlign: 'right', color: '#000'}]}>
                                            {moment(notification.createdAt).fromNow()}
                                        </Text>
                                    </View>

                                    <Text style={styles.notificationText}>
                                        {notification.message}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}

                </ScrollView>) : <View
                    style={styles.notificationItem}>

                    <View style={styles.notificationContent}>
                        <Text style={[styles.notificationTitle, {textAlign: 'center'}]}>
                            You have not received any new notifications.
                        </Text>
                    </View>
                </View>}


            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        padding: responsiveWidth(5),
    },
    headerText: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(3),
        marginBottom: responsiveHeight(2),
    },
    notificationList: {
        marginBottom: responsiveHeight(4),
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: responsiveWidth(4),

        padding: responsiveWidth(4),
        marginBottom: responsiveHeight(2),
        shadowColor: SHADOW_COLOR,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },

    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(1),
    },
    notificationText: {
        color: SHADOW_COLOR,
        fontSize: responsiveFontSize(1.5),
    },


});

export default Notifications;