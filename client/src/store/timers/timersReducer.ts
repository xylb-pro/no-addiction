import {
  ITimersState,
  TimersActionType,
  SET_IN_ADDICTION,
  IN_ADDICTION_CHANGE,
  GET_CURENT_TIMER,
  APP_INIT,
  GET_RANDOM_BAD_QUOTE,
  GET_RANDOM_GOOD_QUOTE,
  GET_IN_ADDICTION,
  CLEAR_CURRENT_TIMER,
  FETCH_RECORDS_LIST,
  FETCH_DELETE_TIMER,
  SET_CURRENT_RECORD_INDEX,
  FETCH_PRE_CURRENT_TIMER,
} from './timersTypes';

const initialState: ITimersState = {
  currentTimer: {
    timerId: -1,
    beginDate: null,
    endDate: null,
  },
  preCurrentTimer: {
    timerId: -1,
    beginDate: null,
    endDate: null,
  },
  quote: {
    quote: '',
    author: null,
    category: '',
  },
  records: [
    {
      recordId: -1,
      beginDate: '',
      endDate: '',
      duration: '',
    },
  ],
  currentRecordIndex: -1,
  inAddiction: true,
};

export const timersReducer = (
  state: ITimersState = initialState,
  action: TimersActionType,
): ITimersState => {
  switch (action.type) {
    case IN_ADDICTION_CHANGE:
      return { ...state, inAddiction: action.payload };
    case SET_IN_ADDICTION:
      return { ...state, inAddiction: action.payload };
    case GET_CURENT_TIMER:
      return { ...state, currentTimer: action.currentDate };
    case GET_RANDOM_BAD_QUOTE:
      return { ...state, quote: action.payload };
    case GET_RANDOM_GOOD_QUOTE:
      return { ...state, quote: action.payload };
    case GET_IN_ADDICTION:
      return { ...state, inAddiction: action.inAddiction };
    case FETCH_RECORDS_LIST:
      return {
        ...state,
        records: action.records,
      };
    case SET_CURRENT_RECORD_INDEX:
      return { ...state, currentRecordIndex: action.currentRecordIndex };
    case FETCH_PRE_CURRENT_TIMER:
      return { ...state, preCurrentTimer: action.payload };

    //Actions that do not changing store
    case CLEAR_CURRENT_TIMER:
      return state;
    case FETCH_DELETE_TIMER:
      return state;
    case APP_INIT:
      return state;
    default:
      return state;
  }
};
