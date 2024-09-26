import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ServiceProviderList = ({route}) => {
    // const {serviceProviders} = route.params;
    // console.log(serviceProviders);

    const [serviceProviders, setServiceProviders] = React.useState([]);

    React.useEffect(() => {
        if (route.params.serviceProviders) {
            setServiceProviders(route.params.serviceProviders);
        }
    }, [route.params.serviceProviders]);

    return (
        <View>
            <Text>ServiceProviderList</Text>
        </View>
    );
};

export default ServiceProviderList;

const styles = StyleSheet.create({});