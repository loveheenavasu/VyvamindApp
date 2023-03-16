import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.main}>
      <ActivityIndicator size={'large'} color={'#40B5AD'} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 99999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
