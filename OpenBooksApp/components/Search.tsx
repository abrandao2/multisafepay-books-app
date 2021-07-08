import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  Image,
  Linking,
} from 'react-native';

import ListItem from './ListItem';
import Notice from './Notice';

import Colors from '../const/colors';
import Book from '../types/dataTypes';
import useDebounce from '../hooks/debounce';
import {fetchBooks} from '../redux/fetchBooks';
import { AppState } from '../redux/rootReducer';
import { NoticeType } from '../types/stateTypes';
import { setErrorAlertStatus, setNoResultsNoticeStatus, setSearchingNoticeStatus } from '../redux/setFlags';

const Search: React.FC<any> = ({navigation}): JSX.Element => {
  const dispatch = useDispatch();

  const booksFound = useSelector((state: AppState) => state.booksReducer.books);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const showSearchingNotice = useSelector((state: AppState) => state.flagsReducer.showSearchingNotice);
  const showNoResultsNotice = useSelector((state: AppState) => state.flagsReducer.showNoResultsNotice);
  const errorAlert = useSelector((state: AppState) => state.flagsReducer.errorAlert);

  useEffect(() => {
    dispatch(fetchBooks(debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (errorAlert.showErrorAlert) {
      Alert.alert('Error', errorAlert.errorMessage, [{
        text: 'OK',
        onPress: () => setErrorAlertStatus(false, '')
      }]);
    }
  }, [errorAlert]);

  const onSearchInputChange = (value: string): void => {
    setSearchTerm(value);
  };

  const onBookSelect = (book: Book): void => {
    navigation.navigate('BookDetails', {book});
  };

  const renderItem = ({item}) => {
    return <ListItem key={Math.random()} book={item} onBookSelect={onBookSelect} />
  };

  const handleVisitGithub = (): void => {
    const url = 'https://github.com/dev01766';

    Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', `Couldn't open the browser.`, [{text: 'Ok'}]);
      }
    })
  };
  
  return (
    <View>
      <TextInput
        placeholder="Search books..."
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={(value: string) => onSearchInputChange(value)}
      />
      {showSearchingNotice ? <Notice noticeType={NoticeType.Searching} /> : null}
      {showNoResultsNotice ? <Notice noticeType={NoticeType.NoResults} /> : null}
      {booksFound
      ? (
        <FlatList 
          data={booksFound}
          renderItem={renderItem}
          keyExtractor={(item) => item.Key}
        />
      ) : null}
      <View style={styles.logoWrapper}>
        <Text
          style={styles.madeByText}
          onPress={handleVisitGithub}
        >
          Made by <Text style={styles.myName}>Andre Silva</Text> for
        </Text>
        <Image
          style={styles.mspLogo}
          source={require('../assets/images/multisafepay-logo.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    padding: 10,
    marginTop: 30,
  },
  madeByText: {
    marginBottom: 5,
  },
  mspLogo: {
    height: 40,
    width: 200,
  },
  myName: {
    color: Colors.DarkBlue,
  },
  searchInput: {
    color: '#333',
    paddingLeft: 12,
    borderBottomColor: Colors.DarkBlue,
    borderBottomWidth: 1,
  },
  searchStatus: {
    padding: 5,
    backgroundColor: Colors.Blue,
    color: Colors.White,
    fontStyle: 'italic',
  },
});

export default Search;