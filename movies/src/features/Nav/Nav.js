import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.scss';
import SwitchLanguage from './SwitchLanguage/SwitchLanguage';
import WithTranslation from '../WithTranslation/WithTranslation';
import PropTypes from 'prop-types';

class NavBar extends React.Component {
  render() {
    const { lang } = this.props;

    return (
      <Fragment>
        <div className={styles.navbar}>
          <NavLink
            activeClassName={styles.active}
            className={styles.link}
            to='/login'
          >
            {lang.login}
          </NavLink>
          <NavLink
            activeClassName={styles.active}
            activeStyle={{ textShadow: '0 2px 5px darken(#abc2e8, 30%)' }}
            className={styles.link}
            to='/registration'
          >
            {lang.signUp}
          </NavLink>
          <NavLink
            activeClassName={styles.active}
            activeStyle={{ textShadow: '0 2px 5px darken(#abc2e8, 30%)' }}
            className={styles.link}
            to='/'
          >{lang.movies}</NavLink>
          <SwitchLanguage />
        </div>
      </Fragment>
    );
  }
}

NavBar.propTypes = {
  lang: PropTypes.objectOf(PropTypes.string),
};

export default WithTranslation(NavBar);
