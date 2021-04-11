import React, { useReducer } from 'react';

import Datepicker from './Datepicker';

type State = {
  startDate: string | null;
  endDate: string | null;
};

export enum ActionOptions {
  SET_START_DATE = 'SET_START_DATE',
  SET_END_DATE = 'SET_END_DATE',
  RESTART_DATE = 'RESTART_DATE',
}

type Action = {
  type: ActionOptions;
  payload: {
    date: string;
  };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionOptions.SET_START_DATE:
      return { ...state, startDate: action.payload.date };
    case ActionOptions.SET_END_DATE:
      return { ...state, endDate: action.payload.date };
    case ActionOptions.RESTART_DATE:
      return { startDate: action.payload.date, endDate: null };
    default:
      return state;
  }
};

export const DatepickerContext = React.createContext({} as any);

const DatepickerProvider = () => {
  const value = useReducer(reducer, {
    startDate: null,
    endDate: null,
  });

  return (
    <DatepickerContext.Provider value={value}>
      <Datepicker />
    </DatepickerContext.Provider>
  );
};

export default DatepickerProvider;
