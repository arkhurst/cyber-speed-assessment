import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Text} from '../../../components/text';
import {Colors} from '../../../constants';
import {useBoolean} from '../../../hooks';
import {MovieSearch} from '../search';
import FIcon from 'react-native-vector-icons/Feather';

FIcon.loadFont();

const Header = () => {
  const {value: showMovieSearch, setFalse, setTrue} = useBoolean();

  return (
    <>
      <View style={style.container}>
        <Text style={style.welcomeText} type="medium">
          Cine Circle
        </Text>
        {/* actions */}
        <View style={style.actionsContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => setTrue()}>
            <FIcon
              name="search"
              color={Colors.primary['300']}
              size={RFValue(20)}
            />
          </TouchableOpacity>
          <FIcon
            name="bell"
            style={style.iconContainer}
            color={Colors.primary['300']}
            size={RFValue(20)}
          />
        </View>
      </View>
      <MovieSearch show={showMovieSearch} onClose={setFalse} />
    </>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(12),
    paddingBottom: RFValue(10),
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: RFValue(17),
    color: Colors.white,
  },
  iconContainer: {
    paddingLeft: RFValue(10),
  },
});

export {Header};
