import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform, Modal, ActivityIndicator
} from 'react-native';
import React from 'react';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
    PRIMARY_COLOR,
    TEXT_COLOR,
    SECONDARY_COLOR,
    BACKGROUND_COLOR,
    SHADOW_COLOR,
} from '../../constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {baseUrl} from '../../IPConfig';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Checkbox from 'expo-checkbox';
import {useToast} from "react-native-toast-notifications";
import UserContext from '../../context/UserProvider';
import ServiceContext from '../../context/ServiceProvider';

const ServiceDetails = () => {

    const {service, setService} = React.useContext(ServiceContext);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const {user} = React.useContext(UserContext);
    const toast = useToast();
    const [isCategoriesDDFocused, setIsCategoriesDDFocused] = React.useState(false);
    const [isMonthly, setIsMonthly] = React.useState(service.durationType === 'both' ? true : false);
    const [budget, setBudget] = React.useState(service.budget + "");
    const [monthlyBudget, setMonthlyBudget] = React.useState(service.monthlyBudget === null ? '' : service.monthlyBudget + "");
    const [description, setDescription] = React.useState(service.description);
    const [selectedCategory, setSelectedCategory] = React.useState({});
    const [isAvailable, setIsAvailable] = React.useState(service.isAvailable);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${ baseUrl }/category/getAllCategories`);
                response.data.forEach((item, index) => {
                    if (service.category === item._id) {
                        setSelectedCategory(item);
                    }
                });
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchCategories();

    }, []);

    const navigationIns = useNavigation();

    const handleUpdateService = async () => {

        if (budget < 200) {
            toast.show("Please quote correct cost(min 200rs).");
            return;
        } else if (isMonthly) {
            if (monthlyBudget < 1000) {
                toast.show("Please quote correct monthly cost(min 1000rs/month).");
                return;
            }
        } else if (description === '') {
            toast.show("Please write a short description for your service");
            return;
        } else if (description.length < 50) {
            toast.show("Your description is too small, please write more.");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.put(`${ baseUrl }/service/updateService`, {
                title: selectedCategory.title,
                description: description,
                category: service.category,
                budget: Number(budget),
                user: user.data.id,
                durationType: isMonthly ? 'both' : 'once',
                monthlyBudget: isMonthly ? Number(monthlyBudget) : null,
                isAvailable: isAvailable
            }, {
                params: {
                    id: service._id
                }
            });
            setService(response.data.updatedService);
            toast.show('Your details has been updated!', {type: 'success'});
            setIsLoading(false);
        } catch (error) {
            console.log(error.message);
            toast.show("Something went wrong, please try again!", {
                type: 'warning'
            });
            setIsLoading(false);
        }

    };

    if (!service) {
        return <View></View>;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.mainContainer}>
            <TouchableOpacity style={{position: 'absolute', top: 0, right: 0}}
                onPress={() => {
                    setIsDeleteModalVisible(!isDeleteModalVisible);
                    console.log('jee');

                }}
                hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
            >
                <MaterialIcons
                    style={{padding: responsiveWidth(5)}}
                    color={'red'}
                    size={24}
                    name='delete'
                />
            </TouchableOpacity>
            <Text style={{
                fontSize: responsiveFontSize(3),
                fontWeight: 'bold',
                color: PRIMARY_COLOR,
                textAlign: 'center'
            }}>
                Update your service!
            </Text>
            <View style={{flexDirection: 'row', gap: responsiveWidth(3)}}>
                <Checkbox
                    value={isAvailable}
                    onValueChange={setIsAvailable}
                    color={isAvailable ? PRIMARY_COLOR : '#000'}
                />
                <Text style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold'
                }}>
                    Available for work.
                </Text>
            </View>
            <View>
                <Text style={styles.label}>
                    Type of service you provide
                </Text>
                <View style={[styles.inputStyle, {justifyContent: 'center', opacity: .5}]}>
                    <Text>
                        {service.title}
                    </Text>
                </View>
            </View>
            <View>
                <Text style={styles.label}>
                    Approximate cost of your services.
                </Text>
                <TextInput
                    placeholder={'Quote a reasonable price for your service'}
                    placeholderTextColor={SHADOW_COLOR}
                    style={styles.inputStyle}
                    keyboardType='numeric'
                    value={budget}
                    onChangeText={text => {
                        let number = Number(text.replace(/[^0-9]/g, ''));
                        if (number < 10000) {
                            setBudget(text.replace(/[^0-9]/g, ''));
                        } else {
                            toast.show("You can set a maximum budget of 10000");
                        }
                    }}
                />
            </View>
            <View style={{
                flexDirection: 'row',
                gap: responsiveWidth(2)
            }}>
                <Checkbox
                    disabled={selectedCategory.durationType === 'once' ? true : false}
                    style={styles.checkbox}
                    value={isMonthly}
                    onValueChange={setIsMonthly}
                    color={isMonthly ? PRIMARY_COLOR : '#000'}
                />
                <Text>
                    Do you want to provide monthly services?
                </Text>
            </View>
            {
                isMonthly ? (
                    <View>
                        <Text style={styles.label}>
                            Approximate monthly budget for your services.
                        </Text>
                        <TextInput
                            placeholder={'Quote monthly charges for your service'}
                            placeholderTextColor={SHADOW_COLOR}
                            style={styles.inputStyle}
                            keyboardType='numeric'
                            value={monthlyBudget}
                            onChangeText={text => {
                                let number = Number(text.replace(/[^0-9]/g, ''));
                                if (number < 100000) {
                                    setMonthlyBudget(text.replace(/[^0-9]/g, ''));
                                } else {
                                    toast.show("You can set a maximum budget of 100000");
                                }
                            }}
                        />
                    </View>) : null
            }
            <View style={{position: 'relative'}}>
                <Text style={styles.label}>
                    Short description of your services.(50 - 250 char)
                </Text>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    style={[styles.inputStyle, {
                        textAlignVertical: 'top',
                        paddingVertical: responsiveHeight(1)
                    }]}
                    value={description}
                    onChangeText={((text) => {
                        if (text.length > 250) {
                            toast.show("You cannot write more.");
                        } else {
                            setDescription(text);
                        }
                    })}
                />
                <Text style={{color: 'rgba(0,0,0,0.25)', position: 'absolute', bottom: responsiveWidth(2), right: responsiveWidth(2)}}>
                    {description?.length}
                </Text>
            </View>
            <TouchableOpacity onPress={handleUpdateService} style={{backgroundColor: PRIMARY_COLOR, borderRadius: 8, paddingHorizontal: responsiveWidth(4), paddingVertical: responsiveHeight(2)}}>
                <Text style={{color: BACKGROUND_COLOR, fontSize: responsiveFontSize(2.5), textAlign: 'center'}}>Update</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isDeleteModalVisible}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                }}>
                <TouchableOpacity onPress={() => {setIsDeleteModalVisible(false);}} style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Are you sure you want to delete?</Text>
                        <View style={{flexDirection: 'row', gap: responsiveWidth(2)}}>
                            <TouchableOpacity onPress={() => {setIsDeleteModalVisible(!isDeleteModalVisible);}} style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {setIsDeleteModalVisible(!isDeleteModalVisible);}} style={[styles.modalButton, {backgroundColor: 'red'}]}>
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    size="large" color={BACKGROUND_COLOR}
                />
            </View> : <></>}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: BACKGROUND_COLOR,
        flex: 1,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(6),
        gap: responsiveHeight(3),
    },
    dropdown: {
        borderWidth: 1,
        borderColor: SHADOW_COLOR,
        padding: responsiveHeight(1),
        borderRadius: 8
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: SHADOW_COLOR,
        minHeight: responsiveHeight(6),
        paddingHorizontal: responsiveWidth(2),
        borderRadius: 8,
        maxHeight: responsiveHeight(20)
    },
    label: {
        paddingVertical: responsiveHeight(1),
        fontWeight: 'semibold'
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: responsiveWidth(60),
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: responsiveFontSize(2),
        marginBottom: 20,
        textAlign: 'center',
        color: PRIMARY_COLOR,
    },
    modalButton: {
        backgroundColor: PRIMARY_COLOR,
        padding: 15,
        borderRadius: responsiveHeight(5),
        marginTop: 10,
        flex: 1
    },
    modalButtonText: {
        color: BACKGROUND_COLOR,
        fontSize: responsiveFontSize(1.5),
        fontWeight: 'bold',
        textAlign: 'center'
    },
});


export default ServiceDetails;