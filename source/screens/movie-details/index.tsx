import * as React from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import {HeaderBackButton, MoviesDetailsHeader, TopCastCard} from './components';
import {Colors} from '../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {AnimatedScrollView} from '@kanelloc/react-native-animated-header-scroll-view';
import {Text} from '../../components/text';
import FIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';

FIcon.loadFont();
EIcon.loadFont();

const actors: Array<{name: string; image: string}> = [
  {
    name: 'Chris',
    image:
      'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Robert.',
    image:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Scarlett',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2ZpbGUlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Sebastian',
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Anthony',
    image:
      'https://images.unsplash.com/photo-1654110455429-cf322b40a906?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2ZpbGUlMjBhdmF0YXJ8ZW58MHx8MHx8fDA%3D',
  },
];

const MoviesDetails = () => {
  return (
    <View style={styles.container}>
      <AnimatedScrollView
        showsVerticalScrollIndicator={false}
        TopNavBarComponent={<MoviesDetailsHeader />}
        HeaderNavbarComponent={<HeaderBackButton />}
        topBarHeight={Platform.OS === 'android' ? RFValue(45) : RFValue(70)}
        headerMaxHeight={RFValue(300)}
        headerImage={{
          uri: 'https://m.media-amazon.com/images/M/MV5BZDlkZmRlYTctNGJmNy00MjVkLThjZDQtMWY5Zjg2NjlhZDZkXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
        }}>
        {/* body */}
        <View style={styles.bodyContainer}>
          {/* movie title container */}
          <View style={styles.movieTitleContainer}>
            <Text style={styles.movieTitle} type="medium">
              Captain America
            </Text>
            {/* rating container */}
            <View style={styles.ratingContainer}>
              <FIcon
                name="star"
                size={RFValue(17)}
                color={Colors.yellow['500']}
              />
              <Text type="regular" style={styles.ratingValue}>
                5.0
              </Text>
            </View>
          </View>
          {/* basic info */}
          <View style={styles.basicInfoContainer}>
            <View style={styles.movieQualityContainer}>
              <Text style={styles.movieQualityText}>4k</Text>
            </View>
            <Text style={styles.basicInfoText}>2h 30m</Text>
            <EIcon
              name="dot-single"
              size={RFValue(18)}
              color={Colors.white}
              style={styles.basicInfoTextSpacing}
            />
            <Text style={styles.basicInfoText}>Action</Text>
            <EIcon
              name="dot-single"
              size={RFValue(18)}
              color={Colors.white}
              style={styles.basicInfoTextSpacing}
            />
            <Text style={styles.basicInfoText}>19 Dec 2023</Text>
          </View>
          {/* story line */}
          <View style={styles.subTitleContainer}>
            <Text type="medium" style={styles.subTitleText}>
              Story Line
            </Text>
            <Text style={styles.descriptionText}>
              Krishna (Mani), Soundar (Sridhar) and Basky (Thadi Balaji) live in
              a lodge together in Chennai. Krishna aspires to become a film
              director while Sridhar wants to become a music director. Raju
              (Raju) who works as a courier boy does ...
            </Text>
            <View style={styles.directorContainer}>
              <Text style={styles.directorTitleText}>Director:</Text>
              <Text style={styles.directorNameText}> John Doe</Text>
            </View>
            <View style={styles.directorContainer}>
              <Text style={styles.directorTitleText}>Creator:</Text>
              <Text style={styles.directorNameText}> Nyla Harper </Text>
            </View>
          </View>
          {/* actors */}
          <View style={styles.subTitleContainer}>
            <Text type="medium" style={styles.subTitleText}>
              Top Cast
            </Text>
            <View style={styles.topCastContainer}>
              <FlatList
                data={actors}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <TopCastCard name={item.name} image={item.image} />
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          {/* full movie summary */}
          <View style={styles.subTitleContainer}>
            <Text type="medium" style={styles.subTitleText}>
              Movie Summary
            </Text>
            <Text style={styles.descriptionText}>
              Krishna (Mani), Soundar (Sridhar) and Basky (Thadi Balaji) live in
              a lodge together in Chennai. Krishna aspires to become a film
              director while Sridhar wants to become a music director. Raju
              (Raju) who works as a courier boy does. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Exercitationem laudantium
              alias cumque ipsum, consequatur qui consectetur minus officia,
              nihil sunt eveniet repudiandae voluptas, laboriosam tenetur totam
              minima nulla! Officia, quia.
            </Text>
          </View>
        </View>
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary['900'],
    flex: 1,
    width: '100%',
  },
  bodyContainer: {
    paddingVertical: RFValue(25),
    paddingHorizontal: RFValue(15),
  },
  movieTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  movieTitle: {
    fontSize: RFValue(15),
    color: Colors.white,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: RFValue(12),
    color: Colors.primary['300'],
    paddingLeft: RFValue(8),
  },
  basicInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFValue(14),
  },
  basicInfoText: {
    fontSize: RFValue(12),
    color: Colors.primary['300'],
    paddingLeft: RFValue(5),
  },
  basicInfoTextSpacing: {
    paddingLeft: RFValue(5),
  },
  movieQualityContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: Colors.primary['800'],
    paddingHorizontal: RFValue(8),
    paddingVertical: RFValue(2),
    borderRadius: RFValue(7),
    marginRight: RFValue(5),
  },
  movieQualityText: {
    fontSize: RFValue(10),
    color: Colors.primary['300'],
  },
  subTitleContainer: {
    paddingBottom: RFValue(14),
  },
  subTitleText: {
    fontSize: RFValue(13),
    color: Colors.primary['100'],
  },
  descriptionText: {
    fontSize: RFValue(11),
    color: Colors.primary['300'],
    paddingVertical: RFValue(8),
  },
  topCastContainer: {
    marginTop: RFValue(10),
  },
  directorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  directorTitleText: {
    fontSize: RFValue(12),
    color: Colors.primary['300'],
  },
  directorNameText: {
    fontSize: RFValue(12),
    color: Colors.white,
  },
});

export {MoviesDetails};
