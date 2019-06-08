import React          from 'react';
import { connect }    from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import { submitSurvey } from '../../actions';

let FormReview = ({ onCancel, values = {}, submitSurvey, history }) => {
  const reviewFields = formFields.map(({ label, name }) => {
    return (
      <div key={ name }>
        <label>{ label }</label>
        <p>{ values[name] }</p>
      </div>
    );
  });

  return (
    <div className="survey-form-review">
      <h5>Please confirm your entries</h5>
      { reviewFields }
      <button
        className="btn-flat yellow darken-3 white-text"
        onClick={ onCancel }
      >
        Back
        <i className="material-icons left">navigate_before</i>
      </button>
      <button
        onClick={ () => submitSurvey(values, history) }
        className="btn-flat right green white-text"
      >
        Send survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps({ form: { surveyForm: { values } = {} } }) {
  return { values };
}

FormReview = withRouter(FormReview);

FormReview = connect(
  mapStateToProps,
  { submitSurvey }
)(FormReview);

export default FormReview;