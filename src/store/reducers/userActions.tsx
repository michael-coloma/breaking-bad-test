import { UserActionsAction } from "../actions/userActions";
import { EnumUserActions } from "../actions/userActionsTypes";

export interface UserActionsState {
  language: string;
  message?: string; //success or error
}

const initialState = {
  language: "es",
};

export const userActionsReducer = (
  state = initialState,
  action: UserActionsAction
) => {
  switch (action.type) {
    case EnumUserActions.CHANGE_LANGUAGE_REQUEST:
      return { ...initialState, language: action.data.language };
    case EnumUserActions.CHANGE_LANGUAGE_SUCCESS:
      return { ...initialState, message: "success" };
    case EnumUserActions.CHANGE_LANGUAGE_FAIL:
      return { ...initialState, message: "error" };
    default:
      return state;
  }
};
