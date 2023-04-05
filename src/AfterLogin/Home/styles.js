import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
  },
  header: {
    fontSize: scale(23),
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: scale(14),
    color: '#000',
    width: '62%',
    opacity: 0.8,
  },
  picker: {
    flex: 1,
    marginLeft: scale(40),
  },
  timePicker: {
    fontSize: 18,
    color: '#007bff',
  },
  switch_Con: {
    width: '30%',
    marginLeft: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker_Label: {
    fontSize: scale(14),
    color: '#000',
  },
  time_Con: {
    width: '38%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time_Label: {
    fontSize: scale(14),
    color: '#000',
  },
  btn_Con: {
    height: verticalScale(40),
    borderRadius: scale(10),
    backgroundColor: '#40B5AD',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: verticalScale(50),
  },
  btn_Label: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: scale(12),
    paddingHorizontal: scale(10),
  },
  pickTime: {
    padding: 5,
    backgroundColor: '#40B5AD',
    paddingHorizontal: 10,
    borderRadius: 4,
  },
});

export default styles;
