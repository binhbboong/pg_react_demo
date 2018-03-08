import { get } from '../untils/api';
import { RegisterTypes } from '../actionTypes/register';

export const getUsers = () => dispatch =>
  get('users')
    .then(res => dispatch({ type: RegisterTypes.GET_USERS, data: res }));

export default {
  getUsers
};
