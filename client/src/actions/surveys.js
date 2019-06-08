import axios from 'axios';

import {
  FETCH_USER,
  FETCH_SURVEYS
} from "./types";

export const submitSurvey = (values, history) => async (dispatch) => {
  const { data } = await axios.post('/api/surveys', values);

  dispatch({
    type: FETCH_USER,
    payload: data
  });

  history.push('/surveys');
};

export const fetchSurveys = () => async (dispatch) => {
  const { data } = await axios.get('/api/surveys');

  dispatch({
    type: FETCH_SURVEYS,
    payload: data
  });
};