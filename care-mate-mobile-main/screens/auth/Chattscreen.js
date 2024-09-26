import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { BACKGROUND_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../../constants/Colors';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';

const Chattscreen = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [selectedMessageIndex, setSelectedMessageIndex] = useState(null);

    const sendMessage = () => {
        if (message.trim() !== '') {
            //  const currentTime = new Date().toLocaleTimeString();
            const messageWithTime = `${message}`;
            setChatHistory([...chatHistory, messageWithTime]);
            setMessage('');
        }
    };

    const showMessageTime = (msg, index) => {
        const currentTime = new Date().toLocaleTimeString();
        return selectedMessageIndex === index ? new Date().toLocaleTimeString() : '';
    };

    const handlePressMessage = (index) => {
        setSelectedMessageIndex(index === selectedMessageIndex ? null : index);

    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.chatContainer} ref={(ref) => { this.scrollView = ref }}>
                {chatHistory.map((msg, index) => (
                    <TouchableOpacity key={index} onPress={() => handlePressMessage(index)}>
                        <View style={styles.messageContainer}>
                            <Text style={styles.messageText}>{msg}</Text>
                            <Text style={styles.showmessagetext}>{showMessageTime(msg, index)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    placeholderTextColor={TEXT_COLOR}
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    chatContainer: {
        flexGrow: 1,
        padding: 10,
        backgroundColor: '#fff'
    },
    messageContainer: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 5,
        padding: 10,
        paddingVertical: responsiveHeight(2),
        top: responsiveHeight(2),
        marginBottom: 19,
        height: responsiveHeight(7),
        maxWidth: '80%',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: responsiveFontSize(2),
        fontWeight: "bold",
        color: BACKGROUND_COLOR
    },
    showmessagetext: {
        fontSize: responsiveFontSize(1.5),
        color: BACKGROUND_COLOR,


    },
    fontSize: responsiveFontSize(1.5),
    color: TEXT_COLOR,
    marginTop: 5,
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: responsiveHeight(3)
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: responsiveHeight(5),
        borderColor: PRIMARY_COLOR,
        paddingHorizontal: 15,
        color: TEXT_COLOR
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: PRIMARY_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Chattscreen;