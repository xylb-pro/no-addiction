import React from 'react';
import styled from 'styled-components';

type ModalType = {
  children: React.ReactNode;
  isOpened: boolean;
  setIsOpened: () => void;
  maxWidth?: string;
  padding?: string;
};

export const Modal: React.FC<ModalType> = ({
  children,
  isOpened,
  setIsOpened,
  maxWidth,
  padding = '24px',
}) => {
  return (
    <>
      {isOpened && (
        <ModalWrapper
          onClick={() => setIsOpened()}
          backdrop={isOpened ? 'blur(15px)' : 'blur(0px)'}
        >
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            width={maxWidth}
            padding={padding}
          >
            {children}
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

const ModalWrapper = styled.div<{ backdrop?: string }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  /* background-color: #00000099; */
  backdrop-filter: ${(p) => p.backdrop};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: backdrop-filter 10s ease 10s;
`;

const ModalContent = styled.div<{ width?: string; padding?: string }>`
  position: relative;
  /* background-color: #00000040; */
  background-color: #ffffff;
  border-radius: 20px;
  max-width: ${(props) => props.width};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  box-shadow: 0px 8px 29px rgba(0, 0, 0, 0.4);
`;
