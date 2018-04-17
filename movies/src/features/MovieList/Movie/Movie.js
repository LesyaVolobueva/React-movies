import React from 'react';
import { Link } from 'react-router-dom';
import styles from './movie.module.scss';
import RatingStars from '../../../components/RatingStars/RatingStars';
import PropTypes from 'prop-types';
import WithTranslation from '../../WithTranslation/WithTranslation';

const Movie = (props) => {
  const {
    movie,
    incLike,
    decLike,
    setRating,
    lang,
  } = props;

  return (
    <div className={styles.movie}>
      <div className={styles.likes}>
        <div className={styles.imgDiv}>
          <img
            alt='like'
            className={styles.likeImg}
            onClick={incLike.bind(null, movie.id)}
            src='https://goo.gl/NSjZGo'
          />
        </div>
        <div className={styles.imgDiv}>
          <img
            alt='dislike'
            className={styles.likeImg}
            onClick={decLike.bind(null, movie.id)}
            src='https://goo.gl/D22jMu'
          />
        </div>
        <span>{lang.likes}</span>
        <div className={styles.likesCount}>
          {movie.likes}
        </div>
      </div>

      <div className={styles.movieInfo}>
        <Link to={`movies/${movie.id}`}>
          <div
            className={styles.title}
          >
            {movie.title}
          </div>
        </Link>
        <img
          alt='poster'
          className={styles.poster}
          src={movie.posterUrl}
        />
      </div>
      <RatingStars
        id={movie.id}
        setRating={setRating}
        stars={movie.stars}
      />
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    posterUrl: PropTypes.string,
    stars: PropTypes.number,
    likes: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.string),
    actors: PropTypes.arrayOf(PropTypes.number),
    director: PropTypes.string,
    description: PropTypes.string,
  }),
  incLike: PropTypes.func,
  decLike: PropTypes.func,
  setRating: PropTypes.func,
  lang: PropTypes.objectOf(PropTypes.string),
};

export default WithTranslation(Movie);
