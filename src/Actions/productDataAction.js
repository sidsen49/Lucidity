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
    // const xx = [
    //     {
    //         "name": "Bluetooth",
    //         "category": "Electronic",
    //         "value": "$150",
    //         "quantity": 5,
    //         "price": "$30"
    //     },
    //     {
    //         "name": "Edifier M43560",
    //         "category": "Electronic",
    //         "value": "0",
    //         "quantity": 0,
    //         "price": "$0"
    //     },
    //     {
    //         "name": "Sony 4k ultra 55 inch TV",
    //         "category": "Electronic",
    //         "value": "$1190",
    //         "quantity": 17,
    //         "price": "$70"
    //     },
    //     {
    //         "name": "Samsumg 55 inch TV",
    //         "category": "Electronic",
    //         "value": "$600",
    //         "quantity": 50,
    //         "price": "$12"
    //     },
    //     {
    //         "name": "samsumg S34 Ultra",
    //         "category": "phone",
    //         "value": "$0",
    //         "quantity": 0,
    //         "price": "$0"
    //     }
    // ]
    // dispatch(setData(xx.map(element => { 
    //     const newProductObject = {...element}
    //     newProductObject['isShow'] = true;
    //     newProductObject['uuid'] = uuid();
    //     return newProductObject
    // })));
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
