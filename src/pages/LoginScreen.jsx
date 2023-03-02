import React from 'react';

function LoginScreen() {
  return (
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
        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default LoginScreen;
