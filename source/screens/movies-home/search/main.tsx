import * as React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextInput} from '../../../components/text-input';
import {Movie} from '../types';
import {SearchResultsCard} from './search-results';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types';
import {useMovieData} from '../../../providers/movie';
import {EmptyState} from '../../../components/alerts';
import FIcon from 'react-native-vector-icons/Ionicons';

FIcon.loadFont();

type Props = {
  show: boolean;
  onClose: () => void;
};

const MovieSearch = ({show, onClose}: Props) => {
  const {
    handleSelectMovie,
    isSearchingForResults,
    searchQuery,
    setSearchQuery,
    searchResults,
  } = useMovieData();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleClose = React.useCallback(() => {
    setSearchQuery('');
    onClose();
  }, [onClose, setSearchQuery]);

  const handlePressMovie = React.useCallback(
    (selectedMovie: Movie) => {
      onClose();
      handleSelectMovie(selectedMovie);
      setSearchQuery('');
      navigation.navigate('movieDetails');
    },
    [onClose, handleSelectMovie, setSearchQuery, navigation],
  );

  const renderEmptyState = () => (
    <View style={styles.emptySearchContainer}>
      <EmptyState />
    </View>
  );

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={show}
      onRequestClose={handleClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search movie by title..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
          <TouchableOpacity activeOpacity={0.9} onPress={handleClose}>
            <FIcon name="close" size={RFValue(20)} color={Colors.white} />
          </TouchableOpacity>
        </View>
        {isSearchingForResults ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={Colors.white} animating={true} />
          </View>
        ) : (
          <View style={styles.searchResultsContainer}>
            <FlatList
              data={searchResults}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <SearchResultsCard
                  movie={item}
                  onResultPressed={() => handlePressMovie(item)}
                />
              )}
              keyExtractor={item => item['#IMDB_ID']}
              ListEmptyComponent={renderEmptyState}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary['900'],
    paddingHorizontal: RFValue(15),
    paddingBottom: RFValue(20),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Platform.OS === 'ios' ? RFValue(18) : RFValue(0),
    paddingTop: Platform.OS === 'ios' ? RFValue(0) : RFValue(10),
  },
  searchContainer: {
    width: '90%',
  },
  searchResultsContainer: {
    paddingVertical: RFValue(20),
    paddingHorizontal: Platform.OS === 'ios' ? RFValue(20) : RFValue(5),
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptySearchContainer: {
    paddingVertical: RFValue(80),
  },
});

export {MovieSearch};
