import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView} from 'react-native';
import {Image} from 'expo-image';
import React, {useState, useEffect, useContext} from "react";
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import {
    BACKGROUND_COLOR,
    TEXT_COLOR,
    SHADOW_COLOR,
    PRIMARY_COLOR,
    SECONDARY_COLOR,
} from "../../constants/Colors";
import {useToast} from "react-native-toast-notifications";
import {useNavigation} from '@react-navigation/native';
import UserContext from '../../context/UserProvider';
import axios from 'axios';
import {SvgUri} from 'react-native-svg';
import {baseUrl} from '../../IPConfig';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CategoriesList = ({route}) => {

    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigation = useNavigation();
    const [serviceProviders, setServiceProviders] = React.useState([]);


    const handleCategoryClick = async (category) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${ baseUrl }/service/getServicesWithProviders`);
            let tempProviders = [];
            response.data.forEach((item) => {
                if (item.category === category._id) {
                    tempProviders.push(item);
                }
            });
            setServiceProviders(tempProviders);
            setIsLoading(false);
            if (tempProviders.length > 0) {
                navigation.navigate("SearchScreen", {serviceProviders: tempProviders});
            } else {
                toast.show("This service is not available at the moment");
            }
        } catch (error) {
            console.log(error);
            toast.show("Could not find service providers at the moment.");
            setIsLoading(false);
        }

    };

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (route.params) {
            setCategories(route.params.categories);
            console.log(categories);
        }
    }, [route.params]);

    return (
        <View style={{
            flex: 1,
            backgroundColor: BACKGROUND_COLOR,
        }}>


            <View style={{
                position: 'relative',
                paddingTop: responsiveHeight(1),
                paddingHorizontal: responsiveWidth(6),
                paddingBottom: responsiveHeight(2),
            }}>

                <View style={{
                    position: 'absolute', flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: responsiveWidth(6), paddingTop: responsiveHeight(1),
                }}>
                    <TouchableOpacity
                    onPress={()=>{
                        navigation.goBack()
                    }}
                        style={{padding: 5, backgroundColor: PRIMARY_COLOR, borderRadius: 100, zIndex:10, justifyContent: 'center', alignItems: 'center'}}
                    >
                        <Ionicons
                            name={'chevron-back'} size={26} color={BACKGROUND_COLOR} />
                    </TouchableOpacity>

                </View>

                <Text style={{
                    fontSize: responsiveFontSize(3.5), textAlign: 'center',
                    fontWeight: 'bold', color: PRIMARY_COLOR
                }}>
                    Categories
                </Text>
            </View>

            <ScrollView style={{
                paddingHorizontal: responsiveWidth(6),
                paddingVertical: responsiveHeight(1),
            }}
                contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", alignContent: "center", justifyContent: 'space-between'}}
            >
                {categories.map((item, index) => {
                    return (<TouchableOpacity onPress={() => {handleCategoryClick(item);}} style={styles.gridViewItem} key={index}>
                        <SvgUri
                            height={responsiveWidth(15)}
                            width={responsiveWidth(15)}
                            uri={item.icon}
                        />
                        <Text style={{fontSize: responsiveFontSize(2.5), color: PRIMARY_COLOR}}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>);
                })}
            </ScrollView>

            {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    size="large" color={BACKGROUND_COLOR}
                />
            </View> : <></>}
        </View>
    );
};

export default CategoriesList;

const styles = StyleSheet.create({
    gridViewItem: {
        borderWidth: 1,
        borderColor: SHADOW_COLOR,
        width: '48%',
        aspectRatio: 1,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: responsiveWidth(2),
        marginBottom: responsiveWidth(4)
    }
});