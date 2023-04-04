import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Linking, Alert} from 'react-native';
import SplashScreen from './src/BeforeLogin/Splash';
import Toast from 'react-native-toast-message';
import Navigator from './src/Navigator';
import messaging from '@react-native-firebase/messaging';
import NotificationPopup from 'react-native-push-notification-popup';
import {scale} from 'react-native-size-matters';
import Label from './src/CommonComponnet/Label';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './src/CommonComponnet/NoInternet';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isNetAvailable, setNet] = useState(true);
  const popRef = useRef();

  async function requestUserPermission() {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    } else {
      Alert.alert(
        '',
        "Notification permission is mandatory for Vyvamind App, Otherwise you won't able to get notification regarding dose reminder",
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => Linking.openSettings()},
        ],
      );
    }
  }
  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1700);
  }, []);

  const onNetworkStateChange = newState => {
    setNet(newState.isConnected);
  };

  const checkNetwork = () => {
    NetInfo.fetch().then(state => {
      setNet(state.isConnected);
    });
  };

  useEffect(() => {
    checkNetwork();
    NetInfo.addEventListener(onNetworkStateChange);
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      popRef?.current.show({
        appTitle: 'Vyvamind App',
        timeText: 'Now',
        title: remoteMessage?.notification?.title,
        body: remoteMessage?.notification?.body,
        slideOutTime: 30000,
      });
    });

    return unsubscribe;
  }, []);

  // Render function
  const renderCustomPopup = ({title, body}) => (
    <View style={styles.main}>
      <View style={styles.noti_Title_Con}>
        <Label styles={styles.app_Title_Label} title={title} />
        <Label styles={styles.now_Label} title={'Now'} />
      </View>
      <Label styles={styles.body_Label} title={body} />
    </View>
  );

  if (!isNetAvailable) {
    return <NoInternet />;
  }
  return (
    <>
      {showSplash ? <SplashScreen /> : <Navigator />}
      <Toast />
      <NotificationPopup
        ref={popRef}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true}
      />
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: scale(15),
    borderRadius: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  noti_Title_Con: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  app_Title_Label: {
    fontSize: scale(13),
    fontWeight: '600',
    color: '#000',
  },
  now_Label: {
    fontSize: scale(10),
    fontWeight: '600',
    color: '#000',
  },
  body_Label: {
    fontSize: scale(12),
    color: '#000',
    opacity: 0.8,
    marginTop: scale(10),
  },
});

export default App;
