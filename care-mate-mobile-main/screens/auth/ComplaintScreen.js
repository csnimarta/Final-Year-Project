import {
    View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image,
    ActivityIndicator,
} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, SHADOW_COLOR, BACKGROUND_COLOR} from '../../constants/Colors';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useState, useEffect, useContext, useRef} from 'react';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';
import {complaintTypes} from '../../constants/complaintTypes.json';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useToast} from "react-native-toast-notifications";
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';

const ComplaintScreen = ({route}) => {
    // const {category} = route.params;

    const {user} = useContext(UserContext);

    const navigation = useNavigation();

    const [complaintDetails, setComplaintDetails] = useState('');
    const [error, setError] = useState();
    const [isTypeDDFocused, setIsTypeDDFocused] = useState(false);
    const [selectedComplaintType, setSelectedComplaintType] = useState({});
    const [selectedComplaintTypeTitle, setSelectedComplaintTypeTitle] = useState('');
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handlesubmit = async () => {
        const order = route.params.order;
        console.log(order);
        // console.log(user.data.id);
        console.log(selectedComplaintType.severity);
        if (!selectedComplaintType) {
            toast.show('Please select a category type.');
            return;
        }
        if (complaintDetails.trim() === '') {
            toast.show('Please add your complaint details.');
            return;
        }
        if (!order) {
            toast.show("Cannot file complaint at the moment, please try again later", {type: 'danger'});
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post(`${ baseUrl }/complaint/create`, {
                title: selectedComplaintType.title, description: complaintDetails.trim(), createdBy: user.data.id, createdFor: order.serviceProvider, order: order._id, severity: selectedComplaintType.severity
            });
            if (response.data) {
                navigation.replace('ComplaintSuccessful', {message: 'Complaint submitted successfully!', complaintDetails: response.data});
            }
        } catch (error) {
            toast.show("Cannot file complaint at the moment, please try again later", {type: 'danger'});
            console.log("Could not create complaint: " + error);
        }
        // navigation.navigate('ComplaintSuccessful', {message: 'Complaint submitted successfully!', complaintDetails: complaintDetails});
        setIsLoading(false);

    };
    return (
        <View style={{
            backgroundColor: "#fff",
            flex: 1
        }}>
            <Text style={styles.Headertext}>Raise Complaint</Text>

            <Text style={[styles.Text, {width: responsiveWidth(85), alignSelf: 'center', paddingBottom: responsiveHeight(2)}]}>Select A Category</Text>
            <Dropdown
                style={[styles.dropdown, isTypeDDFocused && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={{paddingHorizontal: responsiveWidth(2)}}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={complaintTypes}
                search
                mode="modal"
                maxHeight={300}
                labelField="title"
                valueField="_index"
                placeholder={!isTypeDDFocused ? 'Select Category' : '...'}
                searchPlaceholder="Search..."
                value={selectedComplaintType}
                onFocus={() => setIsTypeDDFocused(true)}
                onBlur={() => setIsTypeDDFocused(false)}
                onChange={item => {
                    setSelectedComplaintTypeTitle(item.title);
                    setSelectedComplaintType(item);
                    setIsTypeDDFocused(false);
                }}
                renderLeftIcon={() => (
                    <MaterialIcons
                        style={styles.icon}
                        name="category"
                        color={isTypeDDFocused ? PRIMARY_COLOR : 'black'}
                        size={20}
                    />
                )}
            />
            <View style={styles.container}>
                <Text style={styles.Text}>Add details</Text>
                <Text style={[styles.Text2, {paddingVertical: 8}]}>Details you think is important for us to know</Text>

                <View style={[styles.inputFieldStyle]}>
                    <TextInput
                        placeholder={'Please share the specifics of the problem you faced to help us resolve it effectively.'}
                        placeholderTextColor={SECONDARY_COLOR}
                        color={TEXT_COLOR}
                        multiline={true}
                        style={{
                            fontSize: responsiveFontSize(2),
                        }}
                        onChangeText={(text) => setComplaintDetails(text)} />
                </View>

            </View>

            <View style={styles.container}>
                <Text style={{
                    fontSize: responsiveFontSize(1.75), color: 'rgba(0,0,0,0.5)',
                }}>
                    <Text style={{fontSize: responsiveFontSize(1.75), color: 'rgba(0,0,0,0.5)', fontWeight: 'bold'}}>Note: </Text>
                    We highly value your convenience and aim to provide excellent service. If you've encountered any issues, please let us know. Our dedicated team will promptly address any problems or inconveniences. Your feedback is crucial to us, and we are committed to ensuring your satisfaction.
                </Text>
            </View>

            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handlesubmit}>
                    <Text style={styles.buttontext}>Submit</Text>

                </TouchableOpacity>
            </View>

            {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    size="large" color={BACKGROUND_COLOR}
                />
            </View> : <></>}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        borderWidth: 1,
        borderColor: SHADOW_COLOR,
        padding: responsiveHeight(1),
        borderRadius: 8,
        width: responsiveWidth(85),
        alignSelf: 'center',
        marginHorizontal: 10,
    },
    Categorytext: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
        paddingVertical: responsiveHeight(3),
        paddingHorizontal: responsiveHeight(3)
    },
    container: {
        width: responsiveWidth(85),
        paddingVertical: responsiveHeight(2),
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        justifyContent: 'space-between',
    },
    Text: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: TEXT_COLOR
    },
    Text2: {
        fontSize: responsiveFontSize(2),
        //  fontWeight: 'bold',
        color: TEXT_COLOR
    },

    inputFieldStyle: {
        width: responsiveWidth(85),
        height: responsiveHeight(15),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: SECONDARY_COLOR,
        alignSelf: 'center',
        padding: responsiveHeight(1)
    },
    Headertext: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        color: TEXT_COLOR,
        alignSelf: 'center',
        paddingVertical: responsiveHeight(2)
    },
    button: {
        borderRadius: responsiveHeight(2),
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        backgroundColor: PRIMARY_COLOR,
        width: responsiveWidth(85),
        height: responsiveHeight(8),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttontext: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        alignSelf: 'center',
        color: BACKGROUND_COLOR
    }



});
export default ComplaintScreen;