import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator} from "react-native";
import {Camera, CameraType} from 'expo-camera';
import {BACKGROUND_COLOR, PRIMARY_COLOR} from '../../constants/Colors';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from "react-native-responsive-dimensions";
import CheckYesIcon from '../../assets/images/check-yes.svg';
import CheckNoIcon from '../../assets/images/check-no.svg';
import {useNavigation} from "@react-navigation/native";
import UserCnicContext from '../../context/UserCnicProvider';

const CnicCamera = () => {

    const {userCnic, setUserCnic} = React.useContext(UserCnicContext);

    const navigation = useNavigation();

    const [camera, setCamera] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    return (
        <View style={{flex: 1}}>
            {
                imageUri ? (<View style={{flex: 1}}>

                    <Image source={{uri: imageUri}} style={{flex: 1}} />


                    <TouchableOpacity style={{position: 'absolute', bottom: 0, left: responsiveWidth(5), }} onPress={async () => {
                        setImageUri(null);
                    }}>
                        <View style={{backgroundColor: PRIMARY_COLOR, height: responsiveHeight(7.5), width: responsiveHeight(7.5), borderRadius: 100, marginBottom: responsiveHeight(5), justifyContent: 'center', alignItems: 'center'}}>
                            <CheckNoIcon width={responsiveHeight(5)} height={responsiveHeight(5)} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{position: 'absolute', bottom: 0, right: responsiveWidth(5), }} onPress={async () => {
                        setUserCnic(imageUri);
                        navigation.goBack();
                    }}>
                        <View style={{backgroundColor: PRIMARY_COLOR, height: responsiveHeight(7.5), width: responsiveHeight(7.5), borderRadius: 100, marginBottom: responsiveHeight(5), justifyContent: 'center', alignItems: 'center'}}>
                            <CheckYesIcon width={responsiveHeight(5)} height={responsiveHeight(5)} />
                        </View>
                    </TouchableOpacity>

                </View>) : (<Camera
                    ref={(ref) => setCamera(ref)}
                    style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}} type={CameraType.back}>
                    <View>
                        <TouchableOpacity onPress={async () => {
                            setIsLoading(true);
                            if (camera) {
                                let data = await camera.takePictureAsync({
                                    quality: 0.75,

                                });
                                setImageUri(data.uri);
                                if (data.uri) {
                                    setIsLoading(false);
                                }
                            }
                        }}>
                            <View style={{backgroundColor: PRIMARY_COLOR, height: responsiveHeight(10), width: responsiveHeight(10), borderWidth: responsiveHeight(1), borderColor: BACKGROUND_COLOR, borderRadius: 100, marginBottom: responsiveHeight(5)}}>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>)
            }


            {isLoading ? <View style={{height: responsiveHeight(100), width: responsiveWidth(100), position: 'absolute', top: 0, left: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator
                    size="large" color={BACKGROUND_COLOR}
                />
            </View> : <></>}

        </View>
    );
};

export default CnicCamera;