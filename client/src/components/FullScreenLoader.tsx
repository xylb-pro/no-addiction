import React from 'react';

import '../styles/fullScreenLoader.css';

export const FullScreenLoader: React.FC = () => {
  return (
    <>
      <div className="full-screen-loader--wrapper">
        <div className="full-screen-loader"></div>
      </div>
    </>
  );
};
