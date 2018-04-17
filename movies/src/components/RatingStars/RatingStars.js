import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import styles from './ratingStars.module.scss';
import PropTypes from 'prop-types';

class RatingStars extends React.Component {
  render() {
    const { setRating, stars, id } = this.props;
    const starItems = [];
    const starsCount = 5;

    for (let i = 1; i <= starsCount; i = i + 1) {
      let styleClass = styles.star;

      if (stars && stars >= i) {
        styleClass = styles.starActive;
      }

      starItems.push(
        <label
          className={styleClass}
          key={i}
          onClick={setRating.bind(null, id, i)}
        >
          ★
        </label>
      );
    }

    return(
      <div className={styles.rate}>
        {starItems}
      </div>
    );
  }
}

RatingStars.propTypes = {
  setRating: PropTypes.func,
  stars: PropTypes.number,
  id: PropTypes.number,
};

export default RatingStars;
