// reducer.js
import {
    SET_USER_TYPE
} from '../Actions/userActions';
  
  const initialState = {
    userType: 'Admin'
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_TYPE:
        return {
          ...state,
          userType: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;