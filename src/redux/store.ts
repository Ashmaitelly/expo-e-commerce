import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./slices/userSlice";
import appSLice from "./slices/appSlice";

const rootReducer = combineReducers({
  user: userSlice,
  app: appSLice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["user", "app"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
