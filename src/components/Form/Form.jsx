import React from 'react';
import EmailValidator from 'email-validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './Form.module.css';
import saveLoginInfo from '../../redux/actions';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonIsDisabled: true,
    };
  }

  inputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.validateForm());
  }

  validateForm = () => {
    const { email, password } = this.state;
    const SIX = 6;
    const validadeEmail = EmailValidator.validate(email);
    const validadePassword = password.length >= SIX;
    if (validadeEmail && validadePassword) {
      this.setState({ buttonIsDisabled: false });
    } else {
      this.setState({ buttonIsDisabled: true });
    }
  }

  redirect = () => {
    const { history, loginInfo } = this.props;
    const { email } = this.state;
    loginInfo({ email });
    history.push('/carteira');
  }

  render() {
    const { email, password, buttonIsDisabled } = this.state;
    return (
      <form className={ styles.form_login }>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            value={ email }
            onChange={ this.inputChange }
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            className={ styles.input_login }
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            value={ password }
            onChange={ this.inputChange }
            data-testid="password-input"
            placeholder="Digite sua senha"
            className={ styles.input_login }
          />
        </label>
        <button
          type="button"
          disabled={ buttonIsDisabled }
          onClick={ this.redirect }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginInfo: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginInfo: (payload) => dispatch(saveLoginInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Form);
