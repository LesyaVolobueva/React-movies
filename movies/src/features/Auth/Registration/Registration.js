import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import styles from './registration.module.scss';
import { createUser, getUser } from '../authActions';
import Nav from '../../Nav/Nav';
import PropTypes from 'prop-types';
import WithTranslation from '../../WithTranslation/WithTranslation';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: (state) => dispatch(getUser(state)),
  createUser: (state) => dispatch(createUser(state)),
});

class Registration extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
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
    const { createUser, user } = this.props;

    if (user.name) {
      this.setState({
        userExists: true,
        signUpSuccessful: false,
      });
    } else {
      this.setState({
        userExists: false,
        signUpSuccessful: true,
      });
      createUser(this.state);
    }
  };

  signUp = (name) => {
    this.props.getUser(name)
      .then(this.checkUser);
  };

  render() {
    const { lang } = this.props;
    return (
      <div>
        <Nav />
        <div className={styles.form}>
          <h2 className={styles.title}>{lang.pleaseSignUp}</h2>
          <label htmlFor='name'>{lang.userLogin}</label>
          <input
            id='name'
            name='name'
            onChange={this.onChangeHandler}
            required='required'
            type='text'
          />
          {this.state.userExists &&
            <div>{lang.suchUserExists}</div>
          }
          <label htmlFor='password'>{lang.userPassword}</label>
          <input
            id='password'
            name='password'
            onChange={this.onChangeHandler}
            required='required'
            type='password'
          />
          <div>
            <Button
              className={styles.button}
              onClick={this.signUp.bind(null, this.state.name)}
            >{lang.signUp}</Button>
          </div>
          {this.state.signUpSuccessful &&
            <Redirect to='/' />
          }
          <div className={styles.redirect}>
            {lang.alreadyHaveAcc}
            <Link
              className={styles.link}
              to='/login'
            >
              {lang.login}
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Registration.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      password: PropTypes.string,
    }),
  ]),
  getUser: PropTypes.func,
  createUser: PropTypes.func,
  lang: PropTypes.objectOf(PropTypes.string),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithTranslation(Registration));
