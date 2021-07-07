import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  Linking,
  ScrollView
} from 'react-native';

import Colors from '../const/colors';
import Book from '../types/book';

const BookDetails: React.FC = ({route}): JSX.Element => {
  const book: Book = route.params.book;
  const [bookDescription, setBookDescription] = useState<string | undefined>();

  useEffect(() => {
    // Fetch book details
    fetch(`https://openlibrary.org/works/${book.Key}.json`)
    .then(data => data.json())
    .then(result => {
      let description: string;

      if (!result.description) {
        description = `This book doesn't have a description available.`;
      } else if (typeof result.description === 'string') {
        description = result.description;
      } else {
        description = result.description.value;
      }

      setBookDescription(description);
    })
    .catch((error) => {
      console.log('fetching book details error: ', error);
      Alert.alert('Error', `There was an error while opening this book. Please, try again later.`, [{text: 'Ok'}]);
    });
  }, [book]);

  const handleBuyBook = (): void => {
    const url = `https://isbnsearch.org/isbn/${book.ISBN}`;

    Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', `Couldn't open the browser.`, [{text: 'Ok'}]);
      }
    })
  };

  return bookDescription ? (
    <View>
      <View style={{flexDirection: 'row'}}>
        {/* Book cover */}
        <View style={styles.bookCoverWrapper}>
          <Image
            style={styles.bookCover}
            source={{uri: `https://covers.openlibrary.org/b/id/${book.CoverCode}-L.jpg`}}
          />
        </View>

        {/* Book details */}
        <View styles={styles.bookDetails}>
          {/* Title */}
          <Text style={styles.bookDetailsItemTitle}>Title:</Text>
          <View style={styles.bookDetailsItemBodyWrapper}>
            <Text style={styles.bookDetailsItemBody}>{book.Title}</Text>
          </View>

          {/* Author */}
          <Text style={styles.bookDetailsItemTitle}>Author:</Text>
          <View style={styles.bookDetailsItemBodyWrapper}>
            <Text style={styles.bookDetailsItemBody}>{book.Author}</Text>
          </View>

          {/* Published in */}
          <Text style={styles.bookDetailsItemTitle}>Published in:</Text>
          <View style={styles.bookDetailsItemBodyWrapper}>
            <Text style={styles.bookDetailsItemBody}>{book.FirstPublishYear}</Text>
          </View>

          {/* Buy it */}
          <View style={styles.buyItButton}>
            <Button
              title="Buy it"
              onPress={handleBuyBook}
              style={styles.buyItButton}
            />
          </View>
        </View>
      </View>

      {/* Book description */}
      <ScrollView>
        <Text style={styles.bookDescription}>{bookDescription}</Text>
      </ScrollView>
    </View>
  ) : (
    <View style={styles.loadingDescriptionText}>
      <Text>Loading description...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bookCover: {
    height: 300,
    width: 180
  },
  bookCoverWrapper: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 10,
  },
  bookDescription: {
    color: Colors.DarkGray,
    padding: 20,
  },
  bookDetails: {
    marginTop: 50,
  },
  bookDetailsItemBody: {
    fontSize: 18,
    color: Colors.DarkGray,
    flexWrap: 'wrap',
    flex: 1,
  },
  bookDetailsItemBodyWrapper: {
    flexDirection: 'row',
  },
  bookDetailsItemTitle: {
    fontSize: 16,
    marginTop: 10,
    color: Colors.DarkBlue,
    fontWeight: 'bold',
  },
  buyItButton: {
    marginTop: 20,
  },
  loadingDescriptionText: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default BookDetails;
