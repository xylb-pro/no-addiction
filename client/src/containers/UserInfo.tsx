import React, { HTMLAttributes, useState } from 'react';
import { Container } from '../components/Container';

import { RootState } from '../store/rootReducer';

import profileIcon from '../assets/profileIcon.png';
import { Image } from '../components/Image';
import { Title } from '../components/Title';
import { SecondButton } from '../components/SecondButton';
import { colors } from '../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUserPassword,
  clearAuthSession,
} from '../store/users/usersActions';
import { Input } from '../components/Input';
import { VisibilityOn } from '../assets/VisibilityOn';
import { VisibilityOff } from '../assets/VisibilityOff';
import validator from 'validator';
import { loginOptions, passwordOptions } from '../constants/validationConst';

interface IForm {
  oldPassword: string;
  newPassword: string;
}

export const UserInfo: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  ...rest
}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.users);

  const [form, setForm] = useState<IForm>({
    oldPassword: '',
    newPassword: '',
  });

  const [visible, setVisible] = useState<boolean>(false);

  const [validatePassword, setValidatePassword] = useState<number | boolean>(
    20
  );

  const submitRegistrationForm = (e: any) => {
    e.preventDefault();
    if (
      validator.isLength(form.oldPassword, loginOptions) &&
      validatePassword > 15
    ) {
      dispatch(changeUserPassword(form.oldPassword, form.newPassword));
      setForm({ oldPassword: '', newPassword: '' });
    } else console.log('hueta');
  };

  const changeHandler = (event: any) => {
    if (event.target.name === 'newPassword')
      setValidatePassword(
        validator.isStrongPassword(event.target.value, {
          ...passwordOptions,
          returnScore: true,
        })
      );
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const changeVisible = () => {
    setVisible((pre) => !pre);
  };

  return (
    <Container {...rest}>
      <Container pos="space-between" marginBottom="16px">
        <Container display="flex">
          <Image src={profileIcon} width="50px" borderRadius="100%" />
          <Container margin="0 0 0 12px">
            <Title ff="Alegreya Sans" fz="28px">
              {userInfo.username}
            </Title>
            <Title ff="Alegreya Sans" fz="18px" color={colors.$gray}>
              {userInfo.email}
            </Title>
          </Container>
        </Container>
        <Container margin="0 0 0 12px" style={{ alignSelf: 'flex-end' }}>
          <SecondButton
            design="negative"
            onClick={() => dispatch(clearAuthSession())}
          >
            Log Out
          </SecondButton>
        </Container>
      </Container>
      <form
        onSubmit={(e) => {
          submitRegistrationForm(e);
        }}
        id="changePasswordForm"
      >
        <Container pos="space-between" style={{ justifyContent: 'flex-start' }}>
          <Container margin="0 0 0 0px">
            <SecondButton
              design="normal"
              form="changePasswordForm"
              type="submit"
            >
              Change password
            </SecondButton>
          </Container>
        </Container>

        <Container marginTop="10px">
          <Input
            placeholder="oldPassword"
            type="password"
            name="oldPassword"
            onChange={(e) => changeHandler(e)}
            value={form.oldPassword}
            style={{ paddingRight: '36px' }}
            id="oldPassword"
            autoComplete="new-password"
          >
            Пароль должен содержать минимум 6 символов
          </Input>
        </Container>
        <Container position="relative">
          <Container marginTop="10px">
            <Input
              placeholder="newPassword"
              type={visible ? 'text' : 'password'}
              name="newPassword"
              onChange={(e) => changeHandler(e)}
              value={form.newPassword}
              valid={validatePassword > 15 ? true : false}
              style={{ paddingRight: '36px' }}
              id="newPassword"
              autoComplete="new-password"
            >
              Пароль должен содержать минимум 6 символов, 1 заглавную букву и 1
              число
            </Input>
          </Container>
          <Container
            width="22px"
            style={{
              position: 'absolute',
              right: '15px',
              top: '12px',
              userSelect: 'none',
            }}
            onClick={changeVisible}
          >
            {visible ? <VisibilityOn /> : <VisibilityOff />}
          </Container>
          {/* {console.count('rerender')} */}
        </Container>
      </form>
    </Container>
  );
};
