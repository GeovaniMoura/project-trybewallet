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
    const { email, isFetching, currencies } = this.props;
    if (isFetching) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }
    return (
      <div>
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
        <section>
          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              name="value-input"
              data-testid="value-input"
              type="number"
              min="0"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              id="description-input"
              name="description-input"
              data-testid="description-input"
              type="text"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select id="currency-input" data-testid="currency-input">
              {currencies.map((currencie, index) => (
                <option value={ currencie.toString() } key={ index }>
                  { currencie }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            <select id="method-input" data-testid="method-input">
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select id="tag-input" data-testid="tag-input">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  isFetching: state.wallet.isFetching,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesWallet: () => dispatch(getCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  isFetching: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
