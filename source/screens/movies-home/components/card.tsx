import * as React from 'react';
import {Image, StyleSheet, Pressable} from 'react-native';
import {Colors, LAYOUT} from '../../../constants';
import {Text} from '../../../components/text';
import {Movie} from '../types';
import {RFValue} from 'react-native-responsive-fontsize';

type Props = {
  movie: Movie;
};

const MovieCard = ({movie}: Props) => {
  return (
    <Pressable style={styles.container}>
      <Image
        source={{uri: movie['#IMG_POSTER']}}
        style={styles.posterImage}
        resizeMode="cover"
      />
      <Text type="regular" style={styles.title}>
        {movie['#TITLE']}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: LAYOUT.window.width / 2 - 15,
    marginBottom: RFValue(20),
    alignItems: 'center',
    paddingLeft: RFValue(14),
  },
  posterImage: {
    width: '100%',
    height: 200,
    borderRadius: RFValue(10),
  },
  title: {
    marginTop: RFValue(10),
    fontSize: RFValue(10),
    textAlign: 'center',
    color: Colors.primary['400'],
  },
});

export {MovieCard};
