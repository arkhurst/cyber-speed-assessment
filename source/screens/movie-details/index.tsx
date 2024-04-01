import * as React from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import {HeaderBackButton, MoviesDetailsHeader, TopCastCard} from './components';
import {Colors} from '../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {AnimatedScrollView} from '@kanelloc/react-native-animated-header-scroll-view';
import {Text} from '../../components/text';
import {useMovieData} from '../../providers/movie';
import {ErrorState} from '../../components/alerts';
import {
  formatDate,
  getRandomImageUrl,
  normalizeRating,
  parseDuration,
} from '../../utils';
import {MovieCollaboratorEntity} from './types';
import FIcon from 'react-native-vector-icons/Ionicons';
import EIcon from 'react-native-vector-icons/Entypo';
import Loader from '../../components/loader/loader';

FIcon.loadFont();
EIcon.loadFont();

const MoviesDetails = () => {
  const {movieDetails, isMovieDetailsLoading} = useMovieData();

  const topCastWithRandomImages =
    React.useMemo((): MovieCollaboratorEntity[] => {
      return (
        movieDetails?.data?.actor?.map(a => ({
          ...a,
          imageUrl: getRandomImageUrl(),
        })) ?? []
      );
    }, [movieDetails?.data?.actor]);

  if (isMovieDetailsLoading) {
    return <Loader />;
  }

  return (
    <View style={styles.container}>
      {movieDetails?.statusCode === 200 ? (
        <AnimatedScrollView
          showsVerticalScrollIndicator={false}
          TopNavBarComponent={<MoviesDetailsHeader />}
          HeaderNavbarComponent={<HeaderBackButton />}
          topBarHeight={Platform.OS === 'android' ? RFValue(45) : RFValue(70)}
          headerMaxHeight={RFValue(300)}
          headerImage={{
            uri:
              movieDetails?.data?.image ?? movieDetails?.data?.['#IMG_POSTER'],
          }}>
          {/* body */}
          <View style={styles.bodyContainer}>
            {/* movie title container */}
            <View style={styles.movieTitleContainer}>
              <Text style={styles.movieTitle} type="medium">
                {movieDetails?.data['#TITLE']}
              </Text>
              {/* rating container */}
              <View style={styles.ratingContainer}>
                <FIcon
                  name="star"
                  size={RFValue(16)}
                  color={Colors.yellow['500']}
                />
                <Text type="regular" style={styles.ratingValue}>
                  {normalizeRating(
                    movieDetails?.data?.aggregateRating?.ratingValue,
                    movieDetails?.data?.aggregateRating?.bestRating,
                  )}
                </Text>
              </View>
            </View>
            {/* basic info */}
            <View style={styles.basicInfoContainer}>
              <View style={styles.movieQualityContainer}>
                <Text style={styles.movieQualityText}>4k</Text>
              </View>
              <Text style={styles.basicInfoText}>
                {parseDuration(movieDetails?.data?.duration)}
              </Text>
              <EIcon
                name="dot-single"
                size={RFValue(18)}
                color={Colors.white}
                style={styles.basicInfoTextSpacing}
              />
              <Text style={styles.basicInfoText}>
                {movieDetails?.data?.genre?.[0]}
              </Text>
              <EIcon
                name="dot-single"
                size={RFValue(18)}
                color={Colors.white}
                style={styles.basicInfoTextSpacing}
              />
              <Text style={styles.basicInfoText}>
                {formatDate(movieDetails?.data?.datePublished)}
              </Text>
            </View>
            {/* story line */}
            <View style={styles.subTitleContainer}>
              <Text type="medium" style={styles.subTitleText}>
                Story Line
              </Text>
              <Text style={styles.descriptionText}>
                {movieDetails?.data?.description}
              </Text>
              <View style={styles.directorContainer}>
                <Text style={styles.directorTitleText}>Director:</Text>
                <Text style={styles.directorNameText}>
                  {' '}
                  {movieDetails?.data?.director?.find(
                    d => d['@type'] === 'Person',
                  )?.name ?? 'N/A'}
                </Text>
              </View>
              <View style={styles.directorContainer}>
                <Text style={styles.directorTitleText}>Creator:</Text>
                <Text style={styles.directorNameText}>
                  {' '}
                  {movieDetails?.data?.creator?.find(
                    c => c?.['@type'] === 'Person',
                  )?.name ?? 'N/A'}{' '}
                </Text>
              </View>
            </View>
            {/* actors */}
            <View style={styles.subTitleContainer}>
              <Text type="medium" style={styles.subTitleText}>
                Top Cast
              </Text>
              <View style={styles.topCastContainer}>
                <FlatList
                  data={topCastWithRandomImages}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item}) => (
                    <TopCastCard name={item.name} imageUrl={item?.imageUrl} />
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            {/* full movie summary */}
            <View style={styles.subTitleContainer}>
              <Text type="medium" style={styles.subTitleText}>
                Review Summary
              </Text>
              <Text style={styles.descriptionText}>
                {movieDetails?.data?.review?.reviewBody ?? 'N/A'}
              </Text>
              <View style={styles.directorContainer}>
                <Text style={styles.directorTitleText}>Reviewed by:</Text>
                <Text style={styles.directorNameText}>
                  {' '}
                  {movieDetails?.data?.review?.author?.name ?? 'N/A'}
                </Text>
              </View>
            </View>
          </View>
        </AnimatedScrollView>
      ) : (
        <ErrorState />
      )}
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
    paddingTop: RFValue(3),
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
