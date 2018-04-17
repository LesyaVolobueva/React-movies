import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { findMovie } from '../selectors';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import styles from './editMovie.module.scss';
import { fetchSaveMovie } from '../movieActions';
import Nav from '../../Nav/Nav';
import Header from '../../Header/Header';
import PropTypes from 'prop-types';
import WithTranslation from '../../WithTranslation/WithTranslation';
import { Field, reduxForm } from 'redux-form';


const mapStateToProps = (state, ownProps) => ({
  initialValues: findMovie(state, ownProps),
});

const mapDispatchToProps = (dispatch) => ({
  fetchSaveMovie: (movie) => dispatch(fetchSaveMovie(movie)),
});

class EditMovie extends React.Component {
  constructor(props) {
    super(props);
    const { title, posterUrl, genres, description, director } = props.initialValues;
    this.state = {
      title,
      posterUrl,
      genres,
      description,
      director,
    };
  }

  save = (movie) => {
    movie.genres = movie.genres.split(', ');
    const newMovie = Object.assign({}, this.props.initialValues, movie);
    this.props.fetchSaveMovie(newMovie);
    window.history.back();
  };

  render() {
    const { lang, handleSubmit, pristine, submitting } = this.props;

    return (
      <div>
        <Nav />
        <Header />
        <form
          className={styles.movie}
          onSubmit={handleSubmit(this.save)}
        >
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor='title'
            >{lang.title}</label>
            <Field
              className={styles.input}
              component='input'
              id='title'
              name='title'
              type='text'
            />
          </div>
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor='imgUrl'
            >{lang.imgUrl}</label>
            <Field
              className={styles.input}
              component='input'
              id='imgUrl'
              name='posterUrl'
              type='text'
            />
          </div>
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor='director'
            >{lang.director}</label>
            <Field
              className={styles.input}
              component='input'
              id='director'
              name='director'
              type='text'
            />
          </div>
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor='genres'
            >{lang.genres}</label>
            <Field
              className={styles.input}
              component='input'
              id='genres'
              name='genres'
              type='text'
            />
          </div>
          <div className={styles.field}>
            <label
              className={styles.label}
              htmlFor='descr'
            >
              {lang.description}
            </label>
            <Field
              className={styles.input}
              component='input'
              id='descr'
              name='description'
              type='text'
            />
          </div>
          <div className={styles.field}>
            <Button
              disabled={pristine || submitting}
              type='submit'
            >
              {lang.save}
            </Button>
            <Link
              className={styles.btn}
              to={`/movies/${this.props.initialValues.id}`}
            >
              <Button>{lang.back}</Button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
EditMovie.propTypes = {
  initialValues: PropTypes.shape({
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
  fetchSaveMovie: PropTypes.func,
  lang: PropTypes.objectOf(PropTypes.string),
  submitting: PropTypes.bool,
  pristine: PropTypes.bool,
  handleSubmit: PropTypes.func,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({ form: 'editMovie' }),
  WithTranslation,
)(EditMovie);
