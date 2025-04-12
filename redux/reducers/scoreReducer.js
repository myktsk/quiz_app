import { ADD_SCORE, DELETE_SCORE, FETCH_SCORES } from "../actionTypes";

const initialState = {
  scores: [],
};

export const scoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCORES: {
      return {
        ...state,
        scores: action.payload,
      };
    }

    case ADD_SCORE: {
      // Check if the score already exists in the state
      const scoreExists = state.scores.some(
        (score) => score.id === action.payload.id
      );

      if (scoreExists) {
        return state;
      }

      return {
        ...state,
        scores: [...state.scores, action.payload],
      };
    }
    case DELETE_SCORE: {
      return {
        ...state,
        scores: state.scores.filter((score) => score.id !== action.payload.id),
      };
    }
    default: {
      return state;
    }
  }
};
