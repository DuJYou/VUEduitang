import movieView from '../views/movie.art'

  export const list = async (req, res, next) => {
    res.render(movieView())
  }