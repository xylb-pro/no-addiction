import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { registerWithEmail, authWithGoogle } from '../store/users/usersActions';
import { useDispatch } from 'react-redux';

import { Image } from '../components/Image';
import { InputField } from '../components/InputField';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import GoogleIcon from '../assets/GoogleIcon.png';
import { Container } from '../components/Container';
import { VisibilityOn } from '../assets/VisibilityOn';
import { VisibilityOff } from '../assets/VisibilityOff';
import { googleLoginUrl } from '../constants/queryGoogleAuth';
import { useInputValidation } from '../hooks/useInputValidation.hook';

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

  const [isValidLogin, loginInvalidMsg] = useInputValidation(
    form.login,
    'login'
  );
  const [isValidEmail, emailInvalidMsg] = useInputValidation(
    form.email,
    'email'
  );
  const [isValidPassword, passwordInvalidMsg] = useInputValidation(
    form.password,
    'passwordOnReg'
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
      setIVLOS(true);
      setIVPOS(true);
      setIVEOS(true);
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
              <InputField
                placeholder="E-Mail"
                type="text"
                name="email"
                onChange={(e) => changeHandler(e)}
                value={form.email}
                valid={isValidEmailOnSubmit || isValidEmail}
                readOnly
                onFocus={(e) => {
                  removeReadonly(e);
                }}
                messageText={emailInvalidMsg}
              />
            </Container>
            <Container
              marginBottom="16px"
              maxWidth="360px"
              margin="0 auto"
              position="relative"
            >
              <InputField
                placeholder="Login"
                type="text"
                name="login"
                onChange={(e) => changeHandler(e)}
                value={form.login}
                valid={isValidLoginOnSubmit || isValidLogin}
                messageText={loginInvalidMsg}
              />
            </Container>
            <Container
              maxWidth="360px"
              margin="0 auto"
              marginBottom="10px"
              position="relative"
            >
              <InputField
                placeholder="Password"
                type={visible ? 'text' : 'password'}
                name="password"
                onChange={(e) => changeHandler(e)}
                value={form.password}
                valid={isValidPassword || isValidPaswordOnSubmit}
                style={{ paddingRight: '36px' }}
                messageText={passwordInvalidMsg}
              />

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
            {/* <Container maxWidth="360px" margin="0px auto 30px">
              <ProgressBar
                fill={passwordStrong}
                maxFill={globalPasswordMaxStrong}
                passwordLength={form.password.length}
              />
            </Container> */}

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
