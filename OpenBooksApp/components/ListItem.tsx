import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback, Image} from 'react-native';

import Book from '../types/dataTypes';
import Colors from '../const/colors';

interface ListItemProps {
  book: Book;
  onBookSelect(book: Book): void;
}

const ListItem: React.FC<ListItemProps> = ({book, onBookSelect}): JSX.Element => {
  return (
    <TouchableNativeFeedback onPress={() => onBookSelect(book)}>
      <View style={styles.rowWrapper}>
        <Image
          style={styles.bookCover}
          source={{uri: `https://covers.openlibrary.org/b/id/${book.CoverCode}-M.jpg`}}
        />
        <View>
          <Text style={styles.bookTitle}>{book.Title}</Text>
          <Text style={styles.bookAuthor}>{book.Author}</Text>
          <Text style={styles.bookISBN}>ISBN: {book.ISBN}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  bookAuthor: {
    color: Colors.DarkGray,
  },
  bookCover: {
    height: 60,
    width: 35,
    marginRight: 15,
  },
  bookISBN: {
    fontSize: 12,
  },
  bookTitle: {
    fontSize: 16,
    color: Colors.DarkBlue,
  },
  rowWrapper: {
    flexDirection: 'row',
    padding: 15,
  },
});

export default ListItem;
