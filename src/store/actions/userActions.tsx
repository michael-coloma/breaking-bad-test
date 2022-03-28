import { UserActionsState } from "../reducers/userActions";
import { EnumUserActions } from "./userActionsTypes";

export interface UserActionsAction {
  type: string;
  data: UserActionsState;
}

export const changeLanguageRequest = (language: string) => {
  return {
    type: EnumUserActions.CHANGE_LANGUAGE_REQUEST,
    data: { language },
  };
};

export const changeLanguageSuccess = (data: any) => {
  return {
    type: EnumUserActions.CHANGE_LANGUAGE_SUCCESS,
    data,
  };
};

export const changeLanguageFail = (data: any) => {
  return {
    type: EnumUserActions.CHANGE_LANGUAGE_FAIL,
    data,
  };
};
