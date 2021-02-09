import React from 'react';

import logo from '../assets/logoNoAlco.png';

import { Container } from '../components/Container';
import { Image } from '../components/Image';
import { scrollToElement } from '../functions/scrollToElement';
import { Arrow } from '../assets/Arrow';

export const CategoriesNav: React.FC = () => {
  return (
    <>
      <Container
        style={{
          flexBasis: '33.3333%',
        }}
        pos="start"
      >
        <Container width="34px" style={{ cursor: 'pointer' }}>
          <Arrow isLeft />
        </Container>
        <Image
          src={logo}
          width="300px"
          onClick={() => {
            scrollToElement('#');
          }}
          cursor="pointer"
        />
        <Container width="34px" style={{ cursor: 'pointer' }}>
          <Arrow />
        </Container>
      </Container>
    </>
  );
};
