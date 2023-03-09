import { useState } from 'react';
import copy from 'clipboard-copy';

const useCopy = () => {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const TIME_TO_SHOW = 3000;

  const copyAndShowMessage = (stringToCopy) => {
    copy(stringToCopy);
    setShowCopyMessage(true);
    setTimeout(() => setShowCopyMessage(false), TIME_TO_SHOW);
  };

  return [showCopyMessage, copyAndShowMessage];
};

export default useCopy;
