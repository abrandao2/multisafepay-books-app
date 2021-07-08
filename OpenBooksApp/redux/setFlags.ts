const SET_SEARCHING_NOTICE_STATUS = 'SET_SEARCHING_NOTICE_STATUS';
const SET_NO_RESULTS_NOTICE_STATUS = 'SET_NO_RESULTS_NOTICE_STATUS';

// Actions related ===============================
type SetFlagsStatus = {
  type: string;
  status: boolean;
}

export const setSearchingNoticeStatus = (status: boolean): SetFlagsStatus => {
  return {
    type: SET_SEARCHING_NOTICE_STATUS,
    status
  };
};

export const setNoResultsNoticeStatus = (status: boolean): SetFlagsStatus => {
  return {
    type: SET_NO_RESULTS_NOTICE_STATUS,
    status
  };
};

// Reducer related ==============================
interface FlagsReducerState {
  showSearchingNotice: boolean;
  showNoResultsNotice: boolean;
}

const initialState: FlagsReducerState = {
  showSearchingNotice: false,
  showNoResultsNotice: false
};

const flagsReducer = (state: FlagsReducerState = initialState, action: SetFlagsStatus): FlagsReducerState => {
  switch (action.type) {
    case SET_SEARCHING_NOTICE_STATUS:
      return {
        ...state,
        showSearchingNotice: action.status,
      };
    case SET_NO_RESULTS_NOTICE_STATUS:
      return {
        ...state,
        showNoResultsNotice: action.status,
      };
    default:
      return state;
  }
}

export default flagsReducer;