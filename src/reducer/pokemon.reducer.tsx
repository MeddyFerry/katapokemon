import { PokemonInterface } from "../interface/interface";

// pokemonReducer.ts
export interface StateType {
  isFetching: boolean;
  isLoading: boolean;
  error: Error | null;
  data: PokemonInterface;
}

export const initialState: StateType = {
  isFetching: false,
  isLoading: true,
  error: null,
  data: { name: "", url: "", results: [] },
};

export type ActionType =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: unknown }
  | { type: "FETCH_FAILURE"; payload: Error };

export const pokemonReducer = (
  state: StateType,
  action: ActionType
): StateType => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, isFetching: true, isLoading: false, error: null };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isFetching: false,
        data: action.payload as PokemonInterface,
        isLoading: false,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const fetchStart = (): ActionType => ({ type: "FETCH_START" });
export const fetchSuccess = (payload: unknown): ActionType => ({
  type: "FETCH_SUCCESS",
  payload,
});
export const fetchFailure = (payload: Error): ActionType => ({
  type: "FETCH_FAILURE",
  payload,
});
