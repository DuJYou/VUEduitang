import cinemaView from '../views/cinema.art'
import cinemaAddView from '../views/cinema_add.art'
import cinemaUpdataView from '../views/cinema_updata.art'
import httpModel from '../models/http'
import _ from 'lodash'
// import store from 'store'
let count = 2
function _handleAddClick(res) {
  $('#btn-add').on('click', () => {
    res.go('/cinema_add')
  })
}
function _handleUpdateClick(res, obj) {
  let id = $(obj).attr('data-id')
  res.go('/cinema_updata', {
    id
  })
}
async function _handleRemoveClick(req,res, obj) {
  let id = $(obj).attr('data-id')
  let result = await httpModel.add({
    url: '/api/cinema',
    type: 'delete',
    data: {
      id
    }
  })
  // if (result) {
  //   res.go('/cinema?r=' + (new Date().getTime()))
  // }
  // console.log();
  
  if (result.ret) {
    res.go('/cinema_list/' + (req.params.page || 1) + '?r=' + (new Date().getTime()))
  }
}
function _handlePageNumberClick(req, res, obj, type, pageCount) {
  // list(req, res, next, ~~$(obj).text())
  if (type) {
    let page = ~~req.params.page
    if (type === 'prev' && page > 1) {
      res.go('/cinema_list/' + (page - 1))
    } else if (type === 'next' && page < pageCount.length) {
      res.go('/cinema_list/' + (page + 1))
    }
  } else {
    res.go('/cinema_list/' + ~~$(obj).text())
  }
}
async function _handleSearch(res,keywords) {
  if (keywords === '') {
    res.go('/cinema_list/1' + '?r=' + new Date().getTime())
    return
  }

  let result = await httpModel.add({
    url: '/api/cinema/search',
    data: {
      keywords
    }
  })
  if (result.ret) {
    res.render(cinemaView({
      list: result.data.list
    }))
  }else{
    res.go('/cinema')
  }
}
export const list = async (req, res, next) => {
  let currentPage = ~~req.params.page || 1
  // console.log(start);
  let result = await httpModel.get({
    url: '/api/cinema',
    data: {
      start: (currentPage - 1) * count,
      count
    }
  }) 
  // console.log(count);y
  if (result.data.list.length === 0 && currentPage > 1) {
    res.go('/cinema_list/' + (currentPage - 1))
    return
  }
  let pageCount = _.range(1, Math.ceil(result.data.total / count) + 1)
  if (result.ret) {
    let {list} = result.data
    console.log(currentPage);
    res.render(cinemaView({
      list,
      pageCount,
      currentPage,
      from: 'list'
    }))
    _handleAddClick(res)
  } else {
    res.go('/index')
  }
  //改
  $('.btn-updata').on('click', function () {
    _handleUpdateClick(res, this)
  })
  //删除
  $('.btn-remove').on('click', function () {
    _handleRemoveClick(req, res, this)
  })
  //查询
  $('body').on('keyup','#search',(e) => {
    if (e.keyCode === 13) {
      // console.log(1);
      _handleSearch(res,e.target.value)
    }
  })

  
  $('#box-footer a.page-number').on('click', function () {
    _handlePageNumberClick(req, res, this)
  })

  $('#box-footer a.page-prev').on('click', function () {
    _handlePageNumberClick(req, res, this, 'prev')
  })

  $('#box-footer a.page-next').on('click', function () {
    _handlePageNumberClick(req, res, this, 'next', pageCount)
  })
}
export const add =async (req, res, next) => {
  res.render(cinemaAddView())
  $('#posadd-submit').on('click', async () => {
    let $form = $('#cinema-form')
    let data = $form.serialize()
    let result = await httpModel.add({
      url: '/api/cinema',
      data,
    })
    if (result.ret) {
      $form[0].reset()
    } else {
      alert(result.data.message)
    }
  })
  $('#posadd-back').on('click', () => {
    res.go('/cinema')
  })
}
export const updata = async (req, res, next) => {
  let id = req.body.id
  let result = await httpModel.get({
    url: '/api/cinema/findOne',
    data: {
      id
    }
  })
  res.render(cinemaUpdataView({
    item: result.data
  }))
  $('#posdit-submit').on('click', async () => {
    let $form = $('#cinema-form')
    let data = $form.serialize()
    let result = await httpModel.add({
      url: '/api/cinema',
      data: data + '&id=' + id,
      type: 'patch'
    })
    if (result.ret) {
      res.go('/cinema')
    } else {
      alert(result.data.message)
    }
  })
  httpModel.add({
    url: 'api/cinema',
    type: 'patch',
    data: {
      id
    }
  })
  $('#posdit-back').on('click', () => {
    res.go('/cinema')
  })
}