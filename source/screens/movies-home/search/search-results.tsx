import * as React from 'react';
import {Image, Platform, Pressable, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../../constants';
import {Text} from '../../../components/text';
import {Movie} from '../types';
import AIcon from 'react-native-vector-icons/AntDesign';

AIcon.loadFont();

type Props = {
  movie: Movie;
  onResultPressed: () => void;
};

const SearchResultsCard = ({movie, onResultPressed}: Props) => {
  return (
    <Pressable onPress={onResultPressed} style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={{uri: movie['#IMG_POSTER']}}
          style={styles.posterImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text type="regular" style={styles.title}>
            {movie['#TITLE']}
          </Text>
          <Text type="regular" style={styles.actors}>
            Actors: {movie['#ACTORS']}
          </Text>
        </View>
      </View>
      <AIcon name="playcircleo" size={RFValue(18)} color={Colors.white} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: RFValue(20),
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  posterImage: {
    width: RFValue(80),
    height: RFValue(80),
    borderRadius: RFValue(10),
  },
  textContainer: {
    paddingLeft: RFValue(10),
    textAlign: 'left',
    width: Platform.OS === 'ios' ? RFValue(160) : RFValue(180),
  },
  title: {
    marginTop: RFValue(10),
    fontSize: RFValue(10),
    color: Colors.primary['200'],
  },
  actors: {
    fontSize: RFValue(10),
    color: Colors.primary['400'],
  },
});

export {SearchResultsCard};
