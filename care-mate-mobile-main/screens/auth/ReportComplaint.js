import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'

import React, { useCallback, useState } from 'react'
import { BACKGROUND_COLOR, PRIMARY_COLOR } from '../../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'


const ReportComplaint = () => {

    const data = [
        { key: '1', text: 'Cook' },
        { key: '2', text: 'Maid' },
        { key: '3', text: 'Laundry' },
        { key: '4', text: 'Mechanic' },
        { key: '5', text: 'Tailor' },
        { key: '6', text: 'Painter' },
        { key: '7', text: 'Salon' },
        { key: '8', text: 'Baby Sitter' },
        { key: '9', text: 'Elderly care' },

    ];

    const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleNavigation = (categoryName) => {
        setSelectedCategory(categoryName);
    };


    const handleNextButton = () => {
        if (selectedCategory) {
            navigation.navigate('ComplaintScreen', { category: selectedCategory });
        } else {
            Alert.alert('Error', 'Please select a category.');
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity key={item.key} style={[
            styles.item,
            selectedCategory === item.text && { backgroundColor: PRIMARY_COLOR }
        ]}
            onPress={() => {
                handleNavigation(item.text)
            }}>
            <Text style={[styles.itemText, selectedCategory === item.text && { color: BACKGROUND_COLOR }]}>
                {item.text}
            </Text>
        </TouchableOpacity>
    );

    return (

        <View style={styles.container}>
            <Text style={styles.Headertext}>Choose your category where your complaint falls</Text>


            <FlatList
                data={data}
                renderItem={renderItem}
                numColumns={3}
                keyExtractor={item => item.key}
                contentContainerStyle={styles.listContainer}
            />
            <View style={{
                // backgroundColor: "red",
                width: responsiveWidth(60),
                height: responsiveHeight(8),
                alignSelf: 'center',
                top: responsiveHeight(-3)
            }}>
                <TouchableOpacity style={styles.button} onPress={() => handleNextButton()}>
                    <Text style={{
                        fontSize: responsiveFontSize(2.5),
                        fontWeight: 'bold',
                        color: BACKGROUND_COLOR,
                        alignSelf: 'center',

                    }}>Next</Text>

                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1
    },
    Headertext: {
        color: PRIMARY_COLOR,
        fontSize: responsiveFontSize(2.5),
        paddingHorizontal: responsiveHeight(3),
        paddingVertical: responsiveHeight(5)
    },
    listContainer: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: responsiveHeight(2),
    },
    item: {
        backgroundColor: BACKGROUND_COLOR,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        width: responsiveWidth(27), // Adjust width as needed
        height: responsiveHeight(12), // Adjust height as needed
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 5,
    },
    button: {
        borderRadius: responsiveHeight(2),
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        backgroundColor: PRIMARY_COLOR,
        width: responsiveWidth(60),
        height: responsiveHeight(8),
        justifyContent: 'center'
    },
    itemText: {
        color: PRIMARY_COLOR,
        fontWeight: 'bold'
    }
})

export default ReportComplaint;