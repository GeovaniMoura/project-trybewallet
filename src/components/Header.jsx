import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { email, totalValue } = this.props;
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
  totalValue: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  totalValue: state.wallet.totalValue,
});

export default connect(mapStateToProps)(Header);
