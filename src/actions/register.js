import { get, post, put } from '../utils/api';
import { RegisterTypes } from '../actionTypes/register';

export const selectUser = id => ({ type: RegisterTypes.SELECT_USER, data: id });

export const updateUser = user => ({ type: RegisterTypes.EDIT_USER, data: user });

export const getUsers = () => dispatch =>
  get('users')
    .then(res => dispatch({ type: RegisterTypes.GET_USERS, data: res }));

export const createUser = user => dispatch =>
  post('users', user)
    .then(res => dispatch({ type: RegisterTypes.CREATE_USER, data: res }));
    
export const editUser = (user, id) => dispatch =>
  put(`users/${id}`, user)
    .then(res => dispatch({ type: RegisterTypes.UPDATE_USER, data: res }));

export default {
  getUsers,
  createUser,
  selectUser
};
