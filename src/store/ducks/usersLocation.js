/**
 * Types
 */
export const Types = {
  ADD_REQUEST: 'usersLocation/ADD_REQUEST',
  ADD_SUCCESS: 'usersLocation/ADD_SUCCESS',
  ADD_FAILURE: 'usersLocation/ADD_FAILURE',
  REMOVE: 'usersLocation/REMOVE',
};

/**
 * Reducer
 */

const INITIAL_STATE = {
  loading: false,
  data: [],
  error: null,
};

export default function usersLocation(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.ADD_SUCCESS:
      return {
        data: [...state.data, action.payload.data],
        error: null,
        loading: false,
      };
    case Types.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case Types.REMOVE:
      return {
        ...state,
        data: state.data.filter(user => user.id !== action.payload.user.id),
      };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  addUserLocationRequest: (user, cordinates) => ({
    type: Types.ADD_REQUEST,
    payload: { user, cordinates },
  }),
  addUserLocationSuccess: data => ({
    type: Types.ADD_SUCCESS,
    payload: { data },
  }),
  addUserLocationFailure: error => ({
    type: Types.ADD_FAILURE,
    payload: { error },
  }),
  removeUserLocation: user => ({
    type: Types.REMOVE,
    payload: { user },
  }),
};
