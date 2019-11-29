import movieUpcomingView from '../views/movie_Upcoming.art'
import movieUpcomingUpdataView from '../views/movie_Upcoming_updata.art'
import movieUpcomingAddView from '../views/movie_Upcoming_add.art'
import httpModel from '../models/http'
import _ from 'lodash'
import store from 'store'
let count = 2
function _handleAddClick(res) {
  $('#btn-MovieUpcomingAdd').on('click', () => {
  console.log(1);
  
    res.go('/movieUpcoming_add')
  })
}
function _handleUpdateClick(res, obj) {
  let id = $(obj).attr('data-id')
  res.go('/movieUpcoming_updata', {
    id
  })
}
function _handlePageNumberClick(req, res, obj, type, pageCount) {
  // list(req, res, next, ~~$(obj).text())
  if (type) {
    let page = ~~req.params.page
    if (type === 'prev' && page > 1) {
      res.go('/movieUpcoming_list/' + (page - 1))
    } else if (type === 'next' && page < pageCount.length) {
      res.go('/movieUpcoming_list/' + (page + 1))
    }
  } else {
    res.go('/movieUpcoming_list/' + ~~$(obj).text())
  }
}
async function _handleRemoveClick(req, res, obj) {
  let id = $(obj).attr('data-id')
  let tempMovieImg = $(obj).attr('data-img')
  // console.log(tempMovieImg);
  let result = await httpModel.add({
    url: '/api/movieUpcoming',
    type: 'delete',
    data: {
      id,
      tempMovieImg
    }
  })
  // console.log(result.ret);
  if (result.ret) {
    res.go('/movieUpcoming_list/' + (req.params.page || 1) + '?r=' + (new Date().getTime()))
  }
}
async function _handleSearch(res, keywords) {
  if  (keywords === '') {
    await   res.go('/movieUpcoming_list/1' + '?r=' + new Date().getTime())
    return
  }
  let result = await httpModel.add({
    url: '/api/movieUpcoming/search',
    data: {
      keywords
    }
  })
  
  
  if (result.ret) {
    res.render(movieUpcomingView({
      list: result.data.list,
      from: 'search'
    }))
  }
}
export const list = async (req, res, next) => {
  let currentPage = ~~req.params.page || 1
  // console.log(currentPage);
  
  let result = await httpModel.get({
    url: '/api/movieUpcoming',
    data: {
      start: (currentPage - 1) * count,
      count
    }
  })
  if (result.data.list.length === 0 && currentPage > 1) {
    res.go('/movieUpcoming_list/' + (currentPage - 1))
    return
  }
  let pageCount = _.range(1, Math.ceil(result.data.total / count) + 1)
  
  if (result.ret) {
    let {list} = result.data
    res.render(movieUpcomingView({
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
  $('.btn-mupdata').on('click', function () {
    _handleUpdateClick(res, this)
  })
  //删除
  $('.btn-mremove').on('click', function () {
    _handleRemoveClick(req, res, this)
  })
  //查询
  $('body').on('keyup', '#Msearch', (e) => {
    // $('#Msearch').on('click',(e)=>{
    if (e.keyCode === 13) {
      _handleSearch(res, e.target.value)
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
export const add = async (req, res, next) => {
  res.render(movieUpcomingAddView())
  let token = store.get('token')
  console.log(res);
  let j = $('input').length

  $('#movie-form').ajaxForm({
    headers: {
      'X-Access-Token': token
    },
    restForm: true,
    success: (result) => {
      if (result.ret) {
        for (let i = 0; i < j; i++) {
          $('input').eq(i).val('')
        }
      } else {
        alert(result.data.message)
      }
    }
  })
  //返回
  $('#movieadd-back').on('click', () => {
    res.go('/movieUpcoming')
  })
}
export const updata = async (req, res, next) => {
  let id = req.body.id
  let result = await httpModel.get({
    url: '/api/movieUpcoming/findOne',
    data: {
      id
    }
  })
  res.render(movieUpcomingUpdataView({
    item: result.data
  }))
  let token = store.get('token')
  $('#movie-form').ajaxForm({
    headers: {
      'X-Access-Token': token
    },
    restForm: true,
    dataType: 'json',
    url: 'api/movieUpcoming/updata',
    success: (result) => {
      if (result.ret) {
        res.back()
      } else {
        alert(result.data.message)
      }
    }
  })
  $('#moviedit-back').on('click', () => {
    res.back()
  })
}