import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import SplashScreen from "./src/BeforeLogin/Splash";
import Main from "./src/Main";
import Toast from 'react-native-toast-message';

const DosageReminderScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
    }, 1200);
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }} >
      {showSplash ? <SplashScreen /> : <Main />}
      <Toast/>
    </SafeAreaView>

  );
};

export default DosageReminderScreen;