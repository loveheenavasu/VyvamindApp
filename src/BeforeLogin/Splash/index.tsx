import React, {useState, useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import Lottie from 'lottie-react-native';

const SplashScreen = () => {
  const [logoVisible, showLogo] = useState(false);
  const lottieRef = useRef(null);

  const _finish = () => {
    lottieRef.current.pause();
    showLogo(true);
  };

  useEffect(() => {
    let stopAnim = setTimeout(() => {
      _finish();
    }, 1000);

    return () => {
      clearTimeout(stopAnim);
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Lottie
        ref={lottieRef}
        source={require('../../assets/Lottie/splash.json')}
        style={{flex: 1}}
        resizeMode={'cover'}
        autoPlay
      />
      {logoVisible && (
        <FastImage
          style={{width: scale(200), height: verticalScale(150)}}
          source={AppLogo}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}
    </View>
  );
};

export default SplashScreen;
