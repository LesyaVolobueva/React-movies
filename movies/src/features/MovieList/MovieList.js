import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Movie from './Movie/Movie';
import styles from './movieList.module.scss';
import { fetchIncLike, fetchDecLike, setRating } from './movieActions';
import { getFilteredMovies } from './selectors';

const mapStateToProps = (state) => ({
  movies: getFilteredMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchIncLike: id => dispatch(fetchIncLike(id)),
  fetchDecLike: id => dispatch(fetchDecLike(id)),
  setRating: (id, stars) => dispatch(setRating(id, stars)),
});

const MovieList = (props) => {
  const {
    movies,
    fetchIncLike,
    fetchDecLike,
    setRating,
  } = props;

  return (
    <div className={styles.moviesContainer}>
      <div className={styles.movieList}>
        {movies.map(movie =>
          <Movie
            decLike={fetchDecLike}
            incLike={fetchIncLike}
            key={movie.id}
            movie={movie}
            setRating={setRating}
          />
        )}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      posterUrl: PropTypes.string,
      stars: PropTypes.number,
      likes: PropTypes.number,
      genres: PropTypes.arrayOf(PropTypes.string),
      actors: PropTypes.arrayOf(PropTypes.number),
      director: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  fetchIncLike: PropTypes.func,
  fetchDecLike: PropTypes.func,
  setRating: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieList);
