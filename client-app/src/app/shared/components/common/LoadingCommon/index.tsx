import React from 'react';
import Loading, { LoadingProps } from '../Loading';

const LoadingCommon: React.FC<LoadingProps> = (props) => {
  return <Loading variant="primary" size="small" loadingStyle={5} {...props} />;
};

export default LoadingCommon;
