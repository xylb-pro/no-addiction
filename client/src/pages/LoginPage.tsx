import React, { useState } from 'react';
import styled from 'styled-components';
import validator from 'validator';

import { useDispatch } from 'react-redux';
import { loginWithEmail } from '../store/users/usersActions';

import { Button } from '../components/Button';
import { Image } from '../components/Image';
import GoogleIcon from '../assets/GoogleIcon.png';
import { Input } from '../components/Input';
import { Container } from '../components/Container';
import { Title } from '../components/Title';
import { VisibilityOn } from '../assets/VisibilityOn';
import { VisibilityOff } from '../assets/VisibilityOff';
import { loginOptions } from '../constants/validationConst';
import { Link } from 'react-router-dom';

interface IForm {
  loginAuth: string;
  passwordAuth: string;
}
interface IInputValidation {
  loginAuth?: boolean;
  passwordAuth?: boolean;
}

//TODO write comment to EVERY function (with types:D)
export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<IForm>({
    loginAuth: '',
    passwordAuth: '',
  });
  const [inputValidation, setInputValidation] = useState<IInputValidation>({
    loginAuth: true,
    passwordAuth: true,
  });
  const [visible, setVisible] = useState<boolean>(false);

  const validationCheck = (e: any) => {
    setInputValidation({
      loginAuth: validator.isLength(form.loginAuth, loginOptions),
      passwordAuth: validator.isLength(form.passwordAuth, { min: 6 }),
    });
  };

  const submitLoginForm = (e: any) => {
    e.preventDefault();

    if (inputValidation.loginAuth && inputValidation.passwordAuth) {
      dispatch(loginWithEmail(form.loginAuth, form.passwordAuth));
      setForm({ loginAuth: '', passwordAuth: '' });
    }
  };

  const changeHandler = (event: any) => {
    setInputValidation({ ...inputValidation, [event.target.name]: true });
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const changeVisible = (e: any) => {
    setVisible((pre) => !pre);
  };

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
          <LoginGoogleButton>
            <Image src={GoogleIcon} alt="" width="14px" margin="0 16px 0 0" />
            Login with Google
          </LoginGoogleButton>
        </Container>
        <Container>
          <Container marginBottom="32px" margin="0 auto">
            <Title fz="64px">Авторизоваться</Title>
          </Container>
          <form onSubmit={(e) => submitLoginForm(e)} id="loginForm">
            <Container
              marginBottom="16px"
              maxWidth="360px"
              margin="0 auto"
              position="relative"
            >
              <Input
                placeholder="E-Mail or Login"
                type="text"
                name="loginAuth"
                onChange={(e) => changeHandler(e)}
                value={form.loginAuth}
                valid={inputValidation.loginAuth}
                id="loginAuth"
              >
                Минимальная длина логина/почты 5 символов
              </Input>
            </Container>
            <Container
              marginBottom="32px"
              maxWidth="360px"
              margin="0 auto"
              position="relative"
            >
              <Input
                placeholder="Password"
                type={visible ? 'text' : 'password'}
                name="passwordAuth"
                onChange={(e) => changeHandler(e)}
                value={form.passwordAuth}
                style={{ paddingRight: '36px' }}
                valid={inputValidation.passwordAuth}
                id="passwordAuth"
              >
                Минимальная длина пароля 5 символов
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
            <Container pos="center">
              <Button
                styleType="extraSmallText"
                onClick={(e) => {
                  validationCheck(e);
                }}
                type="submit"
                form="loginForm"
              >
                Авторизоваться
              </Button>
            </Container>
          </form>

          <Container margin="60px auto 0" style={{ textAlign: 'center' }}>
            <Text>Нет учетной записи NoAddiction?</Text>
            <Link
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: ' 14px',
                margin: '0px auto',
                textAlign: 'center',
              }}
              to="/register"
            >
              Зарегистрироваться
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
