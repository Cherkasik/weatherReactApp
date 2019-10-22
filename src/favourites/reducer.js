import types from './actionTypes';

const initialState = {
  favourites: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.FAVOURITES_SUCCESS:
    case types.FAVOURITE_ADD_SUCCESS:
    case types.FAVOURITE_REMOVE_SUCCESS: {
      return {
        ...state,
        favourites: action.payload,
      };
    }
    default:
      return state;
  }
}