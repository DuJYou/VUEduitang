const { MovieHot} = require('../utils/db')
const save = (data) => {
  // console.log(data);
  const movieHot = new MovieHot(data)
  
  return movieHot.save()
}
const findAll = async ({start,count}) => {
 
  let list = await MovieHot.find({}).sort({_id: -1}).limit(~~count).skip(~~start)
  let total = await MovieHot.find({}).count()
  return ({
    list,
    total
  })
}
const findOne = async (id) => {
  // console.log(id+'2');
  
  return await MovieHot.findById(id)
}
const updata = async (data) => {

  // console.log(data+'aaaaa');
  
  return await MovieHot.findByIdAndUpdate(data.id, data)
  
}
const remove = async (id) => {
  return await MovieHot.findByIdAndRemove(id)
}
const search = async (keywords) => {
  let reg = new RegExp(keywords, 'gi')
  return await MovieHot.find({}).or([{
    movieName: reg
  }])
}
module.exports = {
  save,
  findAll,
  updata,
  findOne,
  remove,
  search
}