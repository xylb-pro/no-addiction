import React from 'react';
import { Container } from './Container';
import { SecondButton } from './SecondButton';
import { Title } from './Title';

interface IConfirmWindow {
  mainAction?(): void;
  secondAction?(): void;
}

export const ConfirmWindow: React.FC<IConfirmWindow> = ({
  mainAction = () => {},
  secondAction = () => {},
}) => {
  return (
    <>
      <Container margin="0 auto 30px">
        <Title ff="Alegreya Sans" fz="24px">
          Are you sure that you want stop current timer?
        </Title>
      </Container>
      <Container pos="space-between" justifyContent="space-evenly">
        <SecondButton
          design="normal"
          padding="10px 20px"
          onClick={() => secondAction()}
        >
          Cancel
        </SecondButton>
        <SecondButton
          design="negative"
          padding="10px 28px"
          onClick={() => mainAction()}
        >
          Stop
        </SecondButton>
      </Container>
    </>
  );
};
