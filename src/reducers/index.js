import { Actions } from '../actions';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.ON_MY_FIELD_CHANGE:
      return {...state, [action.name]: action.value};
    default:
      return state;
  }
}