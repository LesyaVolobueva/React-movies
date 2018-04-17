import { connect } from 'react-redux';
import translations from '../../translation';

const WithTranslation = (WrappedComponent) => {
  return (
    connect((state) => ({ lang: translations[state.lang.lang] })
    )(WrappedComponent));
};

export default WithTranslation;
