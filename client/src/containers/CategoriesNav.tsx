import React from 'react';

import { Container } from '../components/Container';
import { scrollToElement } from '../functions/scrollToElement';
import { Arrow } from '../assets/Arrow';
import { changeCurrentCategoryId } from '../store/users/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import {
  selectUserOnlyCurrentCategories,
  selectCurrentCategoryById,
} from '../store/users/usersReducer';
import { MainLogo } from '../components/MainLogo';

export const CategoriesNav: React.FC = () => {
  const dispatch = useDispatch();
  const currentCategoriesLength = useSelector((state: RootState) =>
    selectUserOnlyCurrentCategories(state),
  ).length;

  const currentCategoryById = useSelector((state: RootState) =>
    selectCurrentCategoryById(state, state.users.currentCategoryId),
  );

  const makeArrowInvisible = (): React.CSSProperties | undefined => {
    if (currentCategoriesLength === 1) return { visibility: 'hidden' };
  };

  return (
    <>
      <Container
        style={{
          flexBasis: '33.3333%',
        }}
        pos="start"
      >
        <Container
          width="34px"
          style={{
            cursor: 'pointer',
            ...makeArrowInvisible(),
            userSelect: 'none',
          }}
          onClick={() => dispatch(changeCurrentCategoryId('left'))}
        >
          <Arrow isLeft />
        </Container>
        <MainLogo
          onClick={() => {
            scrollToElement('#');
          }}
          style={{ cursor: 'pointer' }}
        >
          {currentCategoryById.id !== -1 ? currentCategoryById.name : 'LOADING'}
        </MainLogo>
        <Container
          width="34px"
          style={{
            cursor: 'pointer',
            ...makeArrowInvisible(),
            userSelect: 'none',
          }}
          onClick={() => dispatch(changeCurrentCategoryId('right'))}
        >
          <Arrow />
        </Container>
      </Container>
    </>
  );
};
