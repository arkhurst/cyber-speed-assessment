import * as React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../../constants';
import {Text} from '../../../components/text';
import {MovieCollaboratorEntity} from '../types';

const TopCastCard = ({name, imageUrl}: Partial<MovieCollaboratorEntity>) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageUrl,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.castName}>{name?.split(' ')?.[0]}</Text>
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
