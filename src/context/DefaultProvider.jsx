import PropTypes from 'prop-types';
import React from 'react';
import DefaultContext from './DefaultContext';

function DefaultProvider({ children }) {
  return (
    <DefaultContext.Provider value={ { history: undefined } }>
      {children}
    </DefaultContext.Provider>
  );
}

DefaultProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default DefaultProvider;
