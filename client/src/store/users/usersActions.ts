import { selectUserOnlyCurrentCategories } from './usersReducer';

import {
  FETCH_REGISTER_EMAIL,
  IUsersState,
  UserActionsType,
  UsersStateLoadingArgumentType,
  USER_LANGUAGE_CHANGE,
  USER_SET_LOADER,
  GET_TOKEN_FROM_LOCALSTORAGE,
  CLEAR_AUTH_SESSION,
  FETCH_AUTH_GOOGLE,
  FETCH_LOGIN_EMAIL,
  FETCH_CURRENT_USER_INFO,
  FETCH_CATEGORIES,
  FETCH_UPDATE_IS_ON_CATEGORY,
  CHANGE_USER_PASSWORD,
  CHANGE_CURRENT_CATEGORY_ID,
  FETCH_UPDATE_CURRENT_CATEGORY_ID,
} from './usersTypes';

import { requestHTTP, backEndLink } from '../../functions/requestHTTP';

import { AsyncActionType } from '../timers/timersTypes';

export const userLanguageChange = (payload: IUsersState): UserActionsType => {
  return {
    type: USER_LANGUAGE_CHANGE,
    payload,
  };
};

export const userSetLoader = (
  payload: UsersStateLoadingArgumentType,
): AsyncActionType => {
  return (dispatch, getState) => {
    dispatch({
      type: USER_SET_LOADER,
      payload: { ...getState().users.loading, ...payload },
    });
  };
};

/**
 * Register with email and save token
 * @param {string} username
 * @param {string} email
 * @param {string} password
 */
export const registerWithEmail = (
  username: string = '',
  email: string = '',
  password: string = '',
): AsyncActionType => {
  return async (dispatch) => {
    try {
      const res = await requestHTTP(`${backEndLink}/api/register`, 'POST', '', {
        username,
        email,
        password,
      });
      localStorage.setItem('userData', JSON.stringify({ token: res.token }));
      dispatch({
        type: FETCH_REGISTER_EMAIL,
        payload: { token: res.token, isAuth: true },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginWithEmail = (
  usernameOrEmail: string,
  password: string,
): AsyncActionType => {
  return async (dispatch) => {
    try {
      const res = await requestHTTP(`${backEndLink}/api/login`, 'POST', '', {
        usernameOrEmail,
        password,
      });
      localStorage.setItem('userData', JSON.stringify({ token: res.token }));
      dispatch({
        type: FETCH_LOGIN_EMAIL,
        payload: { token: res.token, isAuth: true },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const changeUserPassword = (
  oldPassword: string,
  newPassword: string,
): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      await requestHTTP(
        `${backEndLink}/api/users/updateUserPassword`,
        'PUT',
        getState().users.token,
        {
          oldPassword,
          newPassword,
        },
      );

      dispatch({
        type: CHANGE_USER_PASSWORD,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const authWithGoogle = (): AsyncActionType => {
  return async (dispatch) => {
    try {
      const res = await requestHTTP(
        `${backEndLink}/api/auth/google`,
        'GET',
        '',
      );
      localStorage.setItem('userData', JSON.stringify({ token: res.token }));
      dispatch({
        type: FETCH_AUTH_GOOGLE,
        payload: { token: res.token, isAuth: true },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTokenFromLocalstorage = (): UserActionsType => {
  let data: { [key: string]: any } = { token: '', isAuth: false };

  if (localStorage.getItem('userData')) {
    data = JSON.parse('' + localStorage.getItem('userData'));
    data.isAuth = true;
  }

  return {
    type: GET_TOKEN_FROM_LOCALSTORAGE,
    payload: { token: data.token, isAuth: data.isAuth },
  };
};

export const clearAuthSession = (): UserActionsType => {
  localStorage.removeItem('userData');
  return {
    type: CLEAR_AUTH_SESSION,
    payload: { token: '', isAuth: false },
  };
};

export const fetchCurrentUserInfo = (): AsyncActionType => {
  return async (dispatch, getState) => {
    try {
      const res = await requestHTTP(
        `${backEndLink}/api/users/currentUser`,
        'GET',
        getState().users.token,
      );

      dispatch({
        type: FETCH_CURRENT_USER_INFO,
        payload: res,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchCategories = (): AsyncActionType => {
  return async (dispatch, getState) => {
    const categories = await requestHTTP(
      `${backEndLink}/api/categories?isOn=true`,
      'GET',
      getState().users.token,
    );

    dispatch({
      type: FETCH_CATEGORIES,
      payload: { categories },
    });
  };
};

export const fetchUpdateIsOnCategory = (id: number): AsyncActionType => {
  return async (dispatch, getState) => {
    const { categories } = getState().users;
    const onlyCurrentCategories = selectUserOnlyCurrentCategories(getState());
    try {
      //user can't turn of last category
      if (
        !(
          onlyCurrentCategories.length === 1 &&
          onlyCurrentCategories[0].id === id
        )
      ) {
        await requestHTTP(
          `${backEndLink}/api/categories/update`,
          'POST',
          getState().users.token,
          { category: categories.find((category) => category.id === id) },
        );

        dispatch({
          type: FETCH_UPDATE_IS_ON_CATEGORY,
          payload: {
            categories: categories.map((category) => {
              if (category.id === id)
                return { ...category, isOn: !category.isOn };
              return category;
            }),
          },
        });

        //change current categoryId and Fetch it
        const newOnlyCurrentCategories = selectUserOnlyCurrentCategories(
          getState(),
        );
        const lastCurrentCategoriesAllIndex = categories.findIndex(
          (cat) => cat.id === onlyCurrentCategories[0].id,
        );
        const newCurrentCategoriesAllIndex = categories.findIndex(
          (cat) => cat.id === newOnlyCurrentCategories[0].id,
        );

        if (
          lastCurrentCategoriesAllIndex < newCurrentCategoriesAllIndex ||
          id === getState().users.currentCategoryId
        ) {
          await dispatch(
            changeCurrentCategoryId('no', newOnlyCurrentCategories[0].id),
          );
        }
        //TODO проверить!!!!!! условие выше
      }
    } catch (error) {
      console.log(error);
    }
  };
};

/**
 * Function to change current category id in store
 * @param direction shows change category array direction
 */
export const changeCurrentCategoryId = (
  direction?: 'left' | 'right' | 'no',
  value?: number,
): AsyncActionType => {
  return async (dispatch, getState) => {
    if (!value) {
      const onlyCurrentCategories = selectUserOnlyCurrentCategories(getState());
      let currentCategoryId = getState().users.currentCategoryId;

      let currentCateegoryIndex: number = onlyCurrentCategories.findIndex(
        (el) => el.id === currentCategoryId,
      );

      if (direction === 'left') {
        currentCateegoryIndex === 0
          ? (currentCateegoryIndex = onlyCurrentCategories.length - 1)
          : currentCateegoryIndex--;
      } else if (direction === 'right') {
        currentCateegoryIndex === onlyCurrentCategories.length - 1
          ? (currentCateegoryIndex = 0)
          : currentCateegoryIndex++;
      }

      await dispatch(
        fetchUpdateUserCategoryId(
          onlyCurrentCategories[currentCateegoryIndex].id,
        ),
      );
      dispatch({
        type: CHANGE_CURRENT_CATEGORY_ID,
        payload: {
          currentCategoryId: onlyCurrentCategories[currentCateegoryIndex].id,
        },
      });
    } else {
      await dispatch(fetchUpdateUserCategoryId(value));
      dispatch({
        type: CHANGE_CURRENT_CATEGORY_ID,
        payload: { currentCategoryId: value },
      });
    }
  };
};

/**
 * Update current user category
 */
export const fetchUpdateUserCategoryId = (
  categoryId: number,
): AsyncActionType => {
  return async (dispatch, getState) => {
    const token = getState().users.token;
    try {
      await requestHTTP(
        `${backEndLink}/api/users/updateCurrentCategory`,
        'PUT',
        token,
        {
          categoryId,
        },
      );
      dispatch({ type: FETCH_UPDATE_CURRENT_CATEGORY_ID });
    } catch (error) {
      console.log(error);
    }
  };
};
