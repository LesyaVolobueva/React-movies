import React from 'react';
import { connect } from 'react-redux';
import RatingStars from '../../../components/RatingStars/RatingStars';
import styles from './movieDescription.module.scss';
import { Link } from 'react-router-dom';
import { findMovie, findActors } from '../selectors';
import { fetchSetRating, fetchDeleteMovie } from '../movieActions';
import Button from '../../../components/Button/Button';
import Nav from '../../Nav/Nav';
import Header from '../../Header/Header';
import PropTypes from 'prop-types';
import WithTranslation from '../../WithTranslation/WithTranslation';

const mapStateToProps = (state, ownProps) => ({
  movie: findMovie(state, ownProps),
  actors: findActors(state, ownProps),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSetRating: (id, stars) => dispatch(fetchSetRating(id, stars)),
  fetchDeleteMovie: (id) => dispatch(fetchDeleteMovie(id)),
});

class MovieDescription extends React.Component {
  render() {
    const { movie, fetchSetRating, fetchDeleteMovie, actors, lang } = this.props;

    return (
      <div>
        <Nav />
        <Header />
        <div className={styles.container}>
          <div className={styles.title}>{movie.title}</div>
          <div className={styles.shortInfo}>
            <div className={styles.likes}>
              <b>{lang.likes}: </b>{movie.likes}
            </div>
            <RatingStars
              id={movie.id}
              setRating={fetchSetRating}
              stars={movie.stars}
            />
            <Link to={`/editMovie/${movie.id}`}>
              <Button>{lang.edit}</Button>
            </Link>
            <Link to='/'>
              <Button
                onClick={fetchDeleteMovie.bind(null, movie.id)}
              >
                {lang.delete}
              </Button>
            </Link>
          </div>
          <div className={styles.poster}>
            <img
              alt='poster'
              src={movie.posterUrl}
            />
          </div>
          <div className={styles.mainInfo}>
            <div>
              <b>{lang.director}: </b> {movie.director}
            </div>
            <div>
              <b>{lang.actors}: </b>
              {actors.map(actor => {
                return (
                  <Link
                    className={styles.link}
                    key={actor.id}
                    to={`/actors/${actor.id}`}
                  >
                    {actor.name}
                  </Link>
                );
              })}
            </div>
            <div>
              <b>{lang.genres}: </b>
              {movie.genres}
            </div>
            <div>
              <b>{lang.description}: </b>{movie.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MovieDescription.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    stars: PropTypes.number,
    likes: PropTypes.number,
    genres: PropTypes.string,
    actors: PropTypes.arrayOf(PropTypes.number),
    director: PropTypes.string,
    description: PropTypes.string,
  }),
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  fetchSetRating: PropTypes.func,
  fetchDeleteMovie: PropTypes.func,
  lang: PropTypes.objectOf(PropTypes.string),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithTranslation(MovieDescription));
