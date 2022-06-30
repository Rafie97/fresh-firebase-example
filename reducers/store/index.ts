import { applyMiddleware, createStore, Reducer } from "redux";
import { stateType, mainReducer } from "../mainReducer";
import { persistStore, persistReducer, createTransform } from "redux-persist";
import { PersistConfig } from "redux-persist/es/types";

const persistConfig: PersistConfig<stateType> = {
  key: `bigapp`,
  whitelist: ["user", "orders", "appPersist", "adminPersist"],
  storage: localStorage,
};

const persistedReducer = persistReducer<stateType>(persistConfig, mainReducer);
const store = createStore(persistedReducer);

const configureStore = () => {
  return { store };
};

export default configureStore();
