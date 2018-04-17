import React from 'react';
import { connect } from 'react-redux';
import { getActor } from '../MovieList/selectors';
import styles from './actors.module.scss';
import Nav from '../Nav/Nav';
import Header from '../Header/Header';
import PropTypes from 'prop-types';

const mapStateToProps = (state, ownProps) => ({
  actor: getActor(state, ownProps),
});

const Actor = (props) => {
  const { actor } = props;

  return (
    <div>
      <Nav />
      <Header />
      <div className={styles.actor}>
        <h2 className={styles.name}>{actor.name}</h2>
        <div className={styles.poster}>
          <img
            alt='poster'
            src={actor.imgUrl}
          />
        </div>
        <div>
          <span className={styles.bio}>Biography: </span>
          {actor.biography}
        </div>
      </div>
    </div>
  );
};

Actor.propTypes = {
  actor: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    imgUrl: PropTypes.string,
    biography: PropTypes.string,
  }),
};

export default connect(
  mapStateToProps,
  null,
)(Actor);
