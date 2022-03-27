import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import rootSaga from "./saga/rootSaga";
import { EnumUserActions } from "./actions/userActionsTypes";

const sagaMiddleware = createSagaMiddleware();

const localStorageMiddleware = ({ getState }: any) => {
  return (next: any) => (action: any) => {
    const result = next(action);
    if ([EnumUserActions.CHANGE_LANGUAGE_REQUEST].includes(result.type)) {
      localStorage.setItem("userActionsSate", JSON.stringify(getState()));
    }

    return result;
  };
};

//To get stateInital via localStorage and keep persistent the language selected
export const reHydrateStore = () => {
  return JSON.parse(localStorage.getItem("userActionsSate") || "{}");
};

const store = createStore(
  rootReducer,
  reHydrateStore(),
  composeWithDevTools(applyMiddleware(sagaMiddleware, localStorageMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
