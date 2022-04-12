import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAndUpdateExpense, getCurrencies, saveExpense } from '../../redux/actions';
import Header from '../../components/Header/Header';
import Table from '../../components/Table/Table';

const ALIMENTACAO = 'Alimentação';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: 0,
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: ALIMENTACAO,
      editForm: false,
      idEditing: 0,
    };
  }

  componentDidMount() {
    const { getCurrenciesWallet } = this.props;
    getCurrenciesWallet();
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  addExpenses = () => {
    const { saveExpensesWallet, expenses } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;
    this.setState({
      valueInput: 0,
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: ALIMENTACAO,
    }, () => {
      saveExpensesWallet({
        valueInput,
        descriptionInput,
        currencyInput,
        methodInput,
        tagInput,
        expenses,
      });
    });
  }

  editExpense = ({ id, value, description, currency, method, tag }) => {
    this.setState({
      valueInput: value,
      descriptionInput: description,
      currencyInput: currency,
      methodInput: method,
      tagInput: tag,
      editForm: true,
      idEditing: id,
    });
  }

  finishEditing = (id) => {
    const { expenses, delAndUpdateExpense } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;
    expenses[id].value = valueInput;
    expenses[id].description = descriptionInput;
    expenses[id].currency = currencyInput;
    expenses[id].method = methodInput;
    expenses[id].tag = tagInput;
    delAndUpdateExpense(expenses);
    this.setState({ editForm: false, idEditing: null });
  }

  render() {
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
      editForm,
      idEditing,
    } = this.state;

    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              name="valueInput"
              data-testid="value-input"
              type="number"
              onChange={ this.inputChange }
              value={ valueInput }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              id="description-input"
              name="descriptionInput"
              data-testid="description-input"
              type="text"
              onChange={ this.inputChange }
              value={ descriptionInput }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              onChange={ this.inputChange }
              value={ currencyInput }
              name="currencyInput"
              id="currency-input"
              data-testid="currency-input"
            >
              {currencies.map((currencie, index) => (
                <option value={ currencie.toString() } key={ index }>
                  { currencie }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            <select
              onChange={ this.inputChange }
              value={ methodInput }
              name="methodInput"
              id="method-input"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            <select
              onChange={ this.inputChange }
              value={ tagInput }
              name="tagInput"
              id="tag-input"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {editForm ? (
            <button
              type="button"
              onClick={ () => this.finishEditing(idEditing) }
            >
              Editar despesa
            </button>
          ) : (
            <button type="button" onClick={ this.addExpenses }>Adicionar despesa</button>
          )}
        </form>
        <Table editExpense={ this.editExpense } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesWallet: () => dispatch(getCurrencies()),
  saveExpensesWallet: (currencie) => dispatch(saveExpense(currencie)),
  delAndUpdateExpense: (payload) => dispatch(deleteAndUpdateExpense(payload)),
});

Wallet.propTypes = {
  currencies: PropTypes.shape(),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
