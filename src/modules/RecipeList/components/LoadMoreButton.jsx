import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const LoadMoreButton = ({ onAction, loading, loadingAuth }) => {
  const { t } = useTranslation();
  let str = t('common:list.load');
  let cursorClass = '';
  let func = onAction;
  if (loadingAuth || loading) {
    str = t('common:list.loading');
    cursorClass = 'default-cursor';
    func = null;
  }
  return (
    <button
      type="button"
      role="link"
      tabIndex="0"
      onClick={func}
      onKeyDown={func}
      className={`housekeeping-message load-more-button ${cursorClass}`}
    >
      {str}
    </button>
  );
};

LoadMoreButton.propTypes = {
  onAction: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingAuth: PropTypes.bool.isRequired,
};

export default React.memo(LoadMoreButton);
