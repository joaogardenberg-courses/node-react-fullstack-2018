import React from 'react';
import { connect } from 'react-redux';

import { fetchSurveys } from '../../actions';

class List extends React.Component {
  render() {
    return (
      <div className="survey-list">
        { this.renderSurveys() }
      </div>
    );
  }

  renderSurveys() {
    return this.props.surveys
      .reverse()
      .map(({ _id, title, body, dateSent, yes, no }) => {
        return (
          <div key={ _id } className="card white darken-1">
            <div className="card-content">
              <span className="card-title">
                { title }
              </span>
              <p>
                { body }
              </p>
              <p className="right">
                Sent on: { new Date(dateSent).toLocaleDateString('pt-BR') }
              </p>
            </div>
            <div className="card-action">
              <a>Yes ({ yes })</a>
              <a>No ({ no })</a>
            </div>
          </div>
        );
      });
  }

  componentDidMount() {
    this.props.fetchSurveys();
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

List = connect(
  mapStateToProps,
  { fetchSurveys }
)(List);

export default List;