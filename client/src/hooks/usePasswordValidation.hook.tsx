import validator from 'validator';
import {
  globalPasswordStrong,
  passwordOptions,
} from '../constants/validationConst';
import { useInputValidation } from './useInputValidation.hook';

type usePasswordValidationType = (password: string) => [boolean, number];

// @ts-ignore
export const usePasswordValidation: usePasswordValidationType = (password) => {
  const [validLength] = useInputValidation(password, 'password');

  const isValid = () => {
    if (
      validLength &&
      //@ts-ignore
      validator.isStrongPassword(password, {
        ...passwordOptions,
        returnScore: true,
      }) > globalPasswordStrong.bad
    )
      return true;
    else return false;
  };

  return [
    isValid(),
    validator.isStrongPassword(password, {
      ...passwordOptions,
      returnScore: true,
    }),
  ];
};
