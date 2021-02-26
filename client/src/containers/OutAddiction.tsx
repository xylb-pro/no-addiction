import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentTimer } from '../store/timers/timersActions';

import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { CountDown } from './CountDown';
import { Quote } from './Quote';
import { Modal } from './Modal';
import { ConfirmWindow } from '../components/ConfirmWindow';
import { RootState } from '../store/rootReducer';

export const OutAddiction: React.FC = () => {
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { isOnConfirmWindow } = useSelector((state: RootState) => {
    return {
      isOnConfirmWindow: state.users.settings.confirmWindow,
    };
  });
  return (
    <>
      <Modal setIsOpened={() => setIsOpened(false)} isOpened={isOpened}>
        <ConfirmWindow
          mainAction={() => dispatch(clearCurrentTimer())}
          modalCloseAction={() => setIsOpened(false)}
        />
      </Modal>
      <CountDown />
      <Container margin="0 auto" pos="center">
        <Button
          onClick={() =>
            isOnConfirmWindow
              ? setIsOpened(true)
              : dispatch(clearCurrentTimer())
          }
          styleType="main"
        >
          i fucked up
        </Button>
      </Container>
      <Quote marginTop="60px" />
    </>
  );
};
