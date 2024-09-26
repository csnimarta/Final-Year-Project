import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import ProviderHomeScreen from './ProviderHomeScreen';
import MaterialcommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    BACKGROUND_COLOR,
    PRIMARY_COLOR,































































    SECONDARY_COLOR,
    SHADOW_COLOR,
    TEXT_COLOR,
} from '../../constants/Colors';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
// import { create } from 'react-test-renderer';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';
import Bookings from './Bookings';
import Notifications from './Notifications';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#ffff',
            }}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: PRIMARY_COLOR,
                    tabBarInactiveTintColor: SHADOW_COLOR,

                    tabBarStyle: {
                        borderRadius: responsiveHeight(2),
                        top: responsiveHeight(-2),
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 330,
                        alignSelf: 'center',

                    },
                }}>
                <Tab.Screen
                    name="Home"
                    component={ProviderHomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarShowLabel: 'false',
                        tabBarLabelStyle: {
                            fontWeight: 'bold',
                            fontSize: 12.5,
                            marginVertical: 2,
                            top: responsiveHeight(-1),
                        },
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name={focused ? 'home' : 'home-outline'}
                                size={25}
                                color={PRIMARY_COLOR}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Notification"
                    component={Notifications}
                    options={{
                        tabBarLabel: 'New',
                        tabBarShowLabel: 'false',
                        tabBarLabelStyle: {
                            fontWeight: 'bold',
                            fontSize: 12.5,
                            marginVertical: 2,
                            top: responsiveHeight(-1),
                        },
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name={focused ? 'notifications' : 'notifications-outline'}
                                size={26}
                                color={PRIMARY_COLOR}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="search"
                    component={SearchScreen}
                    options={{
                        tabBarLabel: '',

                        // tabBarShowLabel: 'false',
                        // tabBarLabelStyle: {
                        //   fontWeight: 'bold',
                        //   fontSize: 12.5,
                        //   marginVertical: 2,
                        //   top: responsiveHeight(-1),
                        // },
                        tabBarIcon: ({ focused, color, size }) => (
                            <MaterialcommunityIcons
                                name={'home-search'}
                                size={40}
                                color={PRIMARY_COLOR}
                                style={{
                                    top: responsiveHeight(0.5),
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.17,
                                    shadowRadius: 2.54,
                                    elevation: 7,

                                    justifyContent: 'center',
                                    backgroundColor: BACKGROUND_COLOR,
                                    borderRadius: responsiveHeight(3),

                                    width: responsiveWidth(12),
                                    height: responsiveHeight(5.5),



                                }

                                }
                            />
                        ),
                    }}
                />

                {/* <Tab.Screen
          name="Booking"
          component={Bookings}
          options={{
            tabBarLabel: 'Booking',
            tabBarShowLabel: 'false',
            tabBarLabelStyle: {
              fontWeight: 'bold',
              fontSize: 12.5,
              marginVertical: 2,
              top: responsiveHeight(-1),
            },
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                name={focused ? 'calendar' : 'calendar-outline'}
                size={26}
                color={PRIMARY_COLOR}
              />
            ),
          }}
        /> */}


                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarShowLabel: 'false',
                        tabBarLabelStyle: {
                            fontWeight: 'bold',
                            fontSize: 12.5,
                            marginVertical: 2,
                            top: responsiveHeight(-1),
                        },
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name={focused ? 'person' : 'person-outline'}
                                size={25}
                                color={PRIMARY_COLOR}
                            />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarShowLabel: 'false',
                        tabBarLabelStyle: {
                            fontWeight: 'bold',
                            fontSize: 12.5,
                            marginVertical: 2,
                            top: responsiveHeight(-1),
                        },
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name={focused ? 'settings' : 'settings-outline'}
                                size={25}
                                color={PRIMARY_COLOR}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );

    const styles = StyleSheet.create({});
}
