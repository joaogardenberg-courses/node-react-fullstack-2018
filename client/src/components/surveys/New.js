import React         from 'react';
import { reduxForm } from 'redux-form';

import Form       from './Form';
import FormReview from './FormReview';

class New extends React.Component {
  state = { showFormReview: false };

  render() {
    return (
      <div className="survey-new">
        { this.renderContent() }
      </div>
    );
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <FormReview
          onCancel={ () => this.setState({ showFormReview: false }) }
        />
      );
    }

    return (
      <Form
        onSubmit={ () => this.setState({ showFormReview: true }) }
      />
    );
  }
}

New = reduxForm({
  form: 'surveyForm'
})(New);

export default New;