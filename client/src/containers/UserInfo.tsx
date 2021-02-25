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
import { InputField } from '../components/InputField';
import { VisibilityOn } from '../assets/VisibilityOn';
import { VisibilityOff } from '../assets/VisibilityOff';
import { useInputValidation } from '../hooks/useInputValidation.hook';

interface IForm {
  oldPassword: string;
  newPassword: string;
}

export const UserInfo: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  ...rest
}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.users);

  const [displayPasswordField, setDisplayPasswordField] = useState<boolean>(
    false
  );
  const [visible, setVisible] = useState<boolean>(false);

  const [form, setForm] = useState<IForm>({
    oldPassword: '',
    newPassword: '',
  });

  const [isValidOldPassword, oldPasswordInvalidMsg] = useInputValidation(
    form.oldPassword,
    'password'
  );
  const [isValidNewPassword, newPasswordInvalidMsg] = useInputValidation(
    form.newPassword,
    'passwordOnReg'
  );

  const [isValidOldPasswordOnSubmit, setIVOPOS] = useState<boolean>(true);
  const [isValidNewPasswordOnSubmit, setIVNPOS] = useState<boolean>(true);

  const submitChangePasswordForm = (e: any) => {
    e.preventDefault();
    if (displayPasswordField) {
      if (form.newPassword === '' && form.oldPassword === '') {
        setDisplayPasswordField(false);
        return;
      }
      let valid = 0;
      console.log(`isValidNewPassword = ${isValidNewPassword}`);
      if (isValidOldPassword) {
        valid++;
      } else setIVOPOS(false);
      if (isValidNewPassword) {
        valid++;
      } else setIVNPOS(false);
      if (valid === 2) {
        dispatch(changeUserPassword(form.oldPassword, form.newPassword));
        setForm({ oldPassword: '', newPassword: '' });
        setIVOPOS(true);
        setIVNPOS(true);
        setDisplayPasswordField(false);
      }
    } else setDisplayPasswordField(true);
  };

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(isValidNewPassword, form.newPassword);
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
          submitChangePasswordForm(e);
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
        <Container display={displayPasswordField ? 'block' : 'none'}>
          <Container marginTop="10px" position="relative">
            <InputField
              placeholder="oldPassword"
              type="password"
              name="oldPassword"
              onChange={(e) => changeHandler(e)}
              value={form.oldPassword}
              valid={isValidOldPasswordOnSubmit || isValidOldPassword}
              style={{ paddingRight: '36px' }}
              messageText={oldPasswordInvalidMsg}
            />
          </Container>
          <Container position="relative">
            <Container marginTop="10px">
              <InputField
                placeholder="newPassword"
                type={visible ? 'text' : 'password'}
                name="newPassword"
                onChange={(e) => changeHandler(e)}
                value={form.newPassword}
                valid={isValidNewPasswordOnSubmit || isValidNewPassword}
                style={{ paddingRight: '36px' }}
                messageText={newPasswordInvalidMsg}
              />
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
          </Container>
          {/* <Container maxWidth="95%" margin="10px auto 0px">
          <ProgressBar
            fill={newPasswordStrong}
            passwordLength={form.newPassword.length}
          />
        </Container> */}
        </Container>
      </form>
    </Container>
  );
};
