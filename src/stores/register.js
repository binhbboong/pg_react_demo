import { RegisterTypes } from '../actionTypes/register';

const initialState = {
  users: [],
  userSelected: {}
};

export default function register(state = initialState, action) {
  switch (action.type) {
    case RegisterTypes.GET_USERS:
      return {
        ...state,
        users: action.data
      };
    case RegisterTypes.CREATE_USER: 
    {
      const cloneState = { ...state };
      cloneState.users.push(action.data);
      return cloneState;
    }  
    case RegisterTypes.SELECT_USER:
      return {
        ...state,
        userSelected: { ...state.users.find(u => u.id === action.data) }
      };
    case RegisterTypes.UPDATE_USER:
    {
      const cloneState = { ...state };
      cloneState.users[cloneState.users.findIndex(user => user.id === action.data.id)] = action.data;
      return cloneState;
    }
    case RegisterTypes.EDIT_USER:
      return {
        ...state,
        userSelected: action.data
      };
    default:
      return state;
  }
}

register.reducer = 'register';
