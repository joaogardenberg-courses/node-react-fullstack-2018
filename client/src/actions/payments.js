import axios from 'axios';

import { FETCH_USER } from './types';

export const handleToken = (token) => async (dispatch) => {
  const { data } = await axios.post('/api/stripe', token);

  dispatch({
    type: FETCH_USER,
    payload: data
  });
};
