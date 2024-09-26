import {
    View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image,
    ActivityIndicator, 
} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, SHADOW_COLOR, BACKGROUND_COLOR} from '../../constants/Colors';
import {useState, useEffect, useContext, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {useToast} from "react-native-toast-notifications";
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';
import moment from 'moment';

const AdminComplaint = ({route}) => {
    const navigation = useNavigation();
    const [complaints, setComplaints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();


    useEffect(() => {
        console.log(route);
        const fetchComplaints = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${ baseUrl }/complaint/all`);
                setComplaints(response.data);
                setIsLoading(false);
            } catch (error) {
                toast.show("Could not fetch complaints at the moment", {type: 'warning'});
                console.log("Could not fetch data: " + error);
                setIsLoading(false);
            }
        };
        fetchComplaints();
    }, [route]);

    return (
        <View style={{flex: 1, backgroundColor: BACKGROUND_COLOR}}>
            <ScrollView style={{paddingHorizontal: responsiveWidth(6), paddingVertical: responsiveHeight(2)}}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack();
                    }}
                        style={{
                            position: 'absolute', left: 0, top: 0,
                        }}
                    >
                        <MaterialIcons
                            name="arrow-back-ios" color={PRIMARY_COLOR} size={24} />
                    </TouchableOpacity>
                    <Text style={{fontSize: responsiveFontSize(3), fontWeight: 'bold', color: PRIMARY_COLOR}}>
                        Complaints
                    </Text>
                </View>

                <View style={{
                    gap: responsiveHeight(2),
                    paddingVertical: responsiveHeight(2)
                }}>
                    {complaints.map((complaint) => {
                        return (
                            <View style={{
                                borderWidth: 1,
                                borderColor: SHADOW_COLOR,
                                borderRadius: 8,
                                padding: responsiveHeight(1.5),
                                gap: responsiveHeight(1)
                            }} key={complaint._id}>

                                <MaterialCommunityIcons
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        padding: responsiveHeight(1)
                                    }}
                                    size={20}
                                    name={complaint.status === 'Pending' ? 'progress-alert' : (complaint.status === 'Resolved' ? 'progress-check' : 'progress-download')}
                                    color={complaint.status === 'Pending' ? PRIMARY_COLOR : (complaint.status === 'Resolved' ? '#008752' : '#FFC35D')}
                                />

                                <Text style={{fontSize: responsiveFontSize(1.5), fontWeight: 'bold'}}>
                                    Order ID: {complaint.order.substr(complaint.order.length - 7)}
                                </Text>
                                <Text style={{fontSize: responsiveFontSize(2)}}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                    }}>Title: </Text>
                                    {complaint.title}
                                </Text>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text
                                        style={{
                                            fontSize: responsiveFontSize(1.75),
                                        }}
                                    >
                                        <Text style={{
                                            fontWeight: 'bold'
                                        }}>Status: </Text>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            color: complaint.status === 'Pending' ? PRIMARY_COLOR : (complaint.status === 'Resolved' ? '#008752' : '#FFC35D')
                                        }}>
                                            {complaint.status}
                                        </Text>
                                    </Text>

                                    <Text
                                        style={{fontSize: responsiveFontSize(1.75)}}
                                    >
                                        <Text style={{
                                            fontWeight: 'bold'
                                        }}>Created At: </Text>
                                        {moment(complaint.createdAt).format('DD-MMM-YYYY')}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('AdminComplaintResolve', {complaint});
                                    }}
                                    style={{
                                        backgroundColor: PRIMARY_COLOR,
                                        paddingVertical: responsiveHeight(1.5),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: responsiveWidth(33),
                                        borderRadius: 8,
                                        alignSelf: 'center',
                                        marginTop: responsiveHeight(1)
                                    }}>
                                    <Text style={{
                                        color: BACKGROUND_COLOR,
                                        fontSize: responsiveFontSize(2)
                                    }}>Details</Text>
                                </TouchableOpacity>
                            </View>);
                    })}
                </View>

            </ScrollView>
            {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    size="large" color={BACKGROUND_COLOR}
                />
            </View> : <></>}
        </View>
    );
};
const styles = StyleSheet.create({
    usertext: {
        fontSize: responsiveFontSize(2),
        color: PRIMARY_COLOR,
        fontWeight: 'bold',
        marginLeft: responsiveHeight(18)
    }

});
export default AdminComplaint;