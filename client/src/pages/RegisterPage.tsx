import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { registerWithEmail, authWithGoogle } from '../store/users/usersActions';
import { useDispatch } from 'react-redux';

import { Image } from '../components/Image';
import { Input } from '../components/Input';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import GoogleIcon from '../assets/GoogleIcon.png';
import { Container } from '../components/Container';
import { VisibilityOn } from '../assets/VisibilityOn';
import { VisibilityOff } from '../assets/VisibilityOff';
import { ProgressBar } from '../components/ProgressBar';
import { googleLoginUrl } from '../constants/queryGoogleAuth';
import { useInputValidation } from '../hooks/useInputValidation.hook';
import { usePasswordValidation } from '../hooks/usePasswordValidation.hook';

interface IForm {
  email: string;
  login: string;
  password: string;
}

export const RegisterPage: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch();

  const [form, setForm] = useState<IForm>({
    email: '',
    login: '',
    password: '',
  });

  const [isValidLogin] = useInputValidation(form.login, 'login');
  const [isValidEmail] = useInputValidation(form.email, 'email');
  const [isValidPassword, passwordStrong] = usePasswordValidation(
    form.password
  );

  const [isValidEmailOnSubmit, setIVEOS] = useState<boolean>(true);
  const [isValidLoginOnSubmit, setIVLOS] = useState<boolean>(true);
  const [isValidPaswordOnSubmit, setIVPOS] = useState<boolean>(true);

  const submitRegistrationForm = (e: any) => {
    e.preventDefault();
    let valid = 0;
    if (isValidLogin) {
      valid++;
    } else setIVLOS(false);
    if (isValidPassword) {
      valid++;
    } else setIVPOS(false);
    if (isValidEmail) {
      valid++;
    } else setIVEOS(false);
    if (valid === 3) {
      dispatch(registerWithEmail(form.login, form.email, form.password));
      setForm({ login: '', password: '', email: '' });
    } // else login and pass not valid
  };

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const changeVisible = (e: any) => {
    setVisible((pre) => !pre);
  };

  const removeReadonly = (e: any) => {
    e.target.removeAttribute('readOnly');
  };

  //TODO кирилл почичтсить лишние атрибуты input. мб input error не children??
  return (
    <>
      <Container
        pos="center"
        height="100%"
        maxWidth="1600px"
        padding="64px 16px"
        margin="0 auto"
        position="relative"
      >
        <Container position="absolute" style={{ top: '16px', right: '16px' }}>
          <a href={googleLoginUrl}>GOOOGLE</a>
          <LoginGoogleButton onClick={() => dispatch(authWithGoogle())}>
            <Image src={GoogleIcon} alt="" width="14px" margin="0 16px 0 0" />
            Login with Google
          </LoginGoogleButton>
        </Container>
        <Container>
          <Container marginBottom="32px" margin="0 auto">
            <Title fz="64px">Зарегистрироваться</Title>
          </Container>
          <form
            onSubmit={(e) => {
              submitRegistrationForm(e);
            }}
            id="registrationForm"
          >
            <Container
              marginBottom="16px"
              maxWidth="360px"
              margin="0 auto"
              position="relative"
            >
              <Input
                placeholder="E-Mail"
                type="text"
                name="email"
                onChange={(e) => changeHandler(e)}
                value={form.email}
                valid={isValidEmailOnSubmit || isValidEmail}
                id="email"
                readOnly
                onFocus={(e) => {
                  removeReadonly(e);
                }}
              >
                Введите корректный адрес электронной почты
              </Input>
            </Container>
            <Container
              marginBottom="16px"
              maxWidth="360px"
              margin="0 auto"
              position="relative"
            >
              <Input
                placeholder="Login"
                type="text"
                name="login"
                onChange={(e) => changeHandler(e)}
                value={form.login}
                valid={isValidLoginOnSubmit || isValidLogin}
                id="login"
              >
                Логин должен содержать не менее 5 символов
              </Input>
            </Container>
            <Container
              maxWidth="360px"
              margin="0 auto"
              marginBottom="10px"
              position="relative"
            >
              <Input
                placeholder="Password"
                type={visible ? 'text' : 'password'}
                name="password"
                onChange={(e) => changeHandler(e)}
                value={form.password}
                valid={isValidPassword || isValidPaswordOnSubmit}
                style={{ paddingRight: '36px' }}
                id="password"
                autoComplete="new-password"
              >
                Пароль должен содержать минимум 6 символов, 1 заглавную букву и
                1 число
              </Input>

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
            </Container>
            <Container maxWidth="360px" margin="0px auto 30px">
              <ProgressBar
                fill={passwordStrong}
                passwordLength={form.password.length}
              />
            </Container>

            <Container pos="center">
              <Button
                styleType="extraSmallText"
                form="registrationForm"
                type="submit"
              >
                Зарегистрироваться
              </Button>
            </Container>
          </form>
          <Container margin="60px auto 0" style={{ textAlign: 'center' }}>
            <Text>Есть учетная запись NoAddiction?</Text>
            <Link
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: ' 14px',
                margin: '0px auto',
                textAlign: 'center',
              }}
              to="/login"
            >
              Войти
            </Link>
          </Container>
        </Container>
      </Container>
    </>
  );
};

const LoginGoogleButton = styled.button`
  background-color: #df6961;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 300;
  font-size: 16px;
  color: #ffffff;
  display: flex;
`;

const Text = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 0px auto 0px;
  text-align: center;
  color: #616161;
`;
