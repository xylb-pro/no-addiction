import { RootState } from '../rootReducer';
import { requestHTTP, backEndLink } from '../../functions/requestHTTP';

export const fetchUpdateCurrentTimer = async (
  state: RootState,
  endDate: string,
): Promise<void> => {
  try {
    const res = await requestHTTP(
      `${backEndLink}/api/timers/current/update`,
      'PUT',
      state.users.token,
      {
        id: state.timers.currentTimer.timerId,
        endDate: endDate,
      },
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCreateCurrentTimer = async (
  state: RootState,
  newBeginDate: string,
): Promise<void> => {
  try {
    await requestHTTP(
      `${backEndLink}/api/timers/current/create`,
      'POST',
      state.users.token,
      {
        beginDate: newBeginDate,
        categoryId: state.users.currentCategoryId,
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteTimerById = async (
  state: RootState,
  timerId: number,
): Promise<void> => {
  const body = { timerId };
  try {
    return await requestHTTP(
      `${backEndLink}/api/timers/delete`,
      'DELETE',
      state.users.token,
      body,
    );
  } catch (error) {
    console.log(error);
  }
};
