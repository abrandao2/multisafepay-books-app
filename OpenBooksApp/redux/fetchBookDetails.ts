import { Dispatch } from 'redux';

// Action related ===============================
const FETCH_BOOK_DETAILS = 'FETCH_BOOK_DETAILS';

type FetchBookDetailsAction = {
  type: string;
  bookDescription: string;
}

// It's not called "fetchBookDescription" because it allows for
// expansion in the future if more properties are desired other
// than the description string
const fetchBookDetailsAction = (bookDescription: string): FetchBookDetailsAction => {
  return {
    type: FETCH_BOOK_DETAILS,
    bookDescription
  };
};

export const fetchBookDetails = (bookKey: string) => {
  return (dispatch: Dispatch): void => {
    fetch(`https://openlibrary.org/works/${bookKey}.json`)
      .then((response: Response) => response.json())
      .then(data => {
        let bookDescription: string;

        // Checks for irregularities of the API
        if (!data.description) {
          bookDescription = `This book doesn't have a description available.`;
        } else if (typeof data.description === 'string') {
          bookDescription = data.description;
        } else {
          bookDescription = data.description.value;
        }

        dispatch(fetchBookDetailsAction(bookDescription));
      })
      .catch((error: Error) => console.log(error));
  };
};

// Reducer related ==============================
export interface BookDetailsReducerState {
  description: string;
}

const initialState: BookDetailsReducerState = {
  description: ''
};

const bookDetailsReducer = (state: BookDetailsReducerState = initialState, action: FetchBookDetailsAction): BookDetailsReducerState => {
  switch (action.type) {
    case FETCH_BOOK_DETAILS:
      return {
        ...state,
        description: action.bookDescription
      };
    default:
      return state;
  }
};

export default bookDetailsReducer;