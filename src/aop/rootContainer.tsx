import React from 'react';
import { getToken } from './request';
import { history } from '@umijs/max';

export default (container: React.ReactNode) => {
  const token = getToken();
  if (!token) history.push('/login');
  //   return React.createElement(null, container);
  return container;
};
