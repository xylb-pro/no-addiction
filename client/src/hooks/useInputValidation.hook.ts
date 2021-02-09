import validator from 'validator';
import { loginOptions, passwordOptions } from '../constants/validationConst';
type useInputValidationType = (
  inputValue: string,
  inputType: 'password' | 'email' | 'login' | 'passwordOnReg'
) => [boolean, string];

export const useInputValidation: useInputValidationType = (
  inputValue,
  inputType
) => {
  switch (inputType) {
    case 'password':
      return [
        inputValue.length > 5,
        'Пароль должен содержать минимум 6 символов',
      ];
    case 'passwordOnReg':
      return [
        validator.isStrongPassword(inputValue, passwordOptions),
        'Пароль должен содержать минимум 6 символов и 1 число',
      ];
    case 'email':
      return [
        validator.isEmail(inputValue),
        'Адрес электронной почты должен содержать символы "@" и .',
      ];
    case 'login':
      return [
        validator.isLength(inputValue, loginOptions),
        ' Логин должен содержать минимум 5 символов',
      ];
    default:
      return [false, ''];
  }
};
