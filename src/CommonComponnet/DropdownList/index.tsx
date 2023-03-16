import React from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Label from '../Label';

interface Props {
  mData: [];
  mTitle?: number | string;
  // onClick ?() : void
  // onClick?(number: any): string;
  onClick?: ((event: any) => void) | undefined;

  network: {
    (): string;
    (action: string): void;
  };
}

const DropdownList = (props: Props) => {
  const {mData, mTitle, onClick} = props;
  return (
    <FlatList
      data={mData}
      style={{flex: 1}}
      renderItem={({item, index}) => {
        return (
          <TouchableOpacity style={styles.main} onPress={onClick}>
            <Label title={item} />
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default DropdownList;

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: scale(0.4),
  },
});
