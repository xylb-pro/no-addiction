import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from '../components/Container';
import { SecondButton } from '../components/SecondButton';
import { colors } from '../styles/colors';
import { RootState } from '../store/rootReducer';
import { selectCurrentCategoryById } from '../store/users/usersReducer';
import styled from 'styled-components';

// import { categories } from '../store/users/usersTypes';

type ReturnLastTimerType = {
  // category: categories;
};

export const ReturnLastTimer: React.FC<ReturnLastTimerType> = () => {
  const { currentCategory, preCurrentTimer } = useSelector(
    (state: RootState) => {
      return {
        currentCategory: selectCurrentCategoryById(
          state,
          state.users.currentCategoryId,
        ),
        preCurrentTimer: state.timers.preCurrentTimer,
      };
    },
  );

  return (
    <>
      <SecondButton design="normal">Return</SecondButton>
      <Container style={{ textAlign: 'right' }}>
        <InfoText>
          In category{' '}
          <ImportantText color={colors.$pink}>
            {currentCategory.name}
          </ImportantText>{' '}
          begin date:{' '}
          <ImportantText color={colors.$black}>
            {preCurrentTimer.beginDate}
          </ImportantText>
        </InfoText>
        <InfoText>
          Was stopped:{' '}
          <ImportantText color={colors.$black}>
            {preCurrentTimer.endDate}
          </ImportantText>
        </InfoText>
      </Container>
    </>
  );
};

const InfoText = styled.p`
  color: ${colors.$black};
  font-family: 'Alegreya Sans';
  font-weight: '300';
`;

const ImportantText = styled.span<{ color?: string }>`
  font-family: 'Alegreya Sans';
  font-weight: 600;
  color: ${(props) => props.color};
`;
