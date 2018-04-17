import React from 'react';
import { connect } from 'react-redux';
import { changeLang } from './langActions';
import { getLangs } from './selectors';
import PropTypes from 'prop-types';
import styles from './switchLang.module.scss';

const mapStateToProps = (state) => ({
  lang: state.lang.lang,
  langsList: getLangs(),
});

const mapDispatchToProps = (dispatch) => ({
  changeLang: (lang) => dispatch(changeLang(lang)),
});

class SwitchLanguage extends React.Component {
  render() {
    const { lang, langsList, changeLang } = this.props;

    return (
      <div
        className={styles.selectLang}
      >
        {lang}
        <div>
          {langsList.map(lang => (
            <div
              className={styles.item}
              key={lang}
              onClick={changeLang.bind(null, lang)}
            >{lang}</div>
          ))}
        </div>
      </div>
    );
  }
}

SwitchLanguage.propTypes = {
  lang: PropTypes.string,
  langsList: PropTypes.arrayOf(PropTypes.string),
  changeLang: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwitchLanguage);
