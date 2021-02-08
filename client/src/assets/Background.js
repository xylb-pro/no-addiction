import styled from 'styled-components';

export const Background = () => {
  return (
    <Wrapper>
      <svg
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0)">
          <rect width="1920" height="1080" fill="#F1F1F1" />
          <rect
            x="2138.72"
            y="-48.5042"
            width="878.852"
            height="2053.21"
            transform="rotate(53.1698 2138.72 -48.5042)"
            fill="#A9A9A9"
          />
          <rect
            x="1410.33"
            y="-587.257"
            width="878.852"
            height="2053.21"
            transform="rotate(46.988 1410.33 -587.257)"
            fill="#D3D3D3"
          />
          <rect
            x="100.594"
            y="-386"
            width="797"
            height="1371.93"
            transform="rotate(29 100.594 -386)"
            fill="#949494"
          />
        </g>
        <defs>
          <clipPath id="clip0">
            <rect width="1920" height="1080" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -2;
`;
