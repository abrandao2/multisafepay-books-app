import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import Book from '../types/book';
import Colors from '../const/colors';

interface ListItemProps {
  book: Book;
  onBookSelect(book: Book): void;
}

const ListItem: React.FC<ListItemProps> = ({book, onBookSelect}): JSX.Element => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => onBookSelect(book)}
    >
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: Colors.LightGray,
    padding: 15,
    borderBottomColor: Colors.Blue,
    borderBottomWidth: 1,
  },
  bookTitle: {
    fontSize: 18,
    color: Colors.DarkBlue,
  },
  bookAuthor: {
    color: Colors.DarkGray,
    paddingTop: 5,
  },
  bookCover: {
    height: 50,
    width: 30,
    marginRight: 15,
  },
  bookISBN: {
    fontSize: 12,
  },
  rowWrapper: {
    flexDirection: 'row',
  },
});

export default ListItem;
