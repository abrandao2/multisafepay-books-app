const SET_SEARCHING_NOTICE_STATUS = 'SET_SEARCHING_NOTICE_STATUS';
const SET_NO_RESULTS_NOTICE_STATUS = 'SET_NO_RESULTS_NOTICE_STATUS';
const SET_ERROR_ALERT_STATUS = 'SET_ERROR_ALERT_STATUS';

// Actions related ===============================
type SetFlagsStatus = {
  type: string;
  status: boolean;
  errorMessage?: string;
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

export const setErrorAlertStatus = (status: boolean, errorMessage: string): SetFlagsStatus => {
  return {
    type: SET_ERROR_ALERT_STATUS,
    status,
    errorMessage
  };
};

// Reducer related ==============================
export type ErrorAlert = {
  showErrorAlert: boolean;
  errorMessage: string;
}

interface FlagsReducerState {
  showSearchingNotice: boolean;
  showNoResultsNotice: boolean;
  errorAlert: ErrorAlert;
}

const initialState: FlagsReducerState = {
  showSearchingNotice: false,
  showNoResultsNotice: false,
  errorAlert: {
    showErrorAlert: false,
    errorMessage: '',
  },
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
    case SET_ERROR_ALERT_STATUS:
      return {
        ...state,
        errorAlert: {
          showErrorAlert: action.status,
          errorMessage: action.errorMessage
        },
      };
    default:
      return state;
  }
}

export default flagsReducer;