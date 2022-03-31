import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalValue: 0,
    };
  }

  render() {
    const { totalValue } = this.state;
    const { email } = this.props;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <label data-testid="header-currency-field" htmlFor="total-field">
          <p id="total-field" data-testid="total-field">{totalValue}</p>
          BRL
        </label>
        <div>TrybeWallet</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
