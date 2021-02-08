import React from 'react';

import '../styles/loader.css';

interface ILoader {
  isLoading?: boolean;
}

export const Loader: React.FC<ILoader> = ({ isLoading = false }) => {
  return (
    <>
      <div className="wrapper" style={{ display: isLoading ? 'flex' : 'none' }}>
        <div className="loader" />
      </div>
    </>
  );
};
