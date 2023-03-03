import PropTypes from 'prop-types';
import React from 'react';
import DefaultContext from './DefaultContext';

function DefaultProvider({ children }) {
  const defaultValue = React.useMemo(() => ({ history: undefined }), []);
  return (
    <DefaultContext.Provider value={ defaultValue }>
      {children}
    </DefaultContext.Provider>
  );
}

DefaultProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default DefaultProvider;
