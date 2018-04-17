import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

class PrivateRoute extends Component {
  render() {
    const { user, ...props } = this.props;

    return user.name
      ? <Route {...props} />
      : <Redirect to='/login' />;
  }
}

PrivateRoute.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      password: PropTypes.string,
    }),
  ]),
};

export default connect(mapStateToProps)(PrivateRoute);
