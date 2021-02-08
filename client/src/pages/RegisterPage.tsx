import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import validator from 'validator';

import { registerWithEmail, authWithGoogle } from '../store/users/usersActions';
import { useDispatch } from 'react-redux';

import { Button } from '../components/Button';
import { Image } from '../components/Image';
import GoogleIcon from '../assets/GoogleIcon.png';
import { Input } from '../components/Input';
import { Container } from '../components/Container';
import { Title } from '../components/Title';
import { VisibilityOn } from '../assets/VisibilityOn';
import { VisibilityOff } from '../assets/VisibilityOff';
import { loginOptions, passwordOptions } from '../constants/validationConst';
import { ProgressBar } from '../components/ProgressBar';
import { googleLoginUrl } from '../constants/queryGoogleAuth';

interface IForm {
  email: string;
  login: string;
  password: string;
}

interface IInputValidation {
  email: boolean;
  login: boolean;
  password: number;
}

export const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<IForm>({
    email: '',
    login: '',
    password: '',
  });

  const [inputValidation, setInputValidation] = useState<IInputValidation>({
    email: true,
    login: true,
    password: 20,
  });

  const [passStrong, setPassStrong] = useState<number>(0);

  const [visible, setVisible] = useState<boolean>(false);

  const dispatch = useDispatch();

  const validationCheck = (e: any) => {
    setInputValidation({
      email: validator.isEmail(form.email),
      login: validator.isLength(form.login, loginOptions),
      //@ts-ignore
      password: validator.isStrongPassword(form.password, {
        ...passwordOptions,
        returnScore: true,
      }),
    });
  };

  const submitRegistrationForm = (e: any) => {
    e.preventDefault();
    if (
      inputValidation.email &&
      inputValidation.password > 15 &&
      inputValidation.login
    ) {
      dispatch(registerWithEmail(form.login, form.email, form.password));
      setForm({ login: '', password: '', email: '' });
    }
  };

  const changeHandler = (event: any) => {
    if (event.target.name === 'password') {
      //@ts-ignore
      let strong: number = validator.isStrongPassword(event.target.value, {
        ...passwordOptions,
        returnScore: true,
      });
      setInputValidation({ ...inputValidation, password: strong });
      setPassStrong(strong);
    } else
      setInputValidation({ ...inputValidation, [event.target.name]: true });
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
                valid={inputValidation.email}
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
                valid={inputValidation.login}
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
                valid={inputValidation.password > 15 ? true : false}
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
              <ProgressBar fill={passStrong} maxFill={50} />
            </Container>

            <Container pos="center">
              <Button
                styleType="extraSmallText"
                onClick={(e) => {
                  validationCheck(e);
                }}
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
