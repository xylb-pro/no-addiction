import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../components/Button';
import { Container } from '../components/Container';
import { RootState } from '../store/rootReducer';

import { inAddictionChange } from '../store/timers/timersActions';
import { selectCurrentCategoryById } from '../store/users/usersReducer';
import { Quote } from './Quote';

export const InAddiction: React.FC = () => {
  const currentCategory = useSelector((state: RootState) =>
    selectCurrentCategoryById(state, state.users.currentCategoryId),
  );
  const dispatch = useDispatch();
  return (
    <>
      <Quote marginBottom="60px" />
      <Container margin="0 auto" pos="center">
        <Button
          onClick={() => {
            dispatch(inAddictionChange());
          }}
          styleType="oneWordOneLine"
        >
          Gige up {currentCategory.name}
        </Button>
      </Container>
    </>
  );
};
