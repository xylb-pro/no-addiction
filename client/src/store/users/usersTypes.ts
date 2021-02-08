export const USER_LANGUAGE_CHANGE = 'USER_LANGUAGE_CHANGE';
export const USER_SET_LOADER = 'USER_SET_LOADER';
export const FETCH_REGISTER_EMAIL = 'USER/FETCH_REGISTER_EMAIL';
export const FETCH_LOGIN_EMAIL = 'USER/FETCH_LOGIN_EMAIL';
export const FETCH_AUTH_GOOGLE = 'USER/FETCH_AUTH_GOOGLE';
export const CLEAR_AUTH_SESSION = 'USER/CLEAR_AUTH_SESSION';
export const GET_TOKEN_FROM_LOCALSTORAGE = 'USER/GET_TOKEN_FROM_LOCALSTORAGE';
export const FETCH_CURRENT_USER_INFO = 'USER/FETCH_CURRENT_USER_INFO';
export const FETCH_CATEGORIES = 'USER/FETCH_CATEGORIES';
export const FETCH_UPDATE_IS_ON_CATEGORY = 'USER/FETCH_UPDATE_IS_ON_CATEGORY';
export const CHANGE_USER_PASSWORD = 'USER/CHANGE_USER_PASSWORD';

export interface IUsersStateLoading {
  main: boolean;
  component: boolean;
  headerSwitcher: boolean;
}
export type UsersStateLoadingArgumentType = {
  main?: boolean;
  component?: boolean;
  headerSwitcher?: boolean;
};

//categories with isOn type
type categories = {
  id: number;
  name: string;
  isOn: boolean;
};

//userstore types
export interface IUsersState {
  userLanguage: string;
  username: string;
  email: string;
  currentCategoryId: number;
  categories: categories[];
  token: string;
  isAuth: boolean;
  loading: IUsersStateLoading;
}

interface userLanguageChange {
  type: typeof USER_LANGUAGE_CHANGE;
  payload: IUsersState;
}

interface userSetLoader {
  type: typeof USER_SET_LOADER;
  payload: IUsersStateLoading;
}

interface registerWithEmail {
  type: typeof FETCH_REGISTER_EMAIL;
  payload: { token: string; isAuth: boolean };
}
interface loginWithEmail {
  type: typeof FETCH_LOGIN_EMAIL;
  payload: { token: string; isAuth: boolean };
}

interface authWuthGoogle {
  type: typeof FETCH_AUTH_GOOGLE;
  payload: { token: string; isAuth: boolean };
}
interface getTokenFromLocalStorage {
  type: typeof GET_TOKEN_FROM_LOCALSTORAGE;
  payload: { token: string; isAuth: boolean };
}
interface clearAuthSession {
  type: typeof CLEAR_AUTH_SESSION;
  payload: { token: string; isAuth: boolean };
}

interface fetchCurrentUserInfo {
  type: typeof FETCH_CURRENT_USER_INFO;
  payload: { email: string; username: string };
}

interface fetchUpdateIsOnCategory {
  type: typeof FETCH_UPDATE_IS_ON_CATEGORY;
  payload: { categories: categories[] };
}
interface fetchCategories {
  type: typeof FETCH_CATEGORIES;
  payload: { categories: categories[] };
}

interface changeUserPassword {
  type: typeof CHANGE_USER_PASSWORD;
}

export type UserActionsType =
  | userLanguageChange
  | userSetLoader
  | clearAuthSession
  | getTokenFromLocalStorage
  | loginWithEmail
  | authWuthGoogle
  | fetchCurrentUserInfo
  | fetchCategories
  | fetchUpdateIsOnCategory
  | registerWithEmail
  | changeUserPassword;
