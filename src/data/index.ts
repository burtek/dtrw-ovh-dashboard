import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tilesReducer } from './tiles';

const reducer = combineReducers({
    tiles: tilesReducer
});
const persistedReducer = persistReducer(
    {
        key: 'root',
        storage
    },
    reducer
);
export type AppState = ReturnType<typeof reducer>;

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
