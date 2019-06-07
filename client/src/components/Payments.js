import React          from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect }    from 'react-redux';

import { handleToken } from '../actions';

class Payments extends React.Component {
  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        amount={ 500 }
        token={ this.callback }
        stripeKey={ process.env.REACT_APP_STRIPE_KEY }
      >
        <button className="btn btn-small white black-text">
          Add credits
        </button>
      </StripeCheckout>
    );
  }

  callback = (token) => {
    this.props.handleToken(token);
  }
}

Payments = connect(
  null,
  { handleToken }
)(Payments);

export default Payments;