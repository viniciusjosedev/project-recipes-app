import PropTypes from 'prop-types';
import React from 'react';

export default function LinkCopied({ textCopied }) {
  return (
    <p>{textCopied && 'Link copied!'}</p>
  );
}

LinkCopied.propTypes = {
  textCopied: PropTypes.string,
}.isRequired;
