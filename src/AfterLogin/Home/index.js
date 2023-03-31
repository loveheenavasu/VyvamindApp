import React, {useState, useEffect} from 'react';
import {View, Switch, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import Notifications from '../../Util/Notification';
import styles from './styles';
import * as Storage from '../../Service/Storage';
import Toast from 'react-native-toast-message';
import Label from '../../CommonComponnet/Label';
import {useNavigation} from '@react-navigation/native';

const DosageReminderScreen = () => {
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [reminderTime, setReminderTime] = useState(new Date().toLocaleString());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    Storage.getData('ISENABLE')
      .then(res => {
        let mData = JSON.parse(res);
        if (mData?.selectedTime) {
          setSelectedTime(mData?.selectedTime);
          setIsEnabled(true);
        } else {
          console.log('----inside-else-->', 1234);
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
        selectedTime: selectedTime,
      };
      Storage.storeData('ISENABLE', JSON.stringify(mActor));
      scheduleReminder();
    } else {
      cancelReminder();
      Storage.storeData('ISENABLE', '');
    }
  }, [isEnabled, frequency, reminderTime]);

  const handleToggleSwitch = () => {
    if (!selectedTime) {
      Toast.show({
        type: 'error',
        text1: 'Please select Reminder Time first',
      });
    } else {
      setIsEnabled(previousState => !previousState);
    }
  };

  const handleFrequencyChange = newFrequency => {
    setFrequency(newFrequency);
  };

  const handleTimeChange = newTime => {
    setReminderTime(newTime);
  };

  const scheduleReminder = async () => {
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
      date: reminderTime,
      allowWhileIdle: true,
      priority: 'high', // (optional) set notification priority, default: high
      visibility: 'public', // (optional) set notification visibility, default: private
      importance: 'high',
    };
    if (Platform.OS === 'android') {
      await PushNotification.cancelAllLocalNotifications();
      Notifications.schduleNotification(reminderOptions);
    } else {
      PushNotification.localNotificationSchedule(reminderOptions);
    }
  };

  const cancelReminder = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  return (
    <View style={styles.container}>
      <Label styles={styles.header} title={'Dosage Reminder Settings'} />
      <View style={styles.option}>
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
      <View style={styles.option}>
        <Label title={'Reminder Frequency:'} style={styles.label} />
        <Picker
          selectedValue={frequency}
          onValueChange={handleFrequencyChange}
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
      <View style={styles.option}>
        <Label styles={styles.label} title={'Reminder Time'} />
        <View style={styles.time_Con}>
          <TouchableOpacity onPress={() => setOpen(true)} style={{padding: 5}}>
            <Label
              styles={styles.time_Label}
              title={
                selectedTime
                  ? new Date(date).toLocaleTimeString()
                  : 'Select Time'
              }
            />
          </TouchableOpacity>
          <DatePicker
            mode="time"
            is24hourSource="device"
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
              setSelectedTime(date);
              handleTimeChange(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
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
