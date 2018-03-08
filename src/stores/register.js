import { RegisterTypes } from '../actionTypes/register';

const initialState = {
  users: []
};

export default function register(state = initialState, action) {
  switch (action.type) {
    case RegisterTypes.GET_USERS:
      return {
        ...state,
        users: action.data
      };
    default:
      return state;
  }
}

register.reducer = 'register';
