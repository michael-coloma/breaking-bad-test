import axios from "axios";
import {
  call,
  CallEffect,
  PutEffect,
  takeLatest,
  put,
} from "redux-saga/effects";

import { UserActionsAction } from "../actions/userActions";
import { EnumUserActions } from "../actions/userActionsTypes";
import { UserActionsState } from "../reducers/userActions";

export function* userActionsMainSaga() {
  yield takeLatest(EnumUserActions.CHANGE_LANGUAGE_REQUEST, userActionsSaga);
}

function* userActionsSaga(action: UserActionsAction): Generator<
  // step types
  CallEffect<any> | PutEffect<any>,
  // return type
  void,
  // intermediate argument
  any
> {
  const { language } = action.data;
  const location = window.location;
  const url = `${location.protocol}//${location.host}/assets/lang/${language}.json`;

  const getAxios = async () => {
    return await axios.get(url);
  };

  const data: UserActionsState = {
    data: {},
    language,
    message: "success",
  };

  try {
    const response = yield call(getAxios);

    yield put({
      type: EnumUserActions.CHANGE_LANGUAGE_SUCCESS,
      data: { ...data, data: response.data },
    });
  } catch {
    yield put({
      type: EnumUserActions.CHANGE_LANGUAGE_FAIL,
      data: { ...data, message: "error" },
    });
  }
}
