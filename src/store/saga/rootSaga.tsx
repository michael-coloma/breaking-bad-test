import { all } from "redux-saga/effects";
import { userActionsMainSaga } from "./userActions";

const rootSaga = function* () {
  yield all([userActionsMainSaga()]);
};

export default rootSaga;
