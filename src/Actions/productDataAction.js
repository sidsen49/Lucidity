import axios from "axios";
import uuid from 'react-uuid';

export const SET_DATA = 'SET_DATA';
export const DATA_ERROR = 'DATA_ERROR';
export const TOGGLE_VIEW = 'TOGGLE_VIEW';

// This action creator set the new or modified products data
export const setData = (data) => ({ type: SET_DATA, payload: data });

// This action creator helps to view specific product or group of product.
export const toggleViewAction = (data) => ({ type: TOGGLE_VIEW, payload: data });

// Thunk call to fetch the data from api, we also adding uuid and isShow flag to control the visibility.
export const fetchData = () => {
    return (dispatch) => {
      axios.get('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
        .then(response => {
          const data = response.data;
          dispatch(setData(data.map(element => {
            const newProductObject = {...element}
            newProductObject['isShow'] = true;
            newProductObject['uuid'] = uuid();
            return newProductObject
        })));
        })
        .catch(error => {
        console.error(error);
        });
    };
  };
