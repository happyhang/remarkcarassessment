import { Observer, observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { ContainerStyle } from 'common/styles';
import { LoginContext } from 'context/login';
import TextStyle from 'common/styles/text';
import Colors from 'common/styles/colors';
import { CarMovieListContext } from './carMovieListState';
import Spacing from '../common/styles/spacing';

const styles = StyleSheet.create({
  container: {
    ...ContainerStyle.outerContainer,
  },
  contentContainer: {
    ...ContainerStyle.contentContainer,
    ...ContainerStyle.standardScreenSpacing,
  },
  logoutText: {
    ...TextStyle.small,
    color: Colors.grey700,
  },
  movieCardContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey300,
    backgroundColor: Colors.white900,
    marginVertical: Spacing.s2,
    flexDirection: 'row',
    paddingVertical: Spacing.s3,
    paddingHorizontal: Spacing.s3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,

    elevation: 8,
  },
  movieInfoContainer: {
    flex: 1,
    marginLeft: Spacing.s2,
  },
  movieTitleText: {
    ...TextStyle.heading1,
    marginBottom: Spacing.s1,
  },
  movieYearText: {
    ...TextStyle.small,
  },
  posterImage: {
    height: 150,
    width: 100,
    resizeMode: 'cover',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.s5,
  },
  theEndText: {
    textAlign: 'center',
  },
});

function CarMovieList({ navigation }) {
  const { bottom } = useSafeAreaInsets();
  const loginContext = React.useContext(LoginContext);
  const carMovieListContext = React.useContext(CarMovieListContext);

  React.useLayoutEffect(() => {
    const headerRight = () => (
      <TouchableOpacity onPress={() => loginContext.logout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    );

    navigation.setOptions({
      headerRight,
    });
  }, []);

  React.useEffect(() => {
    carMovieListContext.loadMovies();

    return () => {
      carMovieListContext.resetMovies();
    };
  }, []);

  React.useEffect(() => {
    if (carMovieListContext.error) {
      Alert.alert('Error', carMovieListContext.error, [{
        text: 'OK',
      }]);
    }
  }, [carMovieListContext.error]);

  const emptyComponent = React.useMemo(() => (
    (carMovieListContext.loading ? (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.grey900} />
      </View>
    ) : (
      <Text style={styles.theEndText}>No movie found...</Text>
    ))
  ), [carMovieListContext.loading]);

  const { isTheEnd } = carMovieListContext;

  const footerComponent = React.useMemo(() => (
    isTheEnd ? (
      <Text style={styles.theEndText}>-- End of list --</Text>
    ) : null
  ), [isTheEnd]);

  // TODO Consider using VirtualizedList for better performance.
  return (
    <FlatList
      data={carMovieListContext.movieList}
      style={styles.container}
      contentContainerStyle={[styles.contentContainer, { paddingBottom: bottom }]}
      ListEmptyComponent={emptyComponent}
      ListFooterComponent={footerComponent}
      onEndReached={() => {
        if (isTheEnd !== true) {
          carMovieListContext.loadMovies();
        }
      }}
      renderItem={({ item }) => (
        <Observer>
          {() => (
            <View style={styles.movieCardContainer}>
              <FastImage style={styles.posterImage} source={{ uri: item.posterUrl }} />
              <View style={styles.movieInfoContainer}>
                <Text style={styles.movieTitleText}>{item.title}</Text>
                <Text style={styles.movieYearText}>{item.year}</Text>
              </View>
            </View>
          )}
        </Observer>
      )}
    />
  );
}

CarMovieList.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
};

export default observer(CarMovieList);
