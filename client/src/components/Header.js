import React       from 'react';
import { connect } from 'react-redux';
import { Link }    from 'react-router-dom';

import Payments from './Payments';

class Header extends React.Component {
  render() {
    return (
      <nav className="header">
        <div className="nav-wrapper">
          <Link
            to={ this.props.auth ? '/surveys' : '/' }
            className="brand-logo"
            style={{ padding: '0 10px' }}
          >
            Emaily
          </Link>
          <ul className="right">
            { this.renderContent() }
          </ul>
        </div>
      </nav>
    );
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login with Google</a></li>;
      default:
        return [
          <li key="2"><Payments /></li>,
          <li key="1" style={{ margin: '0 10px' }}>Credits: { this.props.auth.credits }</li>,
          <li key="3"><a href="/auth/logout">Logout</a></li>
        ];
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

Header = connect(
  mapStateToProps
)(Header);

export default Header;