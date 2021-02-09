import React, { HTMLAttributes } from 'react';

import styled from 'styled-components';
import { colors } from '../styles/colors';

import { Title } from './Title';

interface IMainLogo extends HTMLAttributes<HTMLDivElement> {
  children: String;
}

export const MainLogo: React.FC<IMainLogo> = ({ children, ...rest }) => {
  return (
    <Wrapper {...rest}>
      {children !== 'LOADING' ? (
        <>
          <Title fz="82px" color={colors.$red}>
            NO
          </Title>
          <CategoryTitle>
            {children.split('').map((letter, i) => (
              <h3 key={i}>{letter}</h3>
            ))}
          </CategoryTitle>
        </>
      ) : (
        <Title fz="26px" color={colors.$darkGray}>
          Loading
        </Title>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;

  position: relative;
  user-select: none;
`;

const CategoryTitle = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;

  display: flex;
  justify-content: space-evenly;

  font-size: 32px;
`;
