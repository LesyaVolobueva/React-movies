import React from 'react';
import styles from './header.module.scss';
import { connect } from 'react-redux';
import { logout } from '../Auth/authActions';
import PropTypes from 'prop-types';
import WithTranslation from '../WithTranslation/WithTranslation';


const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export class Header extends React.Component {
  render() {
    const { logout, user, lang } = this.props;

    return (
      <div className={styles.div}>
        <h1 className={styles.title}>{lang.movies}</h1>
        {user &&
        <button
          className={styles.logout}
          onClick={logout}
        >
          {lang.logOut}
        </button>
        }
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      password: PropTypes.string,
    }),
  ]),
  logout: PropTypes.func,
  lang: PropTypes.objectOf(PropTypes.string),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithTranslation(Header));
