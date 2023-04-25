import React, {useState, useEffect} from 'react';
import {View, Switch, TouchableOpacity, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import Notifications from '../../Util/Notification';
import styles from './styles';
import * as Storage from '../../Service/Storage';
import Label from '../../CommonComponnet/Label';
import {useNavigation} from '@react-navigation/native';
import {verticalScale} from 'react-native-size-matters';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import ToastMsg from '../../CommonComponnet/Toast';

const DosageReminderScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [reminderTime, setReminderTime] = useState();
  const [date, setDate] = useState(new Date());
  const [showEveningTimePicker, setShowEveningTimePicker] = useState(false);
  const [showMorningTimePicker, setShowmorningTimePicker] = useState(false);
  const [eveningTime, seteveningTime] = useState('');
  const [morningTime, setMorningTimeAlerm] = useState('');

  useEffect(() => {
    Storage.getData('ISENABLE')
      .then(res => {
        let mData = JSON.parse(res);
        if (mData?.eveningTime && mData?.morningTime) {
          setFrequency(mData?.frequency);
          setDate(new Date(mData?.eveningTime));
          seteveningTime(mData?.eveningTime);
          setReminderTime(new Date(mData?.eveningTime).toLocaleString());
          setMorningTimeAlerm(mData?.morningTime);
          setIsEnabled(true);
        } else if (mData?.eveningTime) {
          setFrequency(mData?.frequency);
          setDate(new Date(mData?.eveningTime));
          seteveningTime(mData?.eveningTime);
          setReminderTime(new Date(mData?.eveningTime).toLocaleString());
          setIsEnabled(true);
        } else if (mData?.morningTime) {
          setFrequency(mData?.frequency);
          setDate(new Date(mData?.morningTime));
          setMorningTimeAlerm(mData?.morningTime);
          setReminderTime(new Date(mData?.morningTime).toLocaleString());
          setIsEnabled(true);
        }
      })
      .catch(Error => {
        console.log('---getData----Error--->', Error);
      });
  }, []);

  useEffect(() => {
    if (isEnabled) {
      let mActor = {
        isEnabled: isEnabled,
        frequency: frequency,
        eveningTime: eveningTime,
        morningTime: morningTime,
      };
      if (morningTime && eveningTime) {
        scheduleReminder('morning');
        scheduleReminder('evening');
      } else if (morningTime) {
        scheduleReminder('morning');
      } else {
        scheduleReminder('evening');
      }
      Storage.storeData('ISENABLE', JSON.stringify(mActor));
    } else {
      cancelReminder();
      Storage.storeData('ISENABLE', '');
    }
  }, [isEnabled, frequency, reminderTime]);

  const handleToggleSwitch = () => {
    if (!eveningTime && !morningTime) {
      ToastMsg({
        status: 'error',
        msg: 'Please select Reminder Time first',
      });
    } else {
      setIsEnabled(previousState => !previousState);
      if (!isEnabled) {
        ToastMsg({
          status: 'success',
          msg: 'Reminder is Set Successfully',
        });
      } else {
        ToastMsg({
          status: 'success',
          msg: 'Reminder is disabled',
        });
      }
    }
  };

  const handleFrequencyChange = newFrequency => {
    if (newFrequency != frequency) {
      setFrequency(newFrequency);
      if (isEnabled) {
        ToastMsg({
          status: 'success',
          msg: 'Reminder updated Successfully',
        });
      }
    }
  };

  const handleTimeChange = newTime => {
    setReminderTime(newTime);
  };

  const scheduleReminder = async AMPM => {
    const reminderOptions = {
      channelId: 'reminders',
      title: 'Vyvamind Dosage Reminder',
      message: 'It is time to take your Vyvamind capsule!',
      playSound: true,
      soundName: 'default',
      repeatType:
        frequency === 'daily'
          ? 'day'
          : frequency === 'weekly'
          ? 'week'
          : 'month',
      date: AMPM === 'morning' ? morningTime : eveningTime,
      allowWhileIdle: true,
      priority: 'high', // (optional) set notification priority, default: high
      visibility: 'public', // (optional) set notification visibility, default: private
      importance: 'high',
    };
    if (Platform.OS === 'android') {
      // await PushNotification.cancelAllLocalNotifications();
      Notifications.schduleNotification(reminderOptions);
    } else {
      PushNotificationIOS.addNotificationRequest({
        id: AMPM === 'morning' ? 'Morning' : 'Evening',
        title: 'Vyvamind Dosage Reminder',
        body: 'It is time to take your Vyvamind capsule!',
        fireDate: new Date(AMPM === 'morning' ? morningTime : eveningTime),
        repeats: true,
        repeatsComponent: {
          hour: true,
          minute: true,
        },
        isSilent: false,
        repeatInterval:
          frequency === 'daily'
            ? 'day'
            : frequency === 'weekly'
            ? 'week'
            : 'month',
      });
    }
  };

  const cancelReminder = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  // Morning Time
  const morningMinTime = new Date();
  morningMinTime.setHours(0, 0, 0, 0);
  const morningMaxTime = new Date();
  morningMaxTime.setHours(11, 59, 0, 0);

  // Evening Time
  const eveningMinTime = new Date();
  eveningMinTime.setHours(12, 0, 0, 0);
  const eveningXaxTime = new Date();
  eveningXaxTime.setHours(23, 59, 0, 0);

  return (
    <View style={styles.container}>
      <Label styles={styles.header} title={'Dosage Reminder Settings'} />
      <View style={[styles.option, {marginBottom: verticalScale(40)}]}>
        <Label styles={styles.label} title={'Reminder for Morning time ☀️'} />
        <View style={styles.time_Con}>
          <TouchableOpacity
            onPress={() => setShowmorningTimePicker(true)}
            style={styles.pickTime}>
            <Label
              styles={styles.time_Label}
              title={
                morningTime
                  ? new Date(morningTime).toLocaleTimeString()
                  : '⏰ Select Time'
              }
            />
          </TouchableOpacity>

          <DatePicker
            title={'Reminder for Morning time'}
            minimumDate={morningMinTime}
            maximumDate={morningMaxTime}
            mode="time"
            is24hourSource="device"
            modal
            open={showMorningTimePicker}
            date={morningMinTime}
            onConfirm={date => {
              setShowmorningTimePicker(false);
              setMorningTimeAlerm(date);
            }}
            onCancel={() => {
              setShowmorningTimePicker(false);
            }}
          />
        </View>
      </View>
      <View
        style={[
          styles.option,
          {marginBottom: Platform.OS === 'ios' ? 0 : verticalScale(40)},
        ]}>
        <Label styles={styles.label} title={'Reminder for Evening time 🌙'} />
        <View style={styles.time_Con}>
          <TouchableOpacity
            onPress={() => setShowEveningTimePicker(true)}
            style={styles.pickTime}>
            <Label
              styles={styles.time_Label}
              title={
                eveningTime
                  ? new Date(date).toLocaleTimeString()
                  : '⏰ Select Time'
              }
            />
          </TouchableOpacity>
          <DatePicker
            title={'Reminder for Evening time'}
            minimumDate={eveningMinTime}
            maximumDate={eveningXaxTime}
            mode="time"
            is24hourSource="device"
            modal
            open={showEveningTimePicker}
            date={eveningMinTime}
            onConfirm={date => {
              setShowEveningTimePicker(false);
              setDate(date);
              seteveningTime(date);
              handleTimeChange(date);
            }}
            onCancel={() => {
              setShowEveningTimePicker(false);
            }}
          />
        </View>
      </View>
      <View style={[styles.option]}>
        <Label title={'Reminder Frequency:'} style={styles.label} />
        <Picker
          selectedValue={frequency}
          onValueChange={txt => handleFrequencyChange(txt)}
          style={styles.picker}>
          <Picker.Item
            style={styles.picker_Label}
            label="Daily"
            value="daily"
          />
          <Picker.Item
            style={styles.picker_Label}
            label="Weekly"
            value="weekly"
          />
          <Picker.Item
            style={styles.picker_Label}
            label="Monthly"
            value="monthly"
          />
        </Picker>
      </View>

      <View style={[styles.option, {marginTop: verticalScale(30)}]}>
        <Label style={styles.label} title={'Enable Dosage Reminder:'} />
        <View style={styles.switch_Con}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn_Con}
        onPress={() => navigation.navigate('EditProduct')}>
        <Label styles={styles.btn_Label} title={'Edit  Dose Details'} />
      </TouchableOpacity>
    </View>
  );
};

export default DosageReminderScreen;
