import indexView from '../views/index.art'

export const index = (req, res, next) => {
  res.render(indexView())
}