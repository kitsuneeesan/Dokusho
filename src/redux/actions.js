export const setPage = (status) => (dispatch) => {
  return dispatch({type: 'ON_CORRECT', value: status});
};

export const setMateri = (status) => (dispatch) => {
  return dispatch({type: 'MATERI', value: status});
};
