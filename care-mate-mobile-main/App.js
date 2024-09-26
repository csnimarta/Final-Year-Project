import React, { useState, useEffect } from 'react';
import { registerRootComponent } from 'expo';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AppRegistry,
} from 'react-native';
import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  SECONDARY_COLOR,
  SHADOW_COLOR,
  TEXT_COLOR,
} from './constants/Colors';
import Splash from './screens/Splash';
import SignIn from './screens/auth/SignIn';
import UserList from './screens/UserList';
import { ToastProvider } from 'react-native-toast-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Welcome from './screens/Welcome';
import SignUp from './screens/auth/SignUp';
import GenderSelection from './screens/auth/GenderSelection';
import UserTypeSelection from './screens/auth/UserTypeSelection';
import AgeSelection from './screens/auth/AgeSelection';
import AreaSelection from './screens/auth/AreaSelection';
import UserCnic from './screens/UserCnicScreen/UserCnicScreen';
import Preferences from './screens/auth/Preferences';
import UserInfo from './screens/auth/UserInfo';
import HomeScreen from './screens/auth/HomeScreen';
import ForgotPassword from './screens/auth/ForgotPassword';
import OTPScreen from './screens/auth/OTPScreen';
import ChangePassword from './screens/auth/ChangePassword';
import BottomNavigation from './screens/auth/BottomNavigation';
import BottomTab from './screens/auth/BottomTab';
import NoResultsscreen from './screens/auth/NoResultsscreen';
import SettingsScreen from './screens/auth/SettingsScreen';
import ProfileScreen from './screens/auth/ProfileScreen';
import EditProfile from './screens/auth/EditProfile';
import Bookings from './screens/auth/Bookings';
import Cook from './screens/auth/Cook';
import Notifications from './screens/auth/Notifications';
import Maid from './screens/auth/Maid';
import Laundry from './screens/auth/Laundry';
import Makebooking from './screens/auth/Makebooking';
import ServiceListing from './screens/auth/ServiceListing';
import SearchScreen from './screens/auth/SearchScreen';
import TermsandPrivacy from './screens/auth/TermsandPrivacy';
import PersonalInfo from './screens/auth/PersonalInfo';
import ProviderHomeScreen from './screens/auth/ProviderHomeScreen';
import CreateService from './screens/auth/CreateService';
import Viewdetails from './screens/auth/Viewdetails';
import AdminHomescreen from './screens/auth/AdminHomescreen';
import Chattscreen from './screens/auth/Chattscreen';
import ProviderProfileScreen from './screens/auth/ProviderProfileScreen';
import ReportComplaint from './screens/auth/ReportComplaint';
import ComplaintScreen from './screens/auth/ComplaintScreen';
import ComplaintSuccessful from './screens/auth/ComplaintSuccessful';
import UserRequest from './screens/auth/UserRequest';
import NotificationSettings from './screens/auth/NotificationSettings';
import ApprovalScreen from './screens/auth/ApprovalScreen';
import CnicCamera from './screens/UserCnicScreen/CnicCamera';
import ServiceDetails from './screens/auth/ServiceDetails';
import { UserCnicProvider } from './context/UserCnicProvider';
import { UserProvider } from './context/UserProvider';
import { ServiceProvider } from './context/ServiceProvider';
import ServiceProviderList from './screens/auth/ServiceProviderList';
import OrderConfirmationScreen from './screens/auth/OrderConfirmationScreen';
import UserOrderHistory from './screens/auth/UserOrderHistory';
import ProviderPendingOrders from './screens/auth/ProviderPendingOrders';
import ProviderCompleteOrders from './screens/auth/ProviderCompleteOrders';
import CardPaymentScreen from './screens/auth/CardPaymentScreen';
import ProviderEditProfile from './screens/auth/ProviderEditProfile';
import CategoriesList from './screens/auth/CategoriesList';
import 'react-native-url-polyfill/auto';
import UserComplaints from './screens/auth/UserComplaints';
import AdminComplaint from './screens/auth/AdminComplaint';
import AdminComplaintResolve from './screens/auth/AdminComplaintResolve';
import registerNNPushToken from 'native-notify';
import { NotificationsProvider } from './context/NotificationsProvider';
import AdminHistory from './screens/auth/AdminHistory';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  registerNNPushToken(21735, 'vkSek1vvIqDI5SO1tPG56H');

  return (
    <ToastProvider>
      <UserProvider>
        <UserCnicProvider>
          <ServiceProvider>
            <NotificationsProvider>
              <View
                style={{
                  flex: 1,
                  backgroundColor: BACKGROUND_COLOR,
                }}
              >
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName={'Splash'}
                    screenOptions={{ headerShown: false }}
                  >
                    <Stack.Screen name="Splash" component={Splash} />
                    <Stack.Screen name="SignIn" component={SignIn} />
                    <Stack.Screen name="Welcome" component={Welcome} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="UserList" component={UserList} />
                    <Stack.Screen
                      name="AdminComplaint"
                      component={AdminComplaint}
                    />
                    <Stack.Screen
                      name="UserTypeSelection"
                      component={UserTypeSelection}
                    />
                    <Stack.Screen
                      name="AgeSelection"
                      component={AgeSelection}
                    />
                    <Stack.Screen
                      name="AreaSelection"
                      component={AreaSelection}
                    />
                    <Stack.Screen name="UserCnic" component={UserCnic} />
                    <Stack.Screen
                      name="UserCnicCamera"
                      component={CnicCamera}
                    />
                    <Stack.Screen name="Preferences" component={Preferences} />
                    <Stack.Screen name="UserInfo" component={UserInfo} />
                    <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen
                      name="ForgotPassword"
                      component={ForgotPassword}
                    />
                    <Stack.Screen name="OTPScreen" component={OTPScreen} />
                    <Stack.Screen
                      name="ChangePassword"
                      component={ChangePassword}
                    />
                    <Stack.Screen name="Main" component={BottomNavigation} />
                    <Stack.Screen
                      name="NoResultsscreen"
                      component={NoResultsscreen}
                    />
                    <Stack.Screen
                      name="SettingsScreen"
                      component={SettingsScreen}
                    />
                    <Stack.Screen
                      name="ProfileScreen"
                      component={ProfileScreen}
                    />
                    <Stack.Screen name="EditProfile" component={EditProfile} />
                    <Stack.Screen name="Bookings" component={Bookings} />
                    <Stack.Screen name="Cook" component={Cook} />
                    <Stack.Screen
                      name="Notifications"
                      component={Notifications}
                    />
                    <Stack.Screen name="Maid" component={Maid} />
                    <Stack.Screen name="Laundry" component={Laundry} />
                    <Stack.Screen name="Makebooking" component={Makebooking} />
                    <Stack.Screen
                      name="ServiceListing"
                      component={ServiceListing}
                    />
                    <Stack.Screen
                      name="ServiceDetails"
                      component={ServiceDetails}
                    />
                    <Stack.Screen
                      name="SearchScreen"
                      component={SearchScreen}
                    />
                    <Stack.Screen
                      name="TermsandPrivacy"
                      component={TermsandPrivacy}
                    />
                    <Stack.Screen
                      name="PersonalInfo"
                      component={PersonalInfo}
                    />
                    <Stack.Screen name="Viewdetails" component={Viewdetails} />
                    <Stack.Screen
                      name="AdminHomescreen"
                      component={AdminHomescreen}
                    />
                    <Stack.Screen name="ChattScreen" component={Chattscreen} />
                    <Stack.Screen
                      name="ProviderProfileScreen"
                      component={ProviderProfileScreen}
                    />
                    <Stack.Screen
                      name="ReportComplaint"
                      component={ReportComplaint}
                    />
                    <Stack.Screen
                      name="ComplaintScreen"
                      component={ComplaintScreen}
                    />
                    <Stack.Screen
                      name="ComplaintSuccessful"
                      component={ComplaintSuccessful}
                    />
                    <Stack.Screen
                      name="ProviderHomeScreen"
                      component={ProviderHomeScreen}
                    />
                    <Stack.Screen
                      name="CreateService"
                      component={CreateService}
                    />
                    <Stack.Screen name="UserRequest" component={UserRequest} />
                    <Stack.Screen
                      name="NotificationSettings"
                      component={NotificationSettings}
                    />
                    <Stack.Screen
                      name="ApprovalScreen"
                      component={ApprovalScreen}
                    />
                    <Stack.Screen
                      name="GenderSelection"
                      component={GenderSelection}
                    />
                    <Stack.Screen
                      name="ServiceProviderList"
                      component={ServiceProviderList}
                    />
                    <Stack.Screen
                      name="OrderConfirmationScreen"
                      component={OrderConfirmationScreen}
                    />

                    <Stack.Screen
                      name="UserOrderHistory"
                      component={UserOrderHistory}
                    />
                    <Stack.Screen
                      name="ProviderPendingOrders"
                      component={ProviderPendingOrders}
                    />
                    <Stack.Screen
                      name="ProviderCompleteOrders"
                      component={ProviderCompleteOrders}
                    />
                    <Stack.Screen
                      name="ProviderEditProfile"
                      component={ProviderEditProfile}
                    />
                    <Stack.Screen
                      name="CardPaymentScreen"
                      component={CardPaymentScreen}
                    />
                    <Stack.Screen
                      name="CategoriesList"
                      component={CategoriesList}
                    />
                    <Stack.Screen
                      name="UserComplaints"
                      component={UserComplaints}
                    />
                    <Stack.Screen
                      name={'AdminComplaintResolve'}
                      component={AdminComplaintResolve}
                    />
                    <Stack.Screen
                      name="AdminHistory"
                      component={AdminHistory}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </View>
            </NotificationsProvider>
          </ServiceProvider>
        </UserCnicProvider>
      </UserProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '90%',
    height: 80,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SHADOW_COLOR,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loginText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: BACKGROUND_COLOR,
  },
});

AppRegistry.registerComponent('main', () => App);
export default App;
