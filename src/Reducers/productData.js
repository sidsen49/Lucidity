import { SET_DATA } from '../Actions/productDataAction';
import { EDIT_ACTION, TOGGLE_EDIT } from '../Actions/editAction';


// Initial State contains the set of products data(new/modified data), isEdit to toffle the modal, editProductdata hold the selected product for editing.
const initialState = {
    data: [],
    isEdit: false,
    editProductData: {},
}

const dataReducer = (state = initialState, action) => {
    switch(action.type) {
      case SET_DATA:
        return {
          ...state,
          data: [ ...action.payload ]
        }
      case EDIT_ACTION:
        return {
          ...state,
          editProductData: action.payload
        }
      case TOGGLE_EDIT: 
        return {
          ...state,
          isEdit: action.payload
        }
      default:
        return state
    }
}

export default dataReducer;
