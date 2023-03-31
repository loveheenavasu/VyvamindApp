import React from "react";
import {StyleSheet} from "react-native";
import {scale, verticalScale} from "react-native-size-matters";

const styles = StyleSheet.create({
    main: {
      width: '100%',
      height: '100%',
      paddingHorizontal: scale(10),
    },
    first_Row: {
      width: '100%',
      height: scale(40),
      flexDirection: 'row',
      marginTop: verticalScale(20),
    },
    select_Qun_Con: {
      width: '55%',
      height: '100%',
      justifyContent: 'center',
     
    },
    drop_Con: {
      width: '45%',
      height: '100%',
    },
    select_Qunatity_Label: {
      fontWeight: 'bold',
      opacity: 0.7,
    },
    logo: {
      width: scale(250),
      height: scale(150),
      alignSelf: 'center',
    },
    editText: {
      width: '100%',
      height: scale(45),
      paddingHorizontal: scale(10),
      borderRadius: scale(5),
      borderWidth: scale(0.6),
      marginTop: verticalScale(10),
    },
    submit_Button: {
      width: scale(100),
      height: verticalScale(40),
      borderRadius: scale(10),
      backgroundColor: '#40B5AD',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginTop: verticalScale(40),
    },
    qunatity_Edit: {
      width: '100%',
      height: '100%',
      borderRadius: scale(5),
      borderWidth: scale(0.6),
      borderColor: 'grey',
      paddingHorizontal: scale(10),
    },
    questionMark:{
      color:'#40B5AD',
      fontSize:scale(10),
    }
  });

  export default styles;