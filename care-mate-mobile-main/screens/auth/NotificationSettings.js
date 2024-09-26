import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR } from '../../constants/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const NotificationSettings = () => {
    const navigation = useNavigation();
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const handleToggleNotification = () => {
        setNotificationEnabled((prev) => !prev);
    }

    const notificationMessage = notificationEnabled ? 'Enabled notifications' : 'Disabled notifications';
    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1
        }}>
            <View style={styles.container}>
                <View style={styles.notificationRow}>
                    <Text style={styles.notificationText}>Set Notifications</Text>
                    <Switch
                        value={notificationEnabled}
                        onValueChange={handleToggleNotification}
                        trackColor={{ false: SECONDARY_COLOR, true: PRIMARY_COLOR }}
                        thumbColor={notificationEnabled ? PRIMARY_COLOR : SECONDARY_COLOR}
                        style={{
                            width: responsiveWidth(55)
                        }}
                    />

                </View>
                <Text style={styles.message}>{notificationMessage}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        top: responsiveHeight(4),
        justifyContent: 'center',
    },

    notificationRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    notificationText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: TEXT_COLOR
    },

    message: {
        fontSize: responsiveFontSize(1.5),
        color: PRIMARY_COLOR,
        marginRight: responsiveHeight(28)
    }

})
export default NotificationSettings