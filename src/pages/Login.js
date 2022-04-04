import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveLoginInfo from '../actions';

class Login extends React.Component {
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
    // peguei a referencia do regex nesse link https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const regexEmail = /\S+@\S+\.\S+/;
    const validadeEmail = regexEmail.test(email);
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
      <form>
        <label htmlFor="email">
          <input
            id="email"
            name="email"
            value={ email }
            onChange={ this.inputChange }
            data-testid="email-input"
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  loginInfo: PropTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  loginInfo: (payload) => dispatch(saveLoginInfo(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
