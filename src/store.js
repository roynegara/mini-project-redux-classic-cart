import { createStore, combineReducers, applyMiddleware } from 'redux';
import cartReducer from './features/cart/cartSlice';
import modalReducer from './features/modal/modalSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    cart: cartReducer,
    modal: modalReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store