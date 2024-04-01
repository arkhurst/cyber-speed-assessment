import * as React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  Platform,
  FlatList,
} from 'react-native';
import {Colors} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextInput} from '../../../components/text-input';
import {Movie} from '../types';
import FIcon from 'react-native-vector-icons/Ionicons';
import {SearchResultsCard} from './search-results';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types';
import {useMovieData} from '../../../providers/movie';

FIcon.loadFont();

type Props = {
  show: boolean;
  onClose: () => void;
};

export const data: Movie[] = [
  {
    '#TITLE': 'Alien: Romulus',
    '#YEAR': 2024,
    '#IMDB_ID': 'tt18412256',
    '#RANK': 10,
    '#ACTORS': 'Isabela Merced, Cailee Spaeny',
    '#AKA': 'Alien: Romulus (2024) ',
    '#IMDB_URL': 'https://imdb.com/title/tt18412256',
    '#IMDB_IV':
      'https://t.me/iv?url=https%3A%2F%2Fimdb.com%2Ftitle%2Ftt18412256&rhash=77ed0696a538f4',
    '#IMG_POSTER':
      'https://m.media-amazon.com/images/M/MV5BYWI1YzdlZTUtNzExYi00MmYxLTg5OWUtNzhkMDhhOWMwM2Y5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    photo_width: 2025,
    photo_height: 3000,
  },
  {
    '#TITLE': 'Apples Never Fall',
    '#YEAR': 2024,
    '#IMDB_ID': 'tt14371926',
    '#RANK': 16,
    '#ACTORS': 'Annette Bening, Sam Neill',
    '#AKA': 'Apples Never Fall (2024) ',
    '#IMDB_URL': 'https://imdb.com/title/tt14371926',
    '#IMDB_IV':
      'https://t.me/iv?url=https%3A%2F%2Fimdb.com%2Ftitle%2Ftt14371926&rhash=77ed0696a538f4',
    '#IMG_POSTER':
      'https://m.media-amazon.com/images/M/MV5BMWY2NzJhOTMtNTM1ZC00ZTE5LWI5NWYtNjMyNmZjZmZjYWE1XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    photo_width: 2903,
    photo_height: 4300,
  },
  {
    '#TITLE': 'Avatar: The Last Airbender',
    '#YEAR': 2024,
    '#IMDB_ID': 'tt9018736',
    '#RANK': 32,
    '#ACTORS': 'Gordon Cormier, Kiawentiio',
    '#AKA': 'Avatar: The Last Airbender (2024) ',
    '#IMDB_URL': 'https://imdb.com/title/tt9018736',
    '#IMDB_IV':
      'https://t.me/iv?url=https%3A%2F%2Fimdb.com%2Ftitle%2Ftt9018736&rhash=77ed0696a538f4',
    '#IMG_POSTER':
      'https://m.media-amazon.com/images/M/MV5BMTViNTY2MjMtYmUwOC00ZGYxLThjOWEtYjNjZWU3MTYwYzZmXkEyXkFqcGdeQXVyMTEzMTI1Mjk3._V1_.jpg',
    photo_width: 1080,
    photo_height: 1350,
  },
  {
    '#TITLE': 'Anyone But You',
    '#YEAR': 2023,
    '#IMDB_ID': 'tt26047818',
    '#RANK': 38,
    '#ACTORS': 'Sydney Sweeney, Glen Powell',
    '#AKA': 'Anyone But You (2023) ',
    '#IMDB_URL': 'https://imdb.com/title/tt26047818',
    '#IMDB_IV':
      'https://t.me/iv?url=https%3A%2F%2Fimdb.com%2Ftitle%2Ftt26047818&rhash=77ed0696a538f4',
    '#IMG_POSTER':
      'https://m.media-amazon.com/images/M/MV5BOTVhZGU2OWQtNDM1Ni00MzM3LTgzYjgtOTEwYzQzOWZjNTIyXkEyXkFqcGdeQXVyMTcwOTQzOTYy._V1_.jpg',
    photo_width: 2024,
    photo_height: 3000,
  },
  {
    '#TITLE': 'American Fiction',
    '#YEAR': 2023,
    '#IMDB_ID': 'tt23561236',
    '#RANK': 50,
    '#ACTORS': 'Jeffrey Wright, Tracee Ellis Ross',
    '#AKA': 'American Fiction (2023) ',
    '#IMDB_URL': 'https://imdb.com/title/tt23561236',
    '#IMDB_IV':
      'https://t.me/iv?url=https%3A%2F%2Fimdb.com%2Ftitle%2Ftt23561236&rhash=77ed0696a538f4',
    '#IMG_POSTER':
      'https://m.media-amazon.com/images/M/MV5BZDlkZmRlYTctNGJmNy00MjVkLThjZDQtMWY5Zjg2NjlhZDZkXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    photo_width: 2765,
    photo_height: 4096,
  },
  {
    '#TITLE': 'Anatomy of a Fall',
    '#YEAR': 2023,
    '#IMDB_ID': 'tt17009710',
    '#RANK': 51,
    '#ACTORS': 'Sandra Hüller, Swann Arlaud',
    '#AKA': 'Anatomy of a Fall (2023) ',
    '#IMDB_URL': 'https://imdb.com/title/tt17009710',
    '#IMDB_IV':
      'https://t.me/iv?url=https%3A%2F%2Fimdb.com%2Ftitle%2Ftt17009710&rhash=77ed0696a538f4',
    '#IMG_POSTER':
      'https://m.media-amazon.com/images/M/MV5BMDBiYmRkNjUtYzc4My00NGFiLWE2NWUtMGU1ZDA1NTQ3ZjQwXkEyXkFqcGdeQXVyMTM1NjM2ODg1._V1_.jpg',
    photo_width: 6116,
    photo_height: 8974,
  },
  {
    '#TITLE': 'Argylle',
    '#YEAR': 2024,
    '#IMDB_ID': 'tt15009428',
    '#RANK': 56,
    '#ACTORS': 'Henry Cavill, Bryce Dallas Howard',
    '#AKA': 'Argylle (2024) ',
    '#IMDB_URL': 'https://imdb.com/title/tt15009428',
    '#IMDB_IV':
      'https://t.me/iv?url=https%3A%2F%2Fimdb.com%2Ftitle%2Ftt15009428&rhash=77ed0696a538f4',
    '#IMG_POSTER':
      'https://m.media-amazon.com/images/M/MV5BZDM3YTg4MGUtZmUxNi00YmEyLTllNTctNjYyNjZlZGViNmFhXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg',
    photo_width: 3158,
    photo_height: 5000,
  },
  {
    '#TITLE': 'Avatar: The Last Airbender',
    '#YEAR': 2005,
    '#IMDB_ID': 'tt0417299',
    '#RANK': 80,
    '#ACTORS': 'Dee Bradley Baker, Zach Tyler Eisen',
    '#AKA': 'Avatar: The Last Airbender (2005) ',
    '#IMDB_URL': 'https://imdb.com/title/tt0417299',
    '#IMDB_IV':
      'https://t.me/iv?url=https%3A%2F%2Fimdb.com%2Ftitle%2Ftt0417299&rhash=77ed0696a538f4',
    '#IMG_POSTER':
      'https://m.media-amazon.com/images/M/MV5BODc5YTBhMTItMjhkNi00ZTIxLWI0YjAtNTZmOTY0YjRlZGQ0XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_.jpg',
    photo_width: 679,
    photo_height: 1000,
  },
];

const MovieSearch = ({show, onClose}: Props) => {
  const {handleSelectMovie} = useMovieData();
  const [searchQuery, setSearchQuery] = React.useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePressMovie = React.useCallback(
    (selectedMovie: Movie) => {
      onClose();
      handleSelectMovie(selectedMovie);
      navigation.navigate('movieDetails');
    },
    [navigation, handleSelectMovie, onClose],
  );

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      visible={show}
      onRequestClose={onClose}>
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
          <TouchableOpacity activeOpacity={0.9} onPress={onClose}>
            <FIcon name="close" size={RFValue(20)} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.searchResultsContainer}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <SearchResultsCard
                movie={item}
                onResultPressed={() => handlePressMovie(item)}
              />
            )}
            keyExtractor={item => item['#IMDB_ID']}
          />
        </View>
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
});

export {MovieSearch};
