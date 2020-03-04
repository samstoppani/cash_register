import { combineReducers } from 'redux';
import priceReducer from './priceReducer';
import cashReducer from './cashReducer';
import tillReducer from './tillReducer';
import statusReducer from './statusReducer';

export default combineReducers({
    price: priceReducer,
    cashGiven: cashReducer,
    till: tillReducer,
    status: statusReducer
});
    