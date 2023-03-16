import React, {useState, useEffect} from 'react';
import {View, Text, Switch, TouchableOpacity} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import Notifications from '../../Util/Notification';
import styles from './styles';
import * as Storage from '../../Service/Storage';
import Toast from 'react-native-toast-message';

const DosageReminderScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [reminderTime, setReminderTime] = useState(new Date().toLocaleString());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    Storage.getData('ISENABLE')
      .then(res => {
        console.log('------res---->', res);
        if (res) {
          // setIsEnabled(true)
          let mJSONValue = JSON.parse(res);
          console.log('---isEnabled---->', mJSONValue?.isEnabled);
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
    }
  }, [isEnabled, frequency, reminderTime]);

  const handleToggleSwitch = () => {
    if (!selectedTime) {
      // success, error, info
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
      <Text style={styles.header}>Dosage Reminder Settings</Text>
      <View style={styles.option}>
        <Text style={styles.label}>Enable Dosage Reminder:</Text>
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
        <Text style={styles.label}>Reminder Frequency:</Text>
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
        <Text style={styles.label}>Reminder Time</Text>
        <View style={styles.time_Con}>
          <TouchableOpacity onPress={() => setOpen(true)} style={{padding: 5}}>
            <Text style={styles.time_Label}>
              {selectedTime
                ? new Date(date).toLocaleTimeString()
                : 'Select Time'}{' '}
            </Text>
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
    </View>
  );
};

export default DosageReminderScreen;