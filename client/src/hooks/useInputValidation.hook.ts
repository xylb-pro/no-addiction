import validator from 'validator';
import { loginOptions } from '../constants/validationConst';
type useInputValidationType = (
  inputValue: string,
  inputType: 'password' | 'email' | 'login'
) => [boolean];

export const useInputValidation: useInputValidationType = (
  inputValue,
  inputType
) => {
  switch (inputType) {
    case 'password':
      return [inputValue.length > 5];
    case 'email':
      return [validator.isEmail(inputValue)];
    case 'login':
      return [validator.isLength(inputValue, loginOptions)];
    default:
      return [false];
  }
};
