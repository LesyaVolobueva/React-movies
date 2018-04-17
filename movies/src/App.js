import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Filter from './features/Filter/Filter';
import MovieList from './features/MovieList/MovieList';
import Nav from './features/Nav/Nav';
import Header from './features/Header/Header';
import { fetchMovies, fetchActors } from './features/MovieList/movieActions';
import PropTypes from 'prop-types';
import WithTranslation from './features/WithTranslation/WithTranslation';

const mapStateToProps = (state) => ({
  movies: state.movies.movies,
  actors: state.movies.actors,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (movies) => dispatch(fetchMovies(movies)),
  fetchActors: (actors) => dispatch(fetchActors(actors)),
});

class App extends Component {
  componentDidMount() {
    const { movies, actors } = this.props;

    this.props.fetchMovies(movies);
    this.props.fetchActors(actors);
  }

  render() {
    return (
      <div>
        <Fragment>
          <Nav />
          <Header />
          <div className='main'>
            <Filter />
            <MovieList />
          </div>
        </Fragment>
      </div>
    );
  }
}

App.propTypes = {
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
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      imgUrl: PropTypes.string,
      biography: PropTypes.string,
    })
  ),
  fetchMovies: PropTypes.func,
  fetchActors: PropTypes.func,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithTranslation(App));
