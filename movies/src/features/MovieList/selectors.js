export const getFilteredMovies = (state) => {
  const { movies } = state.movies;
  const { isSortedByLikes, isSortedByRating, searchValue } = state.filter;
  let filteredMovies = isSortedByLikes
    ? [...movies].sort((a, b) => b.likes - a.likes)
    : movies;

  filteredMovies = isSortedByRating
    ? [...filteredMovies].sort((a, b) => b.stars - a.stars)
    : filteredMovies;

  filteredMovies = searchValue
    ? filteredMovies.filter(movie => (
      movie.title.toLocaleLowerCase().includes(searchValue)
    ))
    : filteredMovies;

  return filteredMovies;
};

export const findMovie = (state, ownProps) => {
  const movie = Object.assign(
    {},
    state.movies.movies.find(movie => movie.id === Number(ownProps.match.params.id))
  );
  movie.genres = movie.genres.join(', ');
  return movie;
};

export const findActors = (state, ownProps) => {
  const movie = state.movies.movies.find(movie => movie.id === Number(ownProps.match.params.id));
  const actorsIds = movie.actorsIds;
  const actors = [];

  actorsIds.forEach(id =>
    state.movies.actors.forEach(actor => {
      if (actor.id === id) {
        actors.push({ id, name: actor.name });
      }
      return actor;
    })
  );
  return actors;
};

export const getActor = (state, ownProps) => {
  return state.movies.actors.find(actor => actor.id === Number(ownProps.match.params.id));
};

