import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/rootReducer';

const enhancer = compose(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

export default store;

