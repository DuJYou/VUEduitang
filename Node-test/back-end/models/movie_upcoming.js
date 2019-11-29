const { MovieUpcoming} = require('../utils/db')
const save = (data) => {
  // console.log(data);
  const movieUpcoming = new MovieUpcoming(data)
  
  return movieUpcoming.save()
}
const findAll = async ({start,count}) => {
 
  let list = await MovieUpcoming.find({}).sort({_id: -1}).limit(~~count).skip(~~start)
  let total = await MovieUpcoming.find({}).count()
  return ({
    list,
    total
  })
}
const findOne = async (id) => {
  // console.log(id+'2');
  
  return await MovieUpcoming.findById(id)
}
const updata = async (data) => {

  // console.log(data+'aaaaa');
  
  return await MovieUpcoming.findByIdAndUpdate(data.id, data)
  
}
const remove = async (id) => {
  return await MovieUpcoming.findByIdAndRemove(id)
}
const search = async (keywords) => {
  let reg = new RegExp(keywords, 'gi')
  return await MovieUpcoming.find({}).or([{
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