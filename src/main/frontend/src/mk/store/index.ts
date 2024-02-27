import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./reducer";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReduer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReduer,
  middleware: (getDefaultMiddleware) => {
    // if (__DEV__) {
    //   const createDebugger = require("redux-flipper").default;
    //   return getDefaultMiddleware().concat(createDebugger());
    // }
    return getDefaultMiddleware();
  },
});
export default store;

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
