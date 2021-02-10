import { Action } from 'redux';
import { RootState } from '../rootReducer';
import { ThunkAction } from 'redux-thunk';
import moment from 'moment';

export const APP_INIT = 'TIMERS/APP_INIT';
export const IN_ADDICTION_CHANGE = 'TIMERS/IN_ADDICTION_CHANGE';
export const SET_IN_ADDICTION = 'TIMERS/SET_IN_ADDICTION';
export const GET_CURENT_TIMER = 'TIMERS/GET_CURENT_TIMER';
export const GET_IN_ADDICTION = 'TIMERS/GET_IN_ADDICTION';
export const CLEAR_CURRENT_TIMER = 'TIMERS/CLEAR_CURRENT_TIMER';
export const FETCH_RECORDS_LIST = 'TIMERS/FETCH_RECORDS_LIST';
export const FETCH_DELETE_TIMER = 'TIMERS/FETCH_DELETE_TIMER';
export const SET_CURRENT_RECORD_INDEX = 'TIMERS/SET_CURRENT_RECORD_INDEX';
export const FETCH_PRE_CURRENT_TIMER = 'TIMERS/FETCH_PRE_CURRENT_TIMER';

export const GET_RANDOM_BAD_QUOTE = 'QUOTES/GET_RANDOM_BAD_QUOTE';
export const GET_RANDOM_GOOD_QUOTE = 'QUOTES/GET_RANDOM_GOOD_QUOTE';

export type AsyncActionType = ThunkAction<
  void,
  RootState,
  unknown,
  Action<String>
>;

/**
 * Quote object type
 */
type QuoteType = {
  quote: string;
  author: string | null;
  category: string;
};

/**
 * Current timer storage type
 */
export type CurrentTimerType = {
  timerId: number;
  beginDate: string | null;
  endDate: string | null;
};

export type RecordsType = [
  {
    recordId: number;
    beginDate: string;
    endDate: string;
    duration: moment.Duration | string;
  },
];

/**
 * State Interface. Setting up state types
 */
export interface ITimersState {
  currentTimer: CurrentTimerType;
  preCurrentTimer: CurrentTimerType;
  quote: QuoteType;
  records: RecordsType;
  currentRecordIndex: number;
  inAddiction: boolean;
}

/**
 * Action type fetching records list
 */
interface fetchRecordsList {
  type: typeof FETCH_RECORDS_LIST;
  records: RecordsType;
}

interface setCurrentRecordIndex {
  type: typeof SET_CURRENT_RECORD_INDEX;
  currentRecordIndex: number;
}

/**
 * Delete one timer by id
 */
interface fetchDeleteTimer {
  type: typeof FETCH_DELETE_TIMER;
}

interface clearCurrentTimer {
  type: typeof CLEAR_CURRENT_TIMER;
}
interface getInAddiction {
  type: typeof GET_IN_ADDICTION;
  inAddiction: boolean;
}

interface inAddictionChange {
  type: typeof IN_ADDICTION_CHANGE;
  payload: boolean;
}
interface setInAddiction {
  type: typeof SET_IN_ADDICTION;
  payload: boolean;
}

interface initTimers {
  type: typeof APP_INIT;
}

interface getCurrentTimer {
  type: typeof GET_CURENT_TIMER;
  currentDate: CurrentTimerType;
}
interface getRandomBadQuote {
  type: typeof GET_RANDOM_BAD_QUOTE;
  payload: QuoteType;
}
interface getRandomGoodQuote {
  type: typeof GET_RANDOM_GOOD_QUOTE;
  payload: QuoteType;
}

interface fetchPreCurrentTimer {
  type: typeof FETCH_PRE_CURRENT_TIMER;
  payload: CurrentTimerType;
}

export type TimersActionType =
  | inAddictionChange
  | setInAddiction
  | initTimers
  | getCurrentTimer
  | getRandomBadQuote
  | fetchRecordsList
  | fetchDeleteTimer
  | clearCurrentTimer
  | getInAddiction
  | setCurrentRecordIndex
  | fetchPreCurrentTimer
  | getRandomGoodQuote;
