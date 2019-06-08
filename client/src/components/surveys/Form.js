import React    from 'react';
import { Link } from 'react-router-dom';

import {
  reduxForm,
  Field
} from 'redux-form';

import SurveyField    from './Field';
import validateEmails from '../../utils/validateEmails';
import formFields     from './formFields';

class Form extends React.Component {
  render() {
    return (
      <div className="survey-form">
        <form onSubmit={ this.props.handleSubmit(this.props.onSubmit) }>
          { this.renderFields() }
          <Link to="/surveys" className="btn-flat red white-text waves-effect">
            Cancel
          </Link>
          <button type="submit" className="btn-flat right teal white-text waves-effect">
            Next
            <i className="material-icons right">navigate_next</i>
          </button>
        </form>
      </div>
    );
  }

  renderFields() {
    return formFields.map((field) => {
      return (
        <Field
          { ...field }
          key={ field.name }
          type="text"
          component={ SurveyField }
        />
      );
    });
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients);

  formFields.forEach(({ label, name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a ${label}`;
    }
  });

  return errors;
}

Form = reduxForm({
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(Form);

export default Form;