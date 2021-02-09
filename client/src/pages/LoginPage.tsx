import React, { useState } from 'react';
import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { loginWithEmail } from '../store/users/usersActions';

import { Link } from 'react-router-dom';
import { Image } from '../components/Image';
import { Title } from '../components/Title';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import GoogleIcon from '../assets/GoogleIcon.png';
import { Container } from '../components/Container';
import { VisibilityOn } from '../assets/VisibilityOn';
import { VisibilityOff } from '../assets/VisibilityOff';
import { useInputValidation } from '../hooks/useInputValidation.hook';

interface IForm {
  authLogin: string;
  authPassword: string;
}

//TODO write comment to EVERY function (with types:D)
export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState<boolean>(false);

  const [form, setForm] = useState<IForm>({
    authLogin: '',
    authPassword: '',
  });

  const [isValidLogin] = useInputValidation(form.authLogin, 'login');
  const [isValidPassword] = useInputValidation(form.authPassword, 'password');

  const [isValidLoginOnSubmit, setIVLOS] = useState<boolean>(true);
  const [isValidPasswordOnSubmit, setIVPOS] = useState<boolean>(true);

  const submitLoginForm = (e: any) => {
    e.preventDefault();
    let valid = 0;
    if (isValidLogin) {
      valid++;
    } else setIVLOS(false);
    if (isValidPassword) {
      valid++;
    } else setIVPOS(false);
    if (valid === 2) {
      dispatch(loginWithEmail(form.authLogin, form.authPassword));
      setForm({ authLogin: '', authPassword: '' });
    } // else login and pass not valid
  };

  const changeHandler = (event: any) => {
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
                name="authLogin"
                onChange={(e) => changeHandler(e)}
                value={form.authLogin}
                valid={isValidLoginOnSubmit || isValidLogin}
                id="authLogin"
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
                name="authPassword"
                onChange={(e) => changeHandler(e)}
                value={form.authPassword}
                style={{ paddingRight: '36px' }}
                valid={isValidPasswordOnSubmit || isValidPassword}
                id="authPassword"
              >
                Минимальная длина пароля 6 символов
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
              <Button styleType="extraSmallText" type="submit" form="loginForm">
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
