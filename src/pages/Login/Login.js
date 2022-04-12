import React from 'react';
import PropTypes from 'prop-types';
import task from '../../images/task.png';
import styles from './Login.module.css';
import Form from '../../components/Form/Form';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div className={ styles.container }>
        <div className={ styles.container_title_and_rest }>
          <h1>Trybe Wallet</h1>
          <div className={ styles.container_img_and_login }>
            <div className={ styles.img_login }>
              <img src={ task } alt="tasks" />
            </div>
            <hr />
            <Form history={ history } />
          </div>
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(),
}.isRequired;

export default Login;
