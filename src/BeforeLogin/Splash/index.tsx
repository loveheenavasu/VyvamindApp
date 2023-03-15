import React from "react";
import { View, Text, } from "react-native";
import { SplashIcon } from "../../Util/image";
import FastImage from 'react-native-fast-image'
import { scale, verticalScale } from "react-native-size-matters";

const SplashScreen = () => {
    return (
        <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }} >
            <FastImage
                style={{ width: scale(200), height: verticalScale(150) }}
                source={SplashIcon}
                resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    )
}

export default SplashScreen