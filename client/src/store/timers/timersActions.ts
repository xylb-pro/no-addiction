import {
  fetchUpdateCurrentTimer,
  fetchCreateCurrentTimer,
  deleteTimerById,
} from '../storeFunctions/timersFunctions';
import moment from 'moment';

import {
  userSetLoader,
  getTokenFromLocalstorage,
  fetchCurrentUserInfo,
  fetchCategories,
} from './../users/usersActions';

import {
  TimersActionType,
  AsyncActionType,
  GET_CURENT_TIMER,
  APP_INIT,
  IN_ADDICTION_CHANGE,
  SET_IN_ADDICTION,
  GET_RANDOM_BAD_QUOTE,
  GET_RANDOM_GOOD_QUOTE,
  GET_IN_ADDICTION,
  CLEAR_CURRENT_TIMER,
  FETCH_DELETE_TIMER,
  FETCH_RECORDS_LIST,
  SET_CURRENT_RECORD_INDEX,
  FETCH_PRE_CURRENT_TIMER,
} from './timersTypes';

import { requestHTTP, backEndLink } from '../../functions/requestHTTP';

export const initState = (): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      dispatch(userSetLoader({ main: true, headerSwitcher: true }));
      if (!getState().users.isAuth) dispatch(getTokenFromLocalstorage());

      await dispatch(fetchCurrentUserInfo());
      await dispatch(getCurrentTimer());
      await dispatch(fetchPreCurrentTimer());
      await dispatch(getInAddiction());

      await dispatch(fetchRecordsList());
      await dispatch(fetchCategories());

      getState().timers.inAddiction
        ? await dispatch(getRandomBadQuote())
        : await dispatch(getRandomGoodQuote());

      dispatch({ type: APP_INIT });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(userSetLoader({ main: false, headerSwitcher: false }));
    }
  };
};

export const fetchRecordsList = (): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      const result = await requestHTTP(
        `${backEndLink}/api/timers/records?categoryId=${
          getState().users.currentCategoryId
        }`,
        'GET',
        getState().users.token,
      );
      let json = result;

      json = json.map((rec: any) => ({
        ...rec,
        duration: moment.duration(
          +moment(rec.endDate) - +moment(rec.beginDate),
        ),
      }));

      dispatch({
        type: FETCH_RECORDS_LIST,
        records: json,
      });

      let currentIndex: number = -1;
      if (!getState().timers.inAddiction) {
        const currentTimer = getState().timers.currentTimer;
        const currentDuration = moment.duration(
          +moment() - +moment(currentTimer.beginDate),
        );
        json.forEach((el: any, i: number, ar: any) => {
          if (el.duration > currentDuration) {
            ++currentIndex;
          }
        });

        dispatch(setCurrentRecordIndex(currentIndex + 1));
      } else dispatch(setCurrentRecordIndex(currentIndex));
      //if inAddiction
    } catch (error) {
      console.log(error);
    }
  };
};

export const setCurrentRecordIndex = (index: number): TimersActionType => {
  return {
    type: SET_CURRENT_RECORD_INDEX,
    currentRecordIndex: index,
  };
};

/**
 * Calling fetch to delete timer. After that fetching new records list.
 * @param {number} timerId - timer Id to delete
 */
export const fetchDeleteTimer = (timerId: number): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      await deleteTimerById(getState(), timerId);

      await dispatch(fetchRecordsList());
      dispatch({ type: FETCH_DELETE_TIMER });
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * Function to get inAddiction status now
 */
export const getInAddiction = (): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      const res = await requestHTTP(
        `${backEndLink}/api/timers/current?inAddiction=true&categoryId=${
          getState().users.currentCategoryId
        }`,
        'GET',
        getState().users.token,
      );

      dispatch({ type: GET_IN_ADDICTION, ...res });
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearCurrentTimer = (): AsyncActionType => {
  return async (dispatch, getState) => {
    const timeNow = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      //delete current timer
      await fetchUpdateCurrentTimer(getState(), timeNow);
      await fetchCreateCurrentTimer(getState(), timeNow);

      dispatch({ type: CLEAR_CURRENT_TIMER });
      await dispatch(getCurrentTimer());
      await dispatch(fetchPreCurrentTimer());
      await dispatch(fetchRecordsList());
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * Function to get current user timer from db if exists
 */
export const getCurrentTimer = (): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.token;
      const res = await requestHTTP(
        `${backEndLink}/api/timers/current?categoryId=${
          getState().users.currentCategoryId
        }`,
        'GET',
        token,
      );

      dispatch({ type: GET_CURENT_TIMER, currentDate: res });
    } catch (error) {
      console.log(error);
    }
  };
};

export const inAddictionChange = (
  date: string | null = null,
): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      if (!getState().users.loading.component) {
        dispatch(userSetLoader({ component: true }));
      }
      const inAddiction = getState().timers.inAddiction;

      //if now inAddiction
      if (date === null) {
        date = moment().format('YYYY-MM-DD HH:mm:ss');
      }
      if (inAddiction) {
        await fetchCreateCurrentTimer(getState(), date);
      } else {
        await fetchUpdateCurrentTimer(getState(), date);
      }

      dispatch({
        type: IN_ADDICTION_CHANGE,
        payload: !inAddiction,
      });

      getState().timers.inAddiction
        ? await dispatch(getRandomBadQuote())
        : await dispatch(getRandomGoodQuote());

      await dispatch(getCurrentTimer());
      await dispatch(fetchPreCurrentTimer());
      await dispatch(fetchRecordsList());
    } catch (error) {
      console.log(error);
    } finally {
      if (getState().users.loading.component) {
        dispatch(userSetLoader({ component: false }));
      }
    }
  };
};

export const setInAddiction = (inAddiction: boolean): TimersActionType => {
  return {
    type: SET_IN_ADDICTION,
    payload: inAddiction,
  };
};

/**
 * Fetch and set to store preCurrentTimer
 */
export const fetchPreCurrentTimer = (): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      const preCurrentTimer = await requestHTTP(
        `${backEndLink}/api/timers/current?preLast=true&categoryId=${
          getState().users.currentCategoryId
        }`,
        'GET',
        getState().users.token,
      );

      dispatch({ type: FETCH_PRE_CURRENT_TIMER, payload: preCurrentTimer });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRandomBadQuote = (): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      const res = await requestHTTP(
        `${backEndLink}/api/quotes?isbad=true&categoryId=${
          getState().users.currentCategoryId
        }`,
        'GET',
        getState().users.token,
      );

      dispatch({ type: GET_RANDOM_BAD_QUOTE, payload: res });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getRandomGoodQuote = (): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      const res = await requestHTTP(
        `${backEndLink}/api/quotes?isbad=false&categoryId=${
          getState().users.currentCategoryId
        }`,
        'GET',
        getState().users.token,
      );

      dispatch({ type: GET_RANDOM_GOOD_QUOTE, payload: res });
    } catch (error) {
      console.log(error);
    }
  };
};
