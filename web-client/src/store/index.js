import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from "./reducers";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'dashboard', 'app']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        persistedReducer,
        composeEnhancer(applyMiddleware(thunk, logger)),
    );
    let persistor = persistStore(store)
    return { store, persistor }
}

export default configureStore;
