/* eslint-disable no-return-await */
import api from '../context/serverContext';

export const LoginApi = async (param) => await api({
  url: '/login',
  type: 'post',
  param,
});

