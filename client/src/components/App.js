import React       from 'react';
import { connect } from 'react-redux';

import {
  BrowserRouter,
  Route
} from 'react-router-dom';

import Header        from './Header';
import Landing       from './Landing';
import Dashboard     from './Dashboard';
import SurveyNew     from './SurveyNew';
import { fetchUser } from '../actions';

class App extends React.Component {
  render() {
    return (
      <div className="app container">
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/surveys" component={Dashboard}/>
            <Route path="/surveys/new" component={SurveyNew}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchUser();
  }
}

App = connect(
  null,
  { fetchUser }
)(App);

export default App;
