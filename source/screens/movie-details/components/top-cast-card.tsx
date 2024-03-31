import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../../constants';
import {Text} from '../../../components/text';

type Props = {
  name: string;
  image: string;
};

const TopCastCard = ({name, image}: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: image,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.castName}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: RFValue(22),
  },
  image: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(40),
  },
  castName: {
    fontSize: RFValue(12),
    color: Colors.primary['300'],
    paddingTop: RFValue(8),
  },
});

export {TopCastCard};
