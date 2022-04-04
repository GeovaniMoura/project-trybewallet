import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalSum: 0,
    };
  }

  componentDidMount() {
    const { totalValue } = this.props;
    if (totalValue > 0) this.setState({ totalSum: totalValue });
  }

  render() {
    const { email } = this.props;
    const { totalSum } = this.state;
    return (
      <header>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{totalSum}</p>
        <p data-testid="header-currency-field">BRL</p>
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
