import { Dispatch } from 'redux';
import Book from '../types/dataTypes';
import { setNoResultsNoticeStatus, setSearchingNoticeStatus } from './setFlags';

// Action related ===============================
const FETCH_BOOKS = 'FETCH_BOOKS';

export type FetchBooksAction = {
  type: string;
  books: Array<Book>;
}

const fetchBooksAction = (booksFound: Array<Book>): FetchBooksAction => {
  console.log(booksFound)
  return {
    type: FETCH_BOOKS,
    books: booksFound,
  };
};

export function fetchBooks(query: string) {
  return (dispatch: Dispatch): void => {
    dispatch(setNoResultsNoticeStatus(false));

    if (!query) {
      dispatch(setSearchingNoticeStatus(false));

      // Clean previous results, so that the user won't see
      // old results as they type
      dispatch(fetchBooksAction([]));
    } else {
      dispatch(setSearchingNoticeStatus(true));

      fetch(`https://openlibrary.org/search.json?title=${query}`)
      .then((response: Response) => response.json())
      .then((data: any) => {
        const firstFiveResults = data.docs.splice(0, 5);

        if (firstFiveResults.length !== 0) {
          dispatch(fetchBooksAction(firstFiveResults.map((result: any) => {
            const book: Book = {
              Key: result.key.slice(7),
              Title: result.title,
              Author: result.author_name[0],
              FirstPublishYear: result.first_publish_year,
              ISBN: result.isbn[0],
              CoverCode: result.cover_i,
            };
  
            return book;
          })));
        } else {
          // If no results, show notice and clear list
          dispatch(setNoResultsNoticeStatus(true));
          dispatch(fetchBooksAction([]));
        }

        dispatch(setSearchingNoticeStatus(false));
      })
      .catch((error: Error) => console.log(error));
    }
  };
}

// Reducer related ==============================
export interface BooksState {
  books: Array<Book>;
}

const initialState: BooksState = {
  books: [],
};

const booksReducer = (state: BooksState = initialState, action: FetchBooksAction): BooksState => {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        books: action.books,
      };
    default:
      return state;
  }
};

export default booksReducer;