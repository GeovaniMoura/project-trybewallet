import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Header.module.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  updateValue = () => {
    const { expenses } = this.props;
    let totalSum = 0;
    expenses.forEach((item) => {
      totalSum += Number(item.value) * Number(item.exchangeRates[item.currency].ask);
    });
    return totalSum.toFixed(2);
  }

  render() {
    const { email } = this.props;
    return (
      <header className={ styles.header__container }>
        <div className={ styles.header__title }>
          <h1>Trybe</h1>
          <h2>Wallet</h2>
        </div>
        <div className={ styles.header__infos }>
          <div className={ styles.email__container }>
            <p data-testid="email-field">{email}</p>
          </div>
          <div className={ styles.totalValue__container }>
            <p
              data-testid="total-field"
            >
              {`Valor Total: ${this.updateValue().replace('.', ',')}`}
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </div>
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
});

export default connect(mapStateToProps)(Header);
