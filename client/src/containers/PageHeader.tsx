import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { inAddictionChange } from '../store/timers/timersActions';

import { Container } from '../components/Container';
import { Image } from '../components/Image';
import { Title } from '../components/Title';
import { SwitchButton } from '../components/SwitchButton';
import { colors } from '../styles/colors';
import { Button } from '../components/Button';

import logo from '../assets/logoNoAlco.png';
import profileIcon from '../assets/profileIcon.png';
import { scrollToElement } from '../functions/scrollToElement';
import { Link, Route, useHistory, useLocation } from 'react-router-dom';
import { Modal } from './Modal';
import { SettingsPage } from '../pages/SettingsPage';
import usePrepareLink from '../hooks/usePrepareLink';

export const PageHeader: React.FC = () => {
  const inAddiction = useSelector(
    (state: RootState) => state.timers.inAddiction
  );

  const dispatch = useDispatch();
  const history = useHistory();
  const locate = useLocation();

  // @ts-ignore
  const settingsLink = usePrepareLink({
    to: '/noAlco/settings',
    isRelativePath: true,
  });

  return (
    <header id="#">
      <Container
        position="fixed"
        style={{
          top: 0,
          height: '100px',
          backgroundColor: colors.$gray,
          zIndex: 11,
        }}
        width="100%"
      >
        <Container
          maxWidth="1600px"
          pos="space-between"
          alignItems="center"
          margin="0 auto"
          height="100%"
        >
          <Container
            style={{
              flexBasis: '33.3333%',
              textAlign: 'left',
            }}
          >
            <Image
              src={logo}
              width="300px"
              onClick={() => {
                scrollToElement('#');
                console.log('click');
              }}
              cursor="pointer"
            />
          </Container>
          <Container
            style={{
              flexBasis: '33.3333%',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Title fz="36px">Сейчас я пью</Title>
            <Container>
              <SwitchButton
                position={inAddiction}
                onClick={() => {
                  dispatch(inAddictionChange());
                }}
              />
            </Container>
          </Container>
          <Container
            style={{
              flexBasis: '33.3333%',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              styleType="extraSmallText"
              onClick={() => {
                scrollToElement('records');
              }}
              style={{ margin: '0 40px 0 0 ' }}
            >
              Leaderboard
            </Button>
            <Link to="/noAlco/settings">
              <Image src={profileIcon} width="70px" borderRadius="100%" />
            </Link>
            <Route
              path={settingsLink.pathname}
              children={({ match }) => {
                return (
                  <Modal
                    setIsOpened={history.goBack}
                    isOpened={!!match}
                    padding="50px"
                  >
                    <SettingsPage />
                  </Modal>
                );
              }}
            />
          </Container>
        </Container>
      </Container>
    </header>
  );
};
