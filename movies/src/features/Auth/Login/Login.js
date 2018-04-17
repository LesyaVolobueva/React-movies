import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import styles from './login.module.scss';
import { getUser } from '../authActions';
import Nav from '../../Nav/Nav';
import PropTypes from 'prop-types';
import WithTranslation from '../../WithTranslation/WithTranslation';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (state) => dispatch(getUser(state)),
});

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      login: '',
      password: '',
    };
  }

  onChangeHandler = (event) => {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value.toLowerCase(),
    });
  };

  checkUser = () => {
    const { user } = this.props;
    const { password } = this.state;

    if (!user.name) {
      this.setState({
        noSuchUser: true,
        passwordIncorrect: false,
        loginSuccessful: false,
      });
    } else if (user.password !== password) {
      this.setState({
        noSuchUser: false,
        passwordIncorrect: true,
        loginSuccessful: false,
      });
    } else {
      this.setState({
        loginSuccessful: true,
        noSuchUser: false,
        passwordIncorrect: false,
      });
    }
  };

  login = (user) => {
    this.props.getUser(user.login)
      .then(this.checkUser);
  };

  render() {
    const { lang } = this.props;
    return (
      <div>
        <Nav />
        <div className={styles.form}>
          <h2 className={styles.title}>{lang.pleaseLogin}</h2>
          <label htmlFor='name'>{lang.userLogin}</label>
          <input
            id='name'
            name='login'
            onChange={this.onChangeHandler}
            required='required'
            type='text'
          />
          {this.state.noSuchUser &&
            <div>{lang.userDoNotExist}</div>
          }
          <label htmlFor='password'>{lang.userPassword}</label>
          <input
            id='password'
            name='password'
            onChange={this.onChangeHandler}
            required='required'
            type='password'
          />
          {this.state.passwordIncorrect &&
            <div>{lang.passwordIncorrect}</div>
          }
          <div>
            <Button
              className={styles.button}
              onClick={this.login.bind(null, this.state)}
            >
              {lang.login}
            </Button>
          </div>
          {this.state.loginSuccessful &&
            <Redirect to='/' />
          }
          <div className={styles.redirect}>
            {lang.dontHaveAcc}
            <Link
              className={styles.link}
              to='/registration'
            >
              {lang.signUp}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      password: PropTypes.string,
    }),
  ]),
  getUser: PropTypes.func,
  lang: PropTypes.objectOf(PropTypes.string),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithTranslation(Login));
