import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from './src/BeforeLogin/Splash';
import Toast from 'react-native-toast-message';
import Navigator from './src/Navigator';

const DosageReminderScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1200);
  }, []);

  return (
    <>
      {showSplash ? <SplashScreen /> : <Navigator />}
      <Toast />
    </>
  );
};

export default DosageReminderScreen;
