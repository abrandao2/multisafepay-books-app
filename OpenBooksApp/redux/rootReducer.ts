import {combineReducers} from 'redux';

import booksReducer from './fetchBooks';
import flagsReducer from './setFlags';
import bookDetailsReducer from './fetchBookDetails';

const rootReducer = combineReducers({
  booksReducer,
  flagsReducer,
  bookDetailsReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
