import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import DefaultContext from '../context/DefaultContext';

function Login({ history: { push } }) {
  const { searchWord } = useContext(DefaultContext);
  console.log(searchWord);
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
    <div>
      <form>
        <label
          htmlFor="email"
        >
          Email:
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Digite o e-mail"
            data-testid="email-input"
            onChange={ handleEmail }
          />
        </label>
        <label
          htmlFor="password"
        >
          Senha:
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            placeholder="Digite a senha"
            onChange={ handlePassword }
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ validation(email, password) }
          onClick={ saveLocalStorage }
        >
          Enter
        </button>
      </form>

    </div>
  );
}

export default Login;

Login.propTypes = {
  history: PropTypes.any,
  push: PropTypes.any,
}.isRequired;
