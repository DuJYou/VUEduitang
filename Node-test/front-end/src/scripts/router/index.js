import SMERouter from 'sme-router'
import titleView from '../views/title.art'
import {index} from '../controllers/index'
// import {movie} from '../controllers/movie'
import * as cinema from '../controllers/cinema'
import * as movie from '../controllers/movie'
import * as chat from '../controllers/chat'
import * as movieHot from '../controllers/movie_hot'
import * as movieUpcoming from '../controllers/movie_Upcoming'
const router = new SMERouter('indexMain')
router.use((req) => {
    //高亮
    let url = req.url.slice(1).split('?')[0].split('_')[0]
    $(`.sidebar-menu li[data-url=${url}]`).addClass('active').siblings().removeClass('active')
    //面包屑
    let Breadcrumb = {
        'index': {
            level1: '管理系统',
            level1Url:'#/index',
            level2: '首页',
        },
        'cinema': {
            level1: '管理系统',
            level1Url:'#/index',
            level2: '影院管理',
        },
        'movie':{
            level1: '管理系统',
            level1Url:'#/index',
            level2: '电影管理',
        },
        'movieHot':{
            level1: '电影管理',
            level1Url:'#/movie',
            level2: '正在热映管理',
        },
        'movieUpcoming':{
            level1: '电影管理',
            level1Url:'#/movie',
            level2: '即将上映管理',
        },
        'chat':{
            level1: '管理系统',
            level2: '用户交流',
        },

    }
    let info = {
        Breadcrumb: {
            level1: Breadcrumb[url].level1,
            level1Url:Breadcrumb[url].level1Url,
            level2: Breadcrumb[url].level2
        },
    }
    let titleHtml=titleView({
        breadcrumb:info.Breadcrumb
    })
    $('#title').html(titleHtml)
})
router.route('/index', index)
// router.route('/movie', movie)

router.route('/cinema', cinema.list)
router.route('/cinema_add', cinema.add)
router.route('/cinema_updata', cinema.updata)
router.route('/cinema_list/:page', cinema.list)

router.route('/movie', movie.list)
router.route('/movieHot', movieHot.list)
router.route('/movieHot_add', movieHot.add)
router.route('/movieHot_updata', movieHot.updata)
router.route('/movieHot_list/:page', movieHot.list)

router.route('/movieUpcoming', movieUpcoming.list)
router.route('/movieUpcoming_add', movieUpcoming.add)
router.route('/movieUpcoming_updata', movieUpcoming.updata)
router.route('/movieUpcoming_list/:page', movieUpcoming.list)

router.route('/chat', chat.list)
//初始
router.route('*', (req, res, next) => {
    res.redirect('/index', index)
})
export default router