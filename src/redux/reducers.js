import { combineReducers } from 'redux';
import data from './data';

function store(state = data,action) {
    switch(action.type) {
        case 'REFRESHING':
            return { ...state, refreshing: action.text } 
        case 'IMG_URL':
            return { ...state, imgUrl: action.text } 
        default:
            return state
    }
}


export default combineReducers({
    store
});