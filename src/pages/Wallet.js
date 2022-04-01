import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalValue: 0,
    };
  }

  componentDidMount() {
    const { getCurrenciesWallet } = this.props;
    getCurrenciesWallet();
  }

  render() {
    const { totalValue } = this.state;
    const { email, isFetching } = this.props;
    if (isFetching) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <label data-testid="header-currency-field" htmlFor="total-field">
          <p id="total-field" data-testid="total-field">
            {totalValue}
          </p>
          BRL
        </label>
        <div>TrybeWallet</div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesWallet: () => dispatch(getCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  isFetching: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
