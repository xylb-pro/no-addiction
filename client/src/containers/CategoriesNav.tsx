import React from 'react';

import logoNoAlco from '../assets/logoNoAlco.png';
import logoNoMasturbate from '../assets/logoNoMasturbate.png';
import logoNoDrugs from '../assets/logoNoDrugs.png';
import logoNoSmoking from '../assets/logoNoSmoking.png';

import { Container } from '../components/Container';
import { Image } from '../components/Image';
import { scrollToElement } from '../functions/scrollToElement';
import { Arrow } from '../assets/Arrow';
import { changeCurrentCategoryId } from '../store/users/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { selectUserOnlyCurrentCategories } from '../store/users/usersReducer';

export const CategoriesNav: React.FC = () => {
  const dispatch = useDispatch();
  const currentCategoriesLength = useSelector((state: RootState) =>
    selectUserOnlyCurrentCategories(state),
  ).length;
  const currentCategoryId = useSelector(
    (state: RootState) => state.users.currentCategoryId,
  );

  const makeArrowInvisible = (): React.CSSProperties | undefined => {
    if (currentCategoriesLength === 1) return { visibility: 'hidden' };
  };

  //TODO change to сверстанные компоненты
  const returnLogoById = () => {
    switch (currentCategoryId) {
      case 1:
        return logoNoAlco;
      case 2:
        return logoNoDrugs;
      case 3:
        return logoNoSmoking;
      case 4:
        return logoNoMasturbate;
      default:
        return logoNoMasturbate;
    }
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
        <Image
          src={returnLogoById()}
          width="300px"
          onClick={() => {
            scrollToElement('#');
          }}
          cursor="pointer"
        />
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
