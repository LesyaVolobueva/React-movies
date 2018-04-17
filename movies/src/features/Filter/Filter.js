import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button/Button';
import styles from './filter.module.scss';
import { sortByLikes, sortByRating, searchByName } from './filterActions';
import PropTypes from 'prop-types';
import WithTranslation from '../WithTranslation/WithTranslation';

const mapDispatchToProps = (dispatch) => ({
  sortByLikes: () => dispatch(sortByLikes()),
  sortByRating: () => dispatch(sortByRating()),
  searchByName: (value) => dispatch(searchByName(value)),
});

class Filter extends Component {
  state = {
    inputValue: '',
  };

  onChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    });
  };

  render() {
    const { sortByLikes, searchByName, sortByRating, lang } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.filter}>
          <input
            onChange={this.onChange}
            placeholder={lang.searchPlaceholder}
          />
          <Button
            onClick={searchByName.bind(null, this.state.inputValue)}
          >
            <img
              alt='search'
              className={styles.searchImg}
              src={'https://goo.gl/8jTgkx'}
            />
          </Button>
        </div>
        <div className={styles.sorting}>
          <Button onClick={sortByLikes}>
            {lang.byLikes}
          </Button>
          <Button onClick={sortByRating}>
            {lang.byRate}
          </Button>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  sortByLikes: PropTypes.func,
  sortByRating: PropTypes.func,
  searchByName: PropTypes.func,
  lang: PropTypes.objectOf(PropTypes.string),
};

export default connect(
  null,
  mapDispatchToProps,
)(WithTranslation(Filter));
