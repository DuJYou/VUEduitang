const cinemaModel = require('../models/cinema')
const findAll = async (req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let pageInfo = req.query
  // console.log(pageInfo);
  
  let result = await cinemaModel.findAll(pageInfo)
  if (result) {
    res.render('succ', {
      data: JSON.stringify(result)
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({})
    })
  }
}
const findOne = async (req, res, next) => {
  let id = req.query.id
  let result = await cinemaModel.findOne(id)
  if (result) {
    res.render('succ', {
      data: JSON.stringify(result)
    })
  } else {
    res.render('fail', {
      data: JSON.stringify(result)
    })
  }
}
const save = async (req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8')
  let data = req.body
  let result = await cinemaModel.save(data)

  // console.log(data);

  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '添加成功'
      })
    })
  } else {
    res.render('succ', {
      data: JSON.stringify({
        message: '添加失败'
      })
    })
  }
}
const updata = async (req, res, next) => {
  let data = req.body
  let result = await cinemaModel.updata(data)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '修改成功'
      })
    })
  } else {
    res.render('succ', {
      data: JSON.stringify({
        message: '修改失败'
      })
    })
  }
}
const remove = async (req, res, next) => {
  let id = req.body.id
  let result = await cinemaModel.remove(id)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '删除成功'
      })
    })
  } else {
    res.render('succ', {
      data: JSON.stringify({
        message: '删除失败'
      })
    })
  }
}
const search =async(req,res,next)=>{
  let {keywords}=req.body
  let result =await cinemaModel.search(keywords)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        list: result
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify({
        list: []
      })
    })
  }
}
module.exports = {
  findAll,
  save,
  updata,
  findOne,
  remove,
  search
}