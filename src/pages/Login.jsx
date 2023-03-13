import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/css/Login.module.css';
import backgroundImageLogin from '../styles/images/backgroundImageLogin.svg';

function Login({ history: { push } }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validation = (inputEmail, inputPassword) => {
    const regexEmail = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;
    const minPassword = 6;
    return (!(regexEmail.test(inputEmail) && inputPassword.length > minPassword));
  };
  const handleEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const saveLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify(({ email })));
    push('/meals');
  };

  return (
    <main className={ styles.main }>
      <div>
        <img src={ backgroundImageLogin } alt="" />
      </div>
      <h1 className={ styles.h1Title }>Login</h1>
      <div className={ styles.divInputs }>
        <input
          type="email"
          id="email"
          className={ styles.inputEmail }
          placeholder="Email"
          data-testid="email-input"
          onChange={ handleEmail }
        />
        <input
          type="password"
          className={ styles.inputEmail }
          id="password"
          data-testid="password-input"
          placeholder="Digite a senha"
          onChange={ handlePassword }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ validation(email, password) }
          onClick={ saveLocalStorage }
          className={ styles.button }
        >
          Enter
        </button>
      </div>
    </main>
  );
}

export default Login;

Login.propTypes = {
  history: PropTypes.any,
  push: PropTypes.any,
}.isRequired;
