import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalValue: 0,
    };
  }

  componentDidMount() {
    this.getTotalSum();
  }

  getTotalSum = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      let totalSum = 0;
      expenses.forEach((item) => {
        totalSum += (item.value * item.exchangeRates[item.currency].ask);
      });
      this.setState({ totalValue: totalSum.toFixed(2) });
    } else {
      this.setState({ totalValue: 0 });
    }
  }

  render() {
    const { email } = this.props;
    const { totalValue } = this.state;
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

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
