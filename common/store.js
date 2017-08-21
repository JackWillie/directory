import { createStore } from 'redux';
import data from '../build/data.json';

const defaultLibraries = [...data.libraries];
const INITIAL_STATE = {
  libraries: defaultLibraries,
  tooltip: null,
  modal: null,
  sortBy: 'updated',
  querySearch: '',
  queryTopic: undefined,
  rangeStart: 0,
  rangeEnd: 50,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PAGINATION':
      return { ...state, rangeStart: action.start, rangeEnd: action.end };
    case 'CLEAR_TOOLTIP':
      return { ...state, tooltip: null };
    case 'CLEAR_MODAL':
      return { ...state, modal: null };
    case 'SET_TOOLTIP':
      return { ...state, tooltip: action.tooltip };
    case 'SET_MODAL':
      return { ...state, modal: action.modal };
    case 'SORT_BY':
      return { ...state, libraries: action.libraries, sortBy: action.sortBy };
    case 'SEARCH_LIBRARY':
      return { ...state, querySearch: action.value };
    case 'TOPIC_PICKED':
      return { ...state, queryTopic: action.value };
    case 'CLEAR_TOPIC':
      return { ...state, queryTopic: '' };
    case 'CLEAR_SEARCH':
      return { ...state, querySearch: '' };
    default:
      return state;
  }
};

export const initStore = initialState => {
  return createStore(reducer, initialState);
};
