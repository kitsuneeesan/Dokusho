import {combineReducers} from 'redux';

const initHome = {
  page: '',
};

const Home = (state = initHome, action) => {
  if (action.type === 'ON_CORRECT') {
    return {
      ...state,
      page: action.value,
    };
  }
  return state;
};

const initMain = {
  materi: '',
};

const Main = (state = initMain, action) => {
  if (action.type === 'MATERI') {
    return {
      ...state,
      materi: action.value,
    };
  }
  return state;
};

const reducer = combineReducers({
  Home,
  Main,
});

export default reducer;
