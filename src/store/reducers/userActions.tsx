import { UserActionsAction } from "../actions/userActions";
import { EnumUserActions } from "../actions/userActionsTypes";

export const DEFAULT_LANGUAGE = "es";

export interface UserActionsState {
  language: string;
  message?: "success" | "error";
  data: Record<string, string>;
}

const initialState = {
  language: DEFAULT_LANGUAGE,
  data: {},
};

export const userActionsReducer = (
  state = initialState,
  action: UserActionsAction
) => {
  switch (action.type) {
    case EnumUserActions.CHANGE_LANGUAGE_REQUEST:
      return {
        ...initialState,
        language: action.data.language,
      };
    case EnumUserActions.CHANGE_LANGUAGE_SUCCESS:
      return { ...initialState, message: "success", data: action.data.data };
    case EnumUserActions.CHANGE_LANGUAGE_FAIL:
      return { ...initialState, message: "error" };
    default:
      return state;
  }
};
