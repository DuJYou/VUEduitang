const { Cinemas} = require('../utils/db')
const save = (data) => {
  const cinemas = new Cinemas(data)
  return cinemas.save()
}
const findOne = async (id) => {
  return await Cinemas.findById(id)
}
const findAll = async ({start,count}) => {
  
  let list = await Cinemas.find({}).sort({_id: -1}).limit(~~count).skip(~~start)
  // console.log(list);
  let total = await Cinemas.find({}).count()
  // console.log(total);
  // console.log(list);
  
  return ({
    list,
    total
  })
}
const updata = async (data) => {
  return await Cinemas.findByIdAndUpdate(data.id, data)
}
const remove = async (id) => {
  return await Cinemas.findByIdAndRemove(id)
}
const search = async (keywords) => {
  let reg =new RegExp(keywords,'gi')
  return await Cinemas.find({}).or([{cinemaName:reg},{cinemaLocation:reg}])
}
module.exports = {
  save,
  findAll,
  updata,
  findOne,
  remove,
  search
}