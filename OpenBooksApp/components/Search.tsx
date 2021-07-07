import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  Image,
  Linking
} from 'react-native';

import ListItem from './ListItem';

import Colors from '../const/colors';
import Book from '../types/book';
import useDebounce from '../hooks/debounce';

const Search: React.FC = ({navigation}): JSX.Element => {
  const [booksFound, setBooksFound] = useState<Array<Book>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [showSearchingStatus, setShowSearchingStatus] = useState(false);
  const [searchingStatusMessage, setSearchingStatusMessage] = useState('');

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetch(`https://openlibrary.org/search.json?title=${debouncedSearchTerm}`)
      .then(data => data.json())
      .then(results => {
        if (results.docs.length === 0) {
          setSearchingStatusMessage('No results found');
          setShowSearchingStatus(true);
        } else {
          setSearchingStatusMessage('');
          setShowSearchingStatus(false);

          // Getting only first 5 results for succinctness
          const firstFiveResults = results.docs.splice(0, 4);

          // Remove unwanted keys from result, creating a proper Book type
          setBooksFound(firstFiveResults.map((result: any) => {
            const book: Book = {
              Key: result.key.slice(7),
              Title: result.title,
              Author: result.author_name[0],
              FirstPublishYear: result.first_publish_year,
              ISBN: result.isbn[0],
              CoverCode: result.cover_i,
            };

            return book;
          }));
        }
      })
      .catch((error) => {
        // In case there is an error when a list was already being displayed, empty it
        setBooksFound([]);
        Alert.alert('Error', `There was an error while searching. Please, try again later.`, [{text: 'Ok'}]);
      });
    }
  }, [debouncedSearchTerm]);

  const onSearchInputChange = (value: string): void => {
    setSearchTerm(value);

    // If search field is empty, then there should be no list
    // Otherwise, it's searching in the database and thus the notice is displayed
    if (value === '') {
      setBooksFound([]);
      setShowSearchingStatus(false);
    } else {
      setShowSearchingStatus(true);
      setSearchingStatusMessage('Searching...');
    }
  };

  const onBookSelect = (book: Book): void => {
    // Clean search field and list
    setBooksFound([]);
    setSearchTerm('');

    navigation.navigate('BookDetails', {book});
  };

  const renderItem = ({item}) => {
    return <ListItem book={item} onBookSelect={onBookSelect} />
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
      {/* <Header title="Open Books Search" /> */}
      <TextInput
        placeholder="Search books..."
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={(value: string) => onSearchInputChange(value)}
      />
      {showSearchingStatus
      ? (
        <Text style={styles.searchStatus}>
          {searchingStatusMessage}
        </Text>
      ) : null}
      <FlatList 
        data={booksFound}
        renderItem={renderItem}
        keyExtractor={(item) => item.Key}
      />
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